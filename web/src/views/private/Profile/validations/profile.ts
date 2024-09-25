import * as Yup from "yup";

export const profileSchema = Yup.object({
  telefono: Yup.string().required("Teléfono es requerido"),
  login: Yup.string().required("Usuario es requerido"),
  idTipoUsuario: Yup.number(),
  idEmpresa: Yup.number(),
  idContacto: Yup.number(),
  idAccion: Yup.number(),
  codigoSecreto: Yup.string(),
  firma: Yup.string(),
  notificacion: Yup.string(),
  estadoBot: Yup.string(),
  codigoBot: Yup.string(),
  activo: Yup.boolean(),
  estado: Yup.string(),
});

export interface ProfileForm extends Yup.InferType<typeof profileSchema> {}
