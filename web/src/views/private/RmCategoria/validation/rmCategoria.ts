import * as Yup from "yup";

export const rmCategoriaSchema = Yup.object({
  nombre: Yup.string().required("Nombre es requerido"),
  agrupable: Yup.boolean().required("Agrupable es requerido")
});
export interface RmCategoriaForm extends Yup.InferType<typeof rmCategoriaSchema> {}
