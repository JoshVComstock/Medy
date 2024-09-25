import { BaseRes } from "./Base";
import { MunicipioRes } from "./MunicipioRes";

export interface CentroRes extends BaseRes {
  id: number;
  idMunicipio: number;
  direccion: string;
  nombre: string;
  area: string;
  seguimientoCasos: string;
  contacto: string;
  telefono: string;
  municipio: MunicipioRes;
}
