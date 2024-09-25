import { BaseRes } from "./Base";

export interface TipoCambioRes extends BaseRes {
  id: number;
  fecha: string;
  dolar: number;
  ufv: number;
}
