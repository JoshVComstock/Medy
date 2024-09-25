import { BaseRes } from "./Base";

export interface ModeloRes extends BaseRes {
  id: number;
  modelo: string;
  descripcion: string;
  tipo: string;
  secuencia: string;
  nombreMenu: string;
  idMenu: number;
}
