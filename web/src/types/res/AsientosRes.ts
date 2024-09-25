import { BaseRes } from "./Base";
import { TipoComprobantesRes } from "./TipoComprobantesRes";

export interface AsientosRes extends BaseRes {
  id: number;
  idTipoComprobante: number;
  tipoComprobante: TipoComprobantesRes;
  numeroComprobante: string;
  fecha: string;
  concepto: string;
  fechaCreacion: string;
  activo: boolean;
}

export interface ReportFlujoEfectivo {
  totalIngreso: number;
  totalEgreso: number;
  asientos: SumDetalleAsientosByAsientos[];
}

export interface SumDetalleAsientosByAsientos {
  id: number;
  concepto: string;
  fecha: string;
  totalDebe: number;
  totalHaber: number;
  tipoComprobante: string;
}
