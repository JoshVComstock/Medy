import * as Yup from "yup";

export const saldoFavorSchema = Yup.object({
  descripcion: Yup.string().required("Observacion es requerida"),
    totalFavor: Yup.number().required("Total a favor es requerido"),
    idVenta: Yup.number().required("Venta es requerido"),
});

export interface SaldoFavorForm
  extends Yup.InferType<typeof saldoFavorSchema> {}
 