import * as Yup from "yup";

export const categoriaContactoSchema = Yup.object({
  idPadre: Yup.number().required("Padre es requerido"),
  nombre: Yup.string().required("Nombre es requerido"),
  pathPadre: Yup.string().required("Path es requerido"),
  color: Yup.number().required("Color es requerida"),
});
export interface CategoriaContactoForm
  extends Yup.InferType<typeof categoriaContactoSchema> {}
