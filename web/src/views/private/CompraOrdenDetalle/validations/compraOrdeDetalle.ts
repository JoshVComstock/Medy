import * as Yup from "yup";

export const compraOrdenDetalleSchema = Yup.object({
  idProducto: Yup.number().required("Producto es requerido"),
  idUnidadMedida: Yup.number().required("Unidad de Medida es requerido"),
  idMoneda: Yup.number().required("Moneda es requerido"),
  idEmpaquetado: Yup.number().required("Empaquetado es requerido"),
  nombre: Yup.string().required("Nombre es requerido"),
  cantidad: Yup.number().required("Cantidad es requerida"),
  precioUnitario: Yup.number().required("Precio Unitario es requerido"),
  precioSubtotal: Yup.number().required("Precio Subtotal es requerido"),
  precioTotal: Yup.number().required("Precio Total es requerido"),
  precioImpuesto: Yup.number().required("Precio de Impuesto es requerido"),
  cantidadSolicitada: Yup.number().required("Cantidad Solicitada es requerida"),
  cantidadRecibida: Yup.number().required("Cantidad Recibida es requerida"),
  cantidadPaquete: Yup.number().required("Cantidad de Paquete es requerida"),
  fechaEsperada: Yup.date().required("Fecha Esperada es requerida"),
});

export interface CompraOrdenDetalleForm extends Yup.InferType<typeof compraOrdenDetalleSchema> {}
