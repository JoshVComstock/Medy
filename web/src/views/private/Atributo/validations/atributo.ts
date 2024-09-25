import * as Yup from "yup";

export const atributoSchema = Yup.object({
  secuencia: Yup.number().required("La secuencia es obligatoria"),
  nombre: Yup.string().required("El nombre es obligatorio"),
  tipoVisualizacion: Yup.string().required("El tipo de visualización es obligatorio"),
  modoCreacion: Yup.string().required("El modo de creación es obligatorio"),
});

export interface AtributoForm extends Yup.InferType<typeof atributoSchema> {}
