import * as Yup from "yup";

export const tipoComprobanteSchema = Yup.object({
  nombre: Yup.string().required("Nombre es requerido"),
});

export interface TipoComprobanteForm
  extends Yup.InferType<typeof tipoComprobanteSchema> {}
