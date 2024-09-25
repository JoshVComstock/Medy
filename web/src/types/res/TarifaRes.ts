import { EmpresaRes } from "./EmpresaRes";
import { MonedaRes } from "./MonedaRes";
import { TarifaDetalleRes } from "./TarifaDetalleRes";

export interface TarifaRes {
  id: number;
  idEmpresa: number;
  idMoneda: number;
  secuencia?: number;
  empresa: EmpresaRes;
  moneda: MonedaRes;
  nombre: string;
  politicaDescuento: string;
  tarifaDetalle: TarifaDetalleRes[];
}
