import { ModelState } from "../enums/ModelState";

export interface User {
  id: number;
  idTipoUsuario: number;
  idEmpresa: number;
  idContacto: number;
  idAccion: number;
  idUsrCreacion: number;
  idUsrModificacion: number;
  telefono: string;
  login: string;
  password: string;
  codigoSecreto: string;
  firma: string;
  notificacion: string;
  estadoBot: string;
  codigoBot: string;
  activo: boolean;
  estado: ModelState;
}
