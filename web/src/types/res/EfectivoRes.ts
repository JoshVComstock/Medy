import { MonedaRes } from "./MonedaRes"

export interface EfectivoRes {
    id: number
    moneda: MonedaRes
    idMoneda: number
    descripcion: string
    valor: number
    idUsrCreacion: number
    idUsrModificacion: number
    estado: string
    fechaModificacion: string
    fechaCreacion: string
  }
  

  