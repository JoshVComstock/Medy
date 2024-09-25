
export interface PacienteRes {
  id:number;
  nombre: string;
  sexo: string;
  edadGestacionalSemana: number;
  edadGestacionalDia: number;
  fechaNacimiento: Date;
  pesoNacimiento: number;
  nacimientoTermino: boolean;
}
