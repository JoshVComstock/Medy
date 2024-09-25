import { BaseRes } from "./Base";
import { EfectivoRes } from "./EfectivoRes";


export interface AperturaCajaRes extends BaseRes {
  id: number
  idEfectivo: number
  valor: number
  descripcion: string
  cantidad: number
  fecha: string
  tipo: string
  efectivo: EfectivoRes
}
