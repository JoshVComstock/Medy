CREATE TABLE historial (
    id SERIAL PRIMARY KEY,
    tabla_afectada TEXT,
    campo_modificado TEXT,
    usuario TEXT,
    tipo_modificacion TEXT,
    fecha_hora TIMESTAMP DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION registrar_cambio()
RETURNS TRIGGER AS $$
DECLARE
    campo TEXT;
    valor_antiguo TEXT;
    valor_nuevo TEXT;
BEGIN
    FOREACH campo IN ARRAY TG_ARGV LOOP
        EXECUTE format('SELECT $1.%I::TEXT', campo) INTO valor_antiguo USING OLD;
        EXECUTE format('SELECT $1.%I::TEXT', campo) INTO valor_nuevo USING NEW;
        
        IF (TG_OP = 'UPDATE' AND valor_antiguo IS DISTINCT FROM valor_nuevo) OR TG_OP IN ('INSERT', 'DELETE') THEN
            INSERT INTO historial (tabla_afectada, campo_modificado, usuario, tipo_modificacion)
            VALUES (TG_TABLE_NAME, campo, current_user, TG_OP);
        END IF;
    END LOOP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--Se puede cambiar el nombre de la tabla e indicar los campos de los que se quiere tener un seguimiento
CREATE TRIGGER auditar_cambios
AFTER INSERT OR UPDATE OR DELETE ON "ContableTipoComprobante"
FOR EACH ROW EXECUTE FUNCTION registrar_cambio('Nombre', 'Estado');