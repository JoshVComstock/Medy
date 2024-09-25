import { LocalChanges } from "@/types/interfaces/LocalChanges";
import { AsientosRes } from "@/types/res/AsientosRes";
import { BaseRes } from "@/types/res/Base";
import { CuentasRes } from "@/types/res/CuentasRes";
import { DetalleAsientosRes } from "@/types/res/DetalleAsientosRes";
import { TipoComprobantesRes } from "@/types/res/TipoComprobantesRes";

export interface LocalAsientosRes extends BaseRes {
  id: string;
  idTipoComprobante: number;
  tipoComprobante: TipoComprobantesRes;
  numeroComprobante: string;
  fecha: string;
  concepto: string;
  fechaCreacion: string;
}

export type LocalAsientos = LocalChanges<LocalAsientosRes, AsientosRes>;

export interface LocalDetalleAsientosRes extends BaseRes {
  id: string;
  idAsiento: string;
  idCuenta: number;
  cuenta: CuentasRes;
  glosa: string;
  moneda: string;
  debeBs: number;
  haberBs: number;
  debeSus: number;
  haberSus: number;
}

export type LocalDetalleAsientos = LocalChanges<
  LocalDetalleAsientosRes,
  DetalleAsientosRes
>;
