import * as Yup from "yup";

export const compraOrdenSchema = Yup.object({
  idProveedor: Yup.number().required("El proveedor es requerido"),
  idMoneda: Yup.number().required("Moneda es requerido"),
  refProveedor: Yup.string().required("Referencia de Proveedor es requerida"),
  codOrden: Yup.string().required("Código de Orden es requerido"),
  idEmpresa: Yup.number().required("Empresa es requerido"),
  estadoCompra: Yup.number().required("Estado de compra es requerido"),
  prioridad: Yup.number().required("Prioridad es requerida"),
  nota: Yup.string().required("Nota es requerida"),
  idUsrComprador: Yup.number().required("Usuario Comprador es requerido"),
  montoSinImpuesto: Yup.number().required("Monto sin Impuesto es requerido"),
  montoImpuesto: Yup.number().required("Monto de Impuesto es requerido"),
  montoTotal: Yup.number().required("Monto Total es requerido"),
  fechaLimitePedido: Yup.date().required("Fecha Límite de Pedido es requerida"),
  fechaConfirmacion: Yup.date().required("Fecha de Confirmación es requerida"),
  fechaEntregaPlanifi: Yup.date().required("Fecha de Entrega Planificada es requerida"),
});

export interface CompraOrdenForm extends Yup.InferType<typeof compraOrdenSchema> {}
