import { EmpresaRes } from "./EmpresaRes";

export interface ConfigRes  {
  id: number;
  nombre: string;
  limiteProducto: number;
  limiteContactos: number;
  idEmpresa: number;
  idTipoTerminal: number;
  empresa:EmpresaRes;
}