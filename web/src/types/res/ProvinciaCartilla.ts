import { BaseRes } from "./Base";
import { CentroRes } from "./CentroRes";

export interface ProvinciaCartillaRes extends BaseRes {
  id: number;
  tipoManejo: number;
  idCentro: number;
  cantidadEntrega: number;
  cantidadRecivida: number;
  codigoTarjetaInicio: number;
  codigoTarjetaFinal: number;
  entregadoPor: string;
  recibidoPor: string;
  telefono: string;
  centro: CentroRes;
}
