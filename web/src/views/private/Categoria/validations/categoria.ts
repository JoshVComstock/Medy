import * as Yup from "yup";

export const categoriaSchema = Yup.object({
  idPadre: Yup.number().required("Padre es requerido"),
  nombre: Yup.string().required("Nombre es requerido"),
  nombreCompleto: Yup.string(),
  pathPadre: Yup.string().required("Path es requerido"),
  idEstrategiaEliminacion: Yup.number().required(
    "Estrategia de eliminacion es requerida"
  ),
  metodoEmbalaje: Yup.string().required("Metodo embalaje es requerida"),
});
export interface CategoriaForm extends Yup.InferType<typeof categoriaSchema> {}
