import { BaseRes } from "./Base";
import { EmpresaRes } from "./EmpresaRes";
import { MovimientoDetalleRes } from "./movimientoDetalleRes";
import { TipoMovimientoRes } from "./TipoMovimientoRes";

export interface MovimientoRes extends BaseRes {
  id: number;
  idEmpresa: number;
  descripcion: string;
  monto: number;
  idTipoMovimiento: number;
  empresa: EmpresaRes;
  tipoMovimiento: TipoMovimientoRes;
  movimientoDetalle: MovimientoDetalleRes[];
}
