import * as Yup from "yup";

export const provinciaSchema = Yup.object({
  nombre: Yup.string().required("Nombre es requerido"),
  idCiudad: Yup.number().required("La ciduad es requerida"),
});

export interface ProvinciaForm
  extends Yup.InferType<typeof provinciaSchema> {}
