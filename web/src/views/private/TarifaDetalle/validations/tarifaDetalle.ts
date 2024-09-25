import * as Yup from "yup";

export const tarifaDetalleSchema = Yup.object({
  idMoneda: Yup.number().required("Moneda es requerido"),
  idProducto: Yup.number().nullable().required("Producto es requerido"),
  idProductoCategoria: Yup.number()
    .nullable()
    .required("Producto es requerido"),
  idProductoBase: Yup.number()
    .nullable()
    .required("Producto base es requerido"),
  precioComputable: Yup.string().required("Precio computable es requerido"),
  precioFijo: Yup.number().required("Precio fijo es requerido"),
  descuento: Yup.number().nullable().required("Descuento es requerido"),
  aplicadoEn: Yup.string().required("Aplicado es requerido"),
  cantidadMin: Yup.number().required("Cantidad minica es requerido"),
  fechaInicio: Yup.date().required("Fecha inicio es requerido"),
  fechaFin: Yup.date().required("Fecha fin es requerido"),
});

export interface TarifaDetalleForm
  extends Yup.InferType<typeof tarifaDetalleSchema> {}
