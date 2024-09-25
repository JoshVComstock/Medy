import * as Yup from "yup";

export const atributoValorSchema = Yup.object({
  idAtributo: Yup.number().required("Atributo es sequerido"),
  nombre: Yup.string().required("Nombre es requerido"),
  personalizable: Yup.bool().required("Personalizable es requerida"),
  secuencia: Yup.number().required("Secuencia es requerido"),
  color: Yup.number().required("Color es requerido"),
  colorHtml: Yup.string().required("color html es requerido"),
});

export interface AtributoValorForm
  extends Yup.InferType<typeof atributoValorSchema> {}
