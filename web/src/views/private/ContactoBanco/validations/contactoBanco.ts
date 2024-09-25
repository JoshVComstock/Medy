import * as Yup from "yup";

export const contactoBancoSchema = Yup.object({
  idContacto: Yup.number().required("Contacto es requerido"),
  idBanco: Yup.number().required("Banco es requerido"),
  idMoneda: Yup.number().required("Moneda es requerido"),
  idEmpresa: Yup.number().required("Empresa es requerido"),
  numeroCuenta: Yup.string().required("Numero de cuenta es requerido"),
});

export interface ContactoBancoForm extends Yup.InferType<typeof contactoBancoSchema> {}
