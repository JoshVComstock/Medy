import * as Yup from "yup";

export const loginSchema = Yup.object({
  username: Yup.string().required("Email es requerido"),
  password: Yup.string().required("Contraseña es requerida"),
});

export interface LoginForm extends Yup.InferType<typeof loginSchema> {}
