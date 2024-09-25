import * as Yup from "yup";

export const aperturaCajaSchema = Yup.object({
  idMoneda: Yup.number().required("Moneda es requerido"),
 /*  valor: Yup.number().required("Valor es requerido"), */
 idEfectivo: Yup.number().required("Descripción es requerida"),
  cantidad: Yup.number().required("Cantidad es requerida"),
/*   tipo: Yup.string().required("Tipo es requerido"), */
});

export interface AperturaCajaForm extends Yup.InferType<typeof aperturaCajaSchema> {}