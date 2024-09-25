-- Trigger thata affects PvRegistroGastos, EntregaDeEfectivo, ContableDetalleAsiento 
CREATE OR REPLACE FUNCTION actualizar_montos_function()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
    fecha DATE = NEW."Fecha";
	dolar DOUBLE PRECISION = NEW."Dolar";
	rowDatos RECORD;
BEGIN
	UPDATE "PvRegistroGastos"
    SET
        "MontoSus" = CASE WHEN "Moneda" = 'Bs' THEN "MontoBs" * dolar ELSE "MontoSus" END,
        "MontoBs" = CASE WHEN "Moneda" = 'US$' THEN "MontoSus" / dolar ELSE "MontoBs" END
    WHERE DATE_TRUNC('day', "FechaCreacion") = fecha;
	
	UPDATE "EntregaDeEfectivo"
	SET
		"MontoSus" = CASE WHEN "Moneda" = 'Bs' THEN "MontoBs" * dolar ELSE "MontoSus" END,
	 	"MontoBs" = CASE WHEN "Moneda" = 'US$' THEN "MontoSus" / dolar ELSE "MontoBs" END
	WHERE DATE_TRUNC('day', "FechaCreacion") = fecha;
	
	UPDATE "ContableDetalleAsiento"
	SET
		"DebeSus" = CASE WHEN "Moneda" = 'Bs' AND "HaberBs" IS NULL THEN "DebeBs" * dolar ELSE "DebeSus" END,
		"HaberSus" = CASE WHEN "Moneda" = 'Bs' AND "HaberBs" IS NOT NULL THEN "HaberBs" * dolar ELSE "HaberSus" END,
		"DebeBs" = CASE WHEN "Moneda" = 'US$' AND "HaberSus" IS NULL THEN "DebeSus" / dolar ELSE "DebeBs" END,
        "HaberBs" = CASE WHEN "Moneda" = 'US$' AND "HaberSus" IS NOT NULL THEN "HaberSus" / dolar ELSE "HaberBs" END
	WHERE DATE_TRUNC('day', "FechaCreacion") = fecha;
	RETURN NULL;
END;
$$;

CREATE OR REPLACE TRIGGER actualizar_montos
AFTER UPDATE ON "ContableTipoCambio"
FOR EACH ROW
WHEN (OLD.* IS DISTINCT FROM NEW.*)
EXECUTE FUNCTION actualizar_montos_function();