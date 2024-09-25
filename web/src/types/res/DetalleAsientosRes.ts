import { BaseRes } from "./Base";
import { CuentasRes } from "./CuentasRes";

export interface DetalleAsientosRes extends BaseRes {
  id: number;
  idCuenta: number;
  cuenta: CuentasRes;
  idAsiento: number;
  conceptoAsiento: string;
  glosa: string;
  moneda: string;
  debeBs: number;
  haberBs: number;
  debeSus: number;
  haberSus: number;
}
