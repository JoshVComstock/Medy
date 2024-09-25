import * as Yup from "yup";

export const efectivoSchema = Yup.object({
    idMoneda: Yup.number().required("Id moneda es requerido"),
    descripcion: Yup.string().required("Descripción es requerida"),
    valor: Yup.number().required("Valor es requerido")
});

export interface efectivoForm
  extends Yup.InferType<typeof efectivoSchema> {}
