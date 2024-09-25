import { BaseRes } from "./Base";
import { ProvinciaRes } from "./ProvinciaRes";

export interface MunicipioRes extends BaseRes {
  id: number;
  idProvincia: number;
  nombre: string;
  provincia: ProvinciaRes;
}
