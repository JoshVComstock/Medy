import * as Yup from "yup";

export const ventaOrdenDetalleSchema = Yup.object({
  secuencia: Yup.number().required("Secuencia es requerida"),
  idMoneda: Yup.number().required("Moneda es requerido"),
  idProducto: Yup.number().nullable().required("Producto es requerido"),
  idUnidadMedida: Yup.number().required("Unidad de Medida es requerido"),
  idEmpaquetado: Yup.number().required("Empaquetado es requerido"),
  estadoOrden: Yup.string().required("Estado de Orden es requerido"),
  estadoFacturacion: Yup.string().required(
    "Estado de Facturación es requerido"
  ),
  codigoInterno: Yup.string().required("Código Interno es requerido"),
  nombre: Yup.string().required("Nombre es requerido"),
  cantidad: Yup.number().required("Cantidad es requerida"),
  precioUnitario: Yup.number().required("Precio Unitario es requerido"),
  descuento: Yup.number().required("Descuento es requerido"),
  precioReducido: Yup.number().required("Precio Reducido es requerido"),
  precioImpuesto: Yup.number().required("Precio de Impuesto es requerido"),
  precioUnitConImpuesto: Yup.number().required(
    "Precio Unitario con Impuesto es requerido"
  ),
  precioUnitSinImpuesto: Yup.number().required(
    "Precio Unitario sin Impuesto es requerido"
  ),
  subtotalConImpuesto: Yup.number().required(
    "Subtotal con Impuesto es requerido"
  ),
  subtotalSinImpuesto: Yup.number().required(
    "Subtotal sin Impuesto es requerido"
  ),
  cantidadEnviada: Yup.number().required("Cantidad Enviada es requerida"),
  tiempoEspera: Yup.number().required("Tiempo de Espera es requerido"),
});

export interface VentaOrdenDetalleForm
  extends Yup.InferType<typeof ventaOrdenDetalleSchema> {}
