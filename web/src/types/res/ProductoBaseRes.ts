import { BaseRes } from "./Base";

export interface ProductoBaseAtributoValor {
  idAtributo: number;
  idAtribValor: number;
  precioExtra: number;
}
export interface ProductoBaseRes extends BaseRes {
  id: number;
  idCategoria: number;
  idUnidadMedida: number;
  idUnidadMedCompra: number;
  idEmpresa: number;
  idTipoProducto: number;
  secuencia: number;
  color: number;
  codInterno: string;
  codFabricante: string;
  codBarras: string;
  prioridad: string;
  nombre: string;
  descripcion: string;
  descripcionCompra: string;
  descripcionVenta: string;
  precioVenta: number;
  precioCosto: number;
  volumen: number;
  peso: number;
  vendible: boolean;
  comprable: boolean;
  configurable: boolean;
  fechaCreacion: string;
  fechaModificacion: string;
  trazabilidad: string;
  plazoEntregaCli: string;
  tipoServEnt: string;
  prodBaseAtributoValor: ProductoBaseAtributoValor[];
  cantidadVariantes: number;
}
