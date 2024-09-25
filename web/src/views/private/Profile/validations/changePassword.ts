import * as Yup from "yup";

export const changePasswordSchema = Yup.object({
  actual: Yup.string().required("Contraseña actual es requerida"),
  nueva: Yup.string().required("Contraseña nueva es requerida"),
  confirmar: Yup.string().required("Confirmar contraseña es requerido")
});

export interface ChangePasswordForm extends Yup.InferType<typeof changePasswordSchema> {}
