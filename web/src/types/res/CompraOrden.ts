import { ContactoInfoRes } from "./ContactoRes";
import { EmpresaRes } from "./EmpresaRes";
import { MonedaRes } from "./MonedaRes";
import { ProductoRes } from "./ProductoRes";
import UnidadMedidaRes from "./UnidadMedida";

export interface CompraOrdenRes {
  id: number;
  idProveedor: number;
  idMoneda: number;
  moneda: MonedaRes;
  refProveedor: string;
  codOrden: string;
  idEmpresa: number;
  estadoCompra: number;
  prioridad: number;
  nota: string;
  idUsrComprador: number;
  montoSinImpuesto: number;
  montoImpuesto: number;
  montoTotal: number;
  fechaLimitePedido: Date;
  fechaConfirmacion: Date;
  fechaEntregaPlanifi: Date;
  proveedor: ContactoInfoRes;
  empresa: EmpresaRes;
  compraOrdenDetalle: CompraOrdenDetalleRes[];
  nombre: string;
}
export interface CompraOrdenDetalleRes {
  idProducto: number;
  idUnidadMedida: number;
  idMoneda: number;
  idEmpaquetado: number;
  nombre: string;
  cantidad: number;
  precioUnitario: number;
  precioSubtotal: number;
  precioTotal: number;
  precioImpuesto: number;
  cantidadSolicitada: number;
  cantidadRecibida: number;
  cantidadPaquete: number;
  fechaEsperada: Date;
}
export interface CompraOrdenDetalleInfoRes {
  idProducto: number;
  producto:ProductoRes;
  idUnidadMedida: number;
  idMoneda: number;
  moneda: MonedaRes;
  unidadMedida: UnidadMedidaRes;
  idEmpaquetado: number;
  nombre: string;
  cantidad: number;
  precioUnitario: number;
  precioSubtotal: number;
  precioTotal: number;
  precioImpuesto: number;
  cantidadSolicitada: number;
  cantidadRecibida: number;
  cantidadPaquete: number;
  fechaEsperada: Date;
}
