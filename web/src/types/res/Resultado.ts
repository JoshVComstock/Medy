import { CartillaRes } from "./CartillaRes";

export interface ResultadoRes {
  id: number;
  fechaIngreso: Date;
  fechaResultado: Date;
  fechaEntregado: Date;
  resultadoPaciente: string;
  metodo: string;
  valorResultado: string;
  valorReferencia: string;
  observacion?: string;
  idCartilla: number;
  idLaboratorio: number;
  Cartilla: CartillaRes;
}
