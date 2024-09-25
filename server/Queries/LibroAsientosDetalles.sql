CREATE OR REPLACE FUNCTION load_contable_asiento_libro(anio_inicio INTEGER, anio_final INTEGER, numero_filas integer, filas_detalle integer)
RETURNS VOID
LANGUAGE plpgsql
AS $$
DECLARE
    i INTEGER = 0;
	id_comprobante INTEGER = 0;
	id_asiento INTEGER;
	id_cuenta INTEGER;
	random_date DATE;
	comprobante TEXT;
	concepto_val TEXT;
	datos_detalle INTEGER;
	haber BOOLEAN;
	debe INTEGER = 0;
	dinero NUMERIC;
	debe_calculo INTEGER = 0;
	distribuido_debe  INTEGER = 0;
	total_debe INTEGER = 0;
	libro RECORD;
	id_user INTEGER;
	fecha_inicio TIMESTAMP;
	fecha_final TIMESTAMP;
	fecha_actual TIMESTAMP;
BEGIN
	SELECT CURRENT_TIMESTAMP INTO fecha_actual;  
	WHILE anio_inicio <= anio_final LOOP
		SELECT "Id" INTO id_user FROM "RecUsuario" ORDER BY RANDOM() LIMIT 1;
		SELECT MAKE_TIMESTAMP(anio_inicio, 1, 1, 0, 0, 0) INTO fecha_inicio;
		SELECT MAKE_DATE(anio_inicio + 1, 1, 1) - INTERVAL '1 day' INTO fecha_final;
		
		IF anio_inicio = anio_final THEN
			WITH primer_insercion AS (
				INSERT INTO "ContableLibroDiario" ("Nombre", "Descripcion", "Visualizacion", "IdUsuario", "FechaInicio", "Activo", "Importante", "Estado", "FechaCreacion", "FechaModificacion")
				VALUES 
					('Libro ' || anio_inicio, 'Cuentas libro ' || anio_inicio, 'Público', id_user, fecha_inicio, true, false, 'AC', fecha_actual, fecha_actual)
					 RETURNING "Id"
			)
			INSERT INTO "ContableLibroDiario" ("Nombre", "Descripcion", "Visualizacion", "IdUsuario", "IdPadreLibro", "FechaInicio", "Activo", "Importante", "Estado", "FechaCreacion", "FechaModificacion")
			SELECT 'Libro ' || anio_inicio, 'Cuentas libro ' || anio_inicio, 'Privado', id_user, "Id", fecha_inicio, true, false, 'AC', fecha_actual, fecha_actual
			FROM primer_insercion;
		ELSE
			WITH primer_insercion AS (
				INSERT INTO "ContableLibroDiario" ("Nombre", "Descripcion", "Visualizacion", "IdUsuario", "FechaInicio", "FechaCierre", "Activo", "Importante", "Estado", "FechaCreacion", "FechaModificacion")
				VALUES 
					('Libro ' || anio_inicio, 'Cuentas libro ' || anio_inicio, 'Público', id_user, fecha_inicio, fecha_final, false, false, 'AC', fecha_actual, fecha_actual)
			 	RETURNING "Id"
			)
			INSERT INTO "ContableLibroDiario" ("Nombre", "Descripcion", "Visualizacion", "IdUsuario", "IdPadreLibro", "FechaInicio", "FechaCierre", "Activo", "Importante", "Estado", "FechaCreacion", "FechaModificacion")
			SELECT 'Libro ' || anio_inicio, 'Cuentas libro ' || anio_inicio, 'Privado', id_user, "Id", fecha_inicio, fecha_final, false, false, 'AC', fecha_actual, fecha_actual
			FROM primer_insercion;	
		END IF;
		anio_inicio = anio_inicio + 1;
	END LOOP;
	FOR libro IN SELECT "Id", "ContableLibroDiario", "FechaInicio" FROM "ContableLibroDiario" LOOP
		WHILE i < numero_filas LOOP
			SELECT "Id" INTO id_comprobante FROM "ContableTipoComprobante" ORDER BY RANDOM() LIMIT 1;
			random_date = libro."FechaInicio" + (RANDOM() * INTERVAL '1 year');
			comprobante = TRIM(to_char(FLOOR(random() * 10000), '0000'));
			SELECT "Nombre" || comprobante INTO  concepto_val FROM "ContableTipoComprobante" WHERE "Id" = id_comprobante;
			INSERT INTO "ContableAsiento" ("IdTipoComprobante", "NumeroComprobante", "Fecha", "Concepto", "Estado", "FechaModificacion", "FechaCreacion", "IdLibroDiario")
			VALUES (id_comprobante, comprobante, random_date, concepto_val, 'AC', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, libro."Id");
			id_asiento = LASTVAL();
			datos_detalle = FLOOR(RANDOM()*(filas_detalle - 3 + 1) + 3);

			FOR j IN 1..datos_detalle LOOP
				SELECT "Id" INTO id_cuenta FROM "ContableCuenta" WHERE "Nivel" = 5 ORDER BY RANDOM() LIMIT 1;
				haber = random() > 0.5;
				dinero = ROUND(CAST(20.0 + random() * (1000.0 - 20.0) AS numeric), 0);
				CASE 
					WHEN haber THEN
						IF j = datos_detalle AND debe = 0 THEN
							debe = debe + 1;
						ELSE
							INSERT INTO "ContableDetalleAsiento" ("IdCuenta", "IdAsiento", "Glosa", "Moneda", "DebeBs", "HaberBs", "DebeSus", "HaberSus", "Estado", "FechaModificacion", "FechaCreacion")
							VALUES (id_cuenta, id_asiento, 'Glosa', 'Bs', null, dinero, null, ROUND(CAST(dinero/6.98 AS NUMERIC),2), 'AC', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
							debe_calculo = debe_calculo + dinero;
						END IF;
					WHEN NOT haber THEN
						IF j = datos_detalle AND debe = datos_detalle - 1 THEN
							INSERT INTO "ContableDetalleAsiento" ("IdCuenta", "IdAsiento", "Glosa", "Moneda", "DebeBs", "HaberBs", "DebeSus", "HaberSus", "Estado", "FechaModificacion", "FechaCreacion")
							VALUES (id_cuenta, id_asiento, 'Glosa', 'Bs', null, dinero, null, ROUND(CAST(dinero/6.98 AS NUMERIC),2), 'AC', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
							debe_calculo = debe_calculo + dinero;
						ELSE
							debe = debe + 1;
						END IF;
				END CASE;
			END LOOP;

			FOR k IN 1..debe LOOP
				distribuido_debe = ROUND(CAST((debe_calculo - total_debe) * random() AS NUMERIC),0);
				total_debe = total_debe + distribuido_debe;
				SELECT "Id" INTO id_cuenta FROM "ContableCuenta" WHERE "Nivel" = 5 ORDER BY RANDOM() LIMIT 1;
				IF k = debe THEN
					distribuido_debe = debe_calculo - (total_debe - distribuido_debe);
				END IF;
				INSERT INTO "ContableDetalleAsiento" ("IdCuenta", "IdAsiento", "Glosa", "Moneda", "DebeBs", "HaberBs", "DebeSus", "HaberSus", "Estado", "FechaModificacion", "FechaCreacion")
				VALUES (id_cuenta, id_asiento, 'Glosa', 'Bs', distribuido_debe, null, ROUND(CAST(distribuido_debe/6.98 AS NUMERIC),2), null, 'AC', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
			END LOOP;
			debe = 0;
			total_debe = 0;
			debe_calculo = 0;
			i = i + 1;
		END LOOP;
		i = 0;
	END LOOP;
END;
$$;