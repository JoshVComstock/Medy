import { BaseRes } from "./Base";

export interface CategoriaContactoRes extends BaseRes {
  id: number;
  idPadre: number;
  nombre: string;
  pathPadre: string;
  color: number;
}
