import * as Yup from "yup";

export const tipoMovimientosSchema = Yup.object({
  nombre: Yup.string().required("Nombre es requerido"),
});

export interface TipoMovimientoForm
  extends Yup.InferType<typeof tipoMovimientosSchema> {}
