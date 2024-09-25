import { PacienteRes } from "./PacienteRes";

export interface CartillaRes {
  id: number;
  codigoBarras: string;
  fechaTomaMuestras: Date;
  numeroMuestra: number;
  transfucion?: boolean | null;
  antibioticos?: string | null;
  notas?: string | null;
  paciente: PacienteRes;
}
export interface CartillaFormRes {
  // Datos de la Madre
  id: number;
  nombreMadre: string;
  ciMadre: string;
  direccionMadre: string;
  detalleDireccionMadre?: string;
  telefonoMadre: string;
  telefonoEmergenciaMadre: string;
  tratamientoHiportiroidismo: boolean;
  tratamientoHipertiroidismo: boolean;
  tratamientoMadre: string;
  enfermedadMadre: string;
  idProvincia: number | null;

  // Datos del Paciente
  nombrePaciente: string;
  sexoPaciente: string;
  edadGestacionalSemanaPaciente: number;
  edadGestacionalDiaPaciente: number;
  fechaNacimientoPaciente: Date;
  pesoNacimientoPaciente: number;
  nacimientoTerminoPaciente: boolean;

  // Datos de la Cartilla
  codigoBarras: string;
  fechaTomaMuestras: Date;
  numeroMuestra: number;
  transfucion?: boolean | null;
  antibioticos?: string | null;
  notas?: string | null;
}
