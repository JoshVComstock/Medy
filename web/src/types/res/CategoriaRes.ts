import { BaseRes } from "./Base";

export interface CategoriaRes extends BaseRes {
  id: number;
  idPadre: number;
  nombre: string;
  nombreCompleto: string;
  pathPadre: string;
  idEstrategiaEliminacion: number;
  metodoEmbalaje: string;
}
