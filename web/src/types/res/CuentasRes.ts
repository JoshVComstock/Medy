import { BaseRes } from "./Base";

export interface CuentasRes extends BaseRes {
  id: number;
  codigo: string;
  descripcion: string;
  padre: string | null;
  moneda: string | null;
  nivel: number;
}

export interface ReportBalanceGeneral {
  codigo: string;
  descripcion: string;
  sumaDebe: number;
  sumaHaber: number;
}
