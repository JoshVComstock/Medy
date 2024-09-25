import { EmpresaRes } from "./EmpresaRes";
import { GrupoRes } from "./GrupoRes";

export interface UsuarioRes {
  id: number;
  idTipoUsuario: number;
  idEmpresa: number;
  nombreContacto: string;
  nombreTipoUsuario: string;
  idContacto: number;
  idAccion: number;
  telefono: string;
  login: string;
  password: string;
  codigoSecreto?: string;
  firma?: string;
  notificacion?: string;
  estadoBot?: string;
  codigoBot?: string;
  empresa: EmpresaRes;
  activo: boolean;
  grupos: GrupoRes[];
}

export interface UsuarioSimpleRes {
  login: string;
  id: number;
}
