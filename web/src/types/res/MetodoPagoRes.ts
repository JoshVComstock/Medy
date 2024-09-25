import { BaseRes } from "./Base";

export interface MetodoPagoRes extends BaseRes {
  id: number;
  tipoPago: string;
}
