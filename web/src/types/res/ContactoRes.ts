import { BaseRes } from "./Base";
import { CategoriaContactoRes } from "./CategoriaContactoRes";

export interface ContactoRes extends BaseRes {
  id: number;
  idPadre: number;
  tipoContacto: string;
  idEmpresa: number;
  nombre: string;
  profesion: string;
  nombreDespliegue: string;
  identFiscal: string;
  color: number;
  idPais: number;
  idCiudad: number;
  esEmpresa: boolean;
  direccion1: string;
  direccion2: string;
  numeracion: string;
  zona: string;
  longitud: number;
  latitud: number;
  telefonoFijo: string;
  telefonoMovil: string;
  puestoTrabajo: string;
  email: string;
  sitioWeb: string;
  comentario: string;
  categorias: CategoriaContactoRes[];
}
export interface ContactoInfoRes {
  tipoContacto: string;
  idEmpresa: number;
  nombre: string;
  profesion: string;
  direccion1: string;
  telefonoFijo: string;
  telefonoMovil: string;
  puestoTrabajo: string;
  email: string;
}
