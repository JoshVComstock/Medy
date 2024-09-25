import { BaseRes } from "./Base";
import { ProvinciaRes } from "./ProvinciaRes";

export interface LaboratorioRes extends BaseRes {
  id: number;
  idProvincia: number;
  direccion: string;
  nombre: string;
  telefono: string;
  provincia: ProvinciaRes;
}
