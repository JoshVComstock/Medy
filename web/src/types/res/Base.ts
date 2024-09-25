import { ModelState } from "../enums/ModelState";

export interface BaseRes {
  idUsrCreacion: number | null;
  idUsrModificacion: number | null;
  fechaCreacion: string | null;
  fechaModificacion: string | null;
  estado: ModelState;
}
