import { AccesoRes } from "./AccesoRes";
import { BaseRes } from "./Base";
import { MenuRes } from "./MenuRes";

export interface GrupoRes extends BaseRes {
  id: number;
  idCategoria: number;
  nombre: string;
  descripcion: string;
  menus: MenuRes[];
  accesos: AccesoRes[];
}
