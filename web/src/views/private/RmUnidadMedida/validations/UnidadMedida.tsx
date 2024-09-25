import * as Yup from "yup";

export const unidadMedidaSchema = Yup.object({
    idCategoria: Yup.number().required("Id categoria es requerido"),
    nombre: Yup.string().required("Nombre es requerido"),
    tipo: Yup.string().required("Tipo es requerido"),
    ratio: Yup.number().required("Ratio es requerido"),
    redondeo: Yup.number().required("Redondeo es requerido")
});
export interface unidadMedidaForm
  extends Yup.InferType<typeof unidadMedidaSchema> {}
