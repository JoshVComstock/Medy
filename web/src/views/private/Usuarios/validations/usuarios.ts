import * as Yup from "yup";

export const usuarioSchema = Yup.object({
  idTipoUsuario: Yup.number().required("TipoUsuario es requerido"),
  idEmpresa: Yup.number().required("Empresa es requerido"),
  idContacto: Yup.number().required("Contacto es requerido"),
  idAccion: Yup.number().required("Accion es requerido"),
  telefono: Yup.string().required("Telefono es requerido"),
  login: Yup.string().required("Login es requerido"),
  password: Yup.string()
    .min(8, "Al menos 8 caracteres")
    .matches(/[0-9]/, "Al menos un número")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Al menos un carácter especial")
    .lowercase("Al menos un caracter en minuscula")
    .uppercase("Al menos un caracter en mayuscula")
    .required("La contraseña es requerida"),
  codigoSecreto: Yup.string(),
  firma: Yup.string(),
  notificacion: Yup.string(),
  estadoBot: Yup.string(),
  codigoBot: Yup.string(),
  activo: Yup.boolean().required("Activo es requerido"),
});

export interface UsuarioForm extends Yup.InferType<typeof usuarioSchema> {}
