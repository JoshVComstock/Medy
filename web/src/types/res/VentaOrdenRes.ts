import { VentaOrdenDetalleRes } from "./VentaOrdenDetalleRes";

export interface VentaOrdenRes {
  id: number;
  idEmpresa: number;
  idCliente: number;
  idTerminosPago: number;
  idPrecio: number;
  idMoneda: number;
  idVendedor: number;
  idEquipo: number;
  idAlmacen: number;
  toker: string;
  codigoOrden: string;
  estadoOrden: string;
  estadoFacturacion: string;
  fechaValidez: Date;
  tc: number;
  montoSinImpuesto: number;
  montoImpuesto: number;
  montoImpago: number;
  montoTotal: number;
  nota: string;
  ventaOrdenDetalles: VentaOrdenDetalleRes[];
}
