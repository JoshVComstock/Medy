import { BaseRes } from "./Base";

export interface ProductoRes extends BaseRes {
  id: number
  idProdBase: number
  codInterno: string
  codFabricante: string
  codBarras: string
  volumen: number
  peso: number
  pathImagen: any
  nombre: string
  descripcion: string
  atributos: AtributoForProducto[]
}

export interface AtributoForProducto {
  nombre: string
  idAtributoValor: number
  idAtributo: number
}