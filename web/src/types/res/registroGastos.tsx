import { BaseRes } from "./Base";
import { UsuarioRes } from "./UsuarioRes";

export interface RegistroGastosRes extends BaseRes {
  id: number;
  autorizado: string;
  descripcion: string;
  factura: string;
  recibo: string;
  moneda: string;
  montoBs?: number;
  montoSus?: number;
  usuario: UsuarioRes;
  fechaCreacion:string;
}
