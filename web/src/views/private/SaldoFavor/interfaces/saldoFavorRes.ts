import { BaseRes } from "@/types/res/Base";
import { VentaOrdenRes } from "@/types/res/VentaOrdenRes";
export default interface saldoFavorRes extends BaseRes {
  id: number;
  Descripcion: string;
  TotalFavor: number;
  IdVenta: number;
  venta: VentaOrdenRes;
}
