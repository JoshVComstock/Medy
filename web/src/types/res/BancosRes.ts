import { BaseRes } from "./Base";
import { CuentasRes } from "./CuentasRes";

export interface BancosRes extends BaseRes {
  id: number;
  idCuenta: number;
  nombre: string;
  numeroCuenta: string;
  cuenta: CuentasRes;
}
