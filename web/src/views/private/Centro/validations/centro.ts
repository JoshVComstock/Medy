import * as Yup from "yup";

export const centroSchema = Yup.object({
  nombre: Yup.string().required("Nombre es requerido"),
  idMunicipio: Yup.number().required("El municipio es requerida"),
  direccion: Yup.string().required("Direccion es requerido"),
  area: Yup.string().required("Area es requerido"),
  seguimientoCasos: Yup.string(),
  contacto: Yup.string().required("contacto es requerido"),
  telefono: Yup.string(),
});

export interface CentroForm extends Yup.InferType<typeof centroSchema> {}
