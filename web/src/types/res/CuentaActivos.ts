import { BaseRes } from "./Base";
import { CuentasRes } from "./CuentasRes";

export interface CuentasActivosRes extends BaseRes {
  id: number;
  idContableCuenta: number;
  tiempo: number;
  montoDepreciado: number;
  contableCuenta: CuentasRes;
}
