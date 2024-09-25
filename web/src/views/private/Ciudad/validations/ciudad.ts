import * as Yup from "yup";

export const ciudadSchema = Yup.object({
  nombre: Yup.string().required("Nombre es requerido"),
});

export interface CiudadForm extends Yup.InferType<typeof ciudadSchema> {}
