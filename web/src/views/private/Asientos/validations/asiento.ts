import * as Yup from "yup";

export const asientoSchema = Yup.object({
  idTipoComprobante: Yup.number().required("Tipo comprobante es requerido"),
  numeroComprobante: Yup.string().required("Número comprobante es requerido"),
  fecha: Yup.string().required("Fecha es requerida"),
  concepto: Yup.string().required("Concepto es requerido"),
});

export interface AsientoForm extends Yup.InferType<typeof asientoSchema> {}
