import * as Yup from "yup";

export const bancoSchema = Yup.object({
  nombre: Yup.string().required("Nombre es requerido"),
  direccion: Yup.string().required("Direccion es requerido"),
  direccion2: Yup.string().required("Segunda direccion es requerido"),
  codigoPostal: Yup.string().required("Codigo postal es requerido"),
  ciudad: Yup.string().required("Ciudad es requerido"),
  email: Yup.string().required("Email es requerido"),
  telefono: Yup.string().required("Telefono es requerido"),
});

export interface BancoForm extends Yup.InferType<typeof bancoSchema> {}
