import * as Yup from "yup";

export const productoCategoriaSchema = Yup.object({
  nombre: Yup.string().required("Nombre es requerido"),
  idPadre:Yup.string().required("Este campo es requerido"),
  metodoEmbalaje:Yup.string().required("El metodo embalaje es requerido"),
  nombreCompleto:Yup.string(),
  pathPadre:Yup.string().required("El path padre es requerido"),
  idEstrategiaEliminacion:Yup.number().required("Es requerido la estrategia"),
});

export interface ProductoCategoriaForm
  extends Yup.InferType<typeof productoCategoriaSchema> {}
