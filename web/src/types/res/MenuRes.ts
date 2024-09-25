import { BaseRes } from "./Base";
import { ModeloRes } from "./ModeloRes";

export interface MenuRes extends BaseRes {
  id: number;
  idPadre: number;
  secuencia: number;
  pathIcono: string;
  pathPadre: string;
  nombre: string;
  nombrePadre: string;
  accion: string;
  modelos: ModeloRes[];
}
