import * as Yup from "yup";

export const menuSchema = Yup.object({
  nombre: Yup.string().required("Nombre es requerido"),
  secuencia: Yup.number().required("Secuencia es requerido"),
  idPadre: Yup.number(),
  accion: Yup.string(),
  pathIcono: Yup.string(),
  pathPadre: Yup.string(),
});
export interface MenuForm extends Yup.InferType<typeof menuSchema> {}
