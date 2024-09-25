import * as Yup from "yup";

export const bancosSchema = Yup.object({
  idCuenta: Yup.number().required("Cuenta es requerida"),
  nombre: Yup.string().required("Nombre es requerido"),
  numeroCuenta: Yup.number().required("Número de cuenta es requerido"),
});

export interface BancosForm extends Yup.InferType<typeof bancosSchema> {}
