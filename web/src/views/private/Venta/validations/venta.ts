import * as Yup from "yup";

export const ventaOrdenSchema = Yup.object({
  idEmpresa: Yup.number().required("Empresa es requerido"),
  idCliente: Yup.number().required("Cliente es requerido"),
  idTerminosPago: Yup.number().required("Términos de Pago es requerido"),
  idPrecio: Yup.number().required("Precio es requerido"),
  idMoneda: Yup.number().required(" Moneda es requerido"),
  idVendedor: Yup.number().required("Vendedor es requerido"),
  idEquipo: Yup.number().required(" Equipo es requerido"),
  idAlmacen: Yup.number().required("Almacén es requerido"),
  toker: Yup.string().required("Toker es requerido"),
  codigoOrden: Yup.string().required("Código de Orden es requerido"),
  estadoOrden: Yup.string().required("Estado de Orden es requerido"),
  estadoFacturacion: Yup.string().required(
    "Estado de Facturación es requerido"
  ),
  fechaValidez: Yup.date().required("Fecha de Validez es requerida"),
  tc: Yup.number().required("Tc es requerido"),
  montoSinImpuesto: Yup.number().required("Monto sin Impuesto es requerido"),
  montoImpuesto: Yup.number().required("Monto de Impuesto es requerido"),
  montoImpago: Yup.number().required("Monto de Impago es requerido"),
  montoTotal: Yup.number().required("Monto Total es requerido"),
  nota: Yup.string().required("Nota es requerida"),
});

export interface VentaOrdenForm
  extends Yup.InferType<typeof ventaOrdenSchema> {}
