import * as Yup from "yup";

export const municipioSchema = Yup.object({
  nombre: Yup.string().required("Nombre es requerido"),
  idProvincia: Yup.number().required("La provincia es requerida"),
});

export interface MunicipioForm extends Yup.InferType<typeof municipioSchema> {}
