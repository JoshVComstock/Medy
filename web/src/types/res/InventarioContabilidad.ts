import { BaseRes } from "./Base";
import { CuentasRes } from "./CuentasRes";

export interface InventarioContabilidadRes extends BaseRes {
  id: number;
  idContableCuenta: number;
  descripcion: string;
  precioCompra: number;
  fechaCompra: string;
  fechaIniDepreciacion: string;
  valTotDeprec: string;
  contableCuenta: CuentasRes;
}
