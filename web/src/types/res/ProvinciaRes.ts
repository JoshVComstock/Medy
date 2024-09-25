import { BaseRes } from "./Base";
import { CiudadRes } from "./CiudadRes";

export interface ProvinciaRes extends BaseRes {
  id: number;
  idCiudad: number;
  nombre: string;
  ciudad: CiudadRes;
}
