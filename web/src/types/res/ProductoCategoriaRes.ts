
import { BaseRes } from "./Base";

export interface ProductoCategoriaRes extends BaseRes {
  id: number;
  nombre: string;
  idPadre:string
  metodoEmbalaje:string
  nombreCompleto:string
  pathPadre:string
  idEstrategiaEliminacion:number
}
