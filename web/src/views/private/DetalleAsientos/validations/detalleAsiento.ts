import * as Yup from "yup";

export const detalleAsientoSchema = Yup.object({
  idCuenta: Yup.number().required("Cuenta es requerida"),
  idAsiento: Yup.string().required("Asiento es requerido"),
  glosa: Yup.string().required("Glosa es requerida"),
  moneda: Yup.string().required(" es requerida"),
  debeBs: Yup.number(),
  haberBs: Yup.number(),
  debeSus: Yup.number(),
  haberSus: Yup.number(),
});

export interface DetalleAsientoForm
  extends Yup.InferType<typeof detalleAsientoSchema> {}
