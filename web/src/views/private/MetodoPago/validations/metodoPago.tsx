import * as Yup from "yup";

export const metodoPagoSchema = Yup.object({
  tipoPago: Yup.string().required("Tipo pago es requerido"),
});

export interface MetodoPagoForm extends Yup.InferType<typeof metodoPagoSchema> {}