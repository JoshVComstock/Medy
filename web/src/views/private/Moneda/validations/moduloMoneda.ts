import * as Yup from "yup";

export const monedaSchema = Yup.object({
    codigo : Yup.string().required("Código es requerido"),
    simbolo : Yup.string().required("Símbolo es requerido"),
    nombre : Yup.string().required("Nombre es requerido"),
    decimales : Yup.number().required("Decimales es requerido"),
    unidadMonetaria : Yup.string().required("Unidad Monetaria es requerido"),
    subUnidadMonetaria : Yup.string().required("Sub Unidad Monetaria es requerido"),
    redondeo : Yup.number().required("Redondeo es requerido")
});

export interface MonedaForm
  extends Yup.InferType<typeof monedaSchema> {}
