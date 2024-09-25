import { BaseRes } from "./Base";

export interface ModuloCategoriaRes extends BaseRes {
  id: number;
  idPadre: number;
  nombre: string;
  descripcion: string;
  secuencia: number;
  visible: boolean;
  exclusivo: boolean;
}
