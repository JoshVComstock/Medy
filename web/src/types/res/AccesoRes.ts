import { MODELOS } from "../enums/Modelos";
import { BaseRes } from "./Base";

export interface AccesoRes extends BaseRes {
  id: number;
  idGrupo: number;
  idModelo: number;
  nombreModelo: MODELOS;
  fechaCreacion: string;
  fechaModificacion: string;
  ver: boolean;
  crear: boolean;
  editar: boolean;
  eliminar: boolean;
}
