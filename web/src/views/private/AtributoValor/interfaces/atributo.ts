import { BaseRes } from "@/types/res/Base";
export interface atributoRes extends BaseRes {
  id: string;
  secuencia: number;
  nombre: string;
  tipoVisualizacion: string;
  modoCreacion: string;
}

export type Atributo = atributoRes;

export interface AtributoValorRes extends BaseRes {
  id: string;
  idAtributo: string;
  nombre: string;
  secuencia: number;
  color: number;
  colorHtml: string;
  personalizable: boolean;
}

export type AtributoValor = AtributoValorRes;
