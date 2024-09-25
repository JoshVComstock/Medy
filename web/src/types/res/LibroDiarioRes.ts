export interface LibroDiarioRes {
  id: number;
  idPadreLibro: number;
  visualizacion: string;
  fechaInicio: string;
  fechaCierre: string;
  activo: boolean;
  nombre: string;
  descripcion: string;
  importante: boolean;
  idUsuario: number;
}
