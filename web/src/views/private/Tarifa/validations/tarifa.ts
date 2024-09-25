import * as Yup from "yup";

export const tarifaSchema = Yup.object({
  idEmpresa: Yup.number().required("Empresa es requerido"),
  idMoneda: Yup.number().required(" Moneda es requerido"),
  secuencia: Yup.number(),
  nombre: Yup.string().required("Nombre es requerido"),
  politicaDescuento: Yup.string().required(
    "Politica de descuento es requerido"
  ),
});

export interface TarifaForm
  extends Yup.InferType<typeof tarifaSchema> {}
