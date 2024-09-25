import * as Yup from "yup";

export const cajaSchema = Yup.object({
  cantidad: Yup.number().required("Nombre es requerido"),
  Descripcion: Yup.string().required("La descripcion es necesaria"),
  idMoneda: Yup.number().required("La moneda es requerido"),
  tipo: Yup.string().required("El tipo es requerido"),
  valor: Yup.number().required("El valor es requerido"),
});

export interface CajaForm extends Yup.InferType<typeof cajaSchema> {}
