import { BaseRes } from "@/types/res/Base";
export default interface ingresoExtraRes extends BaseRes {
  id: number;
  descripcion: string;
  nroDeVenta: number;
  recibo: number;
  factura: number;
  tipoIngreso: string;
  monto: number;
}
