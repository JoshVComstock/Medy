import * as Yup from "yup";

export const cuentaSchema = Yup.object({
  codigo: Yup.string().required("Código es requerido"),
  descripcion: Yup.string().required("Descripción es requerida"),
  padre: Yup.string(),
  moneda: Yup.string(),
  nivel: Yup.string().required("Nivel es requerido"),
});

export interface CuentaForm extends Yup.InferType<typeof cuentaSchema> {}
