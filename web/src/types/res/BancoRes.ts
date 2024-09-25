import { BaseRes } from "./Base";

export interface BancoRes extends BaseRes{
  id: number;
  nombre: string;
  direccion:string;
  direccion2:string;
  codigoPostal:string;
  ciudad:string;
  email:string;
  telefono:string
}
