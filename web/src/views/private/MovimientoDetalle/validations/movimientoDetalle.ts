import * as Yup from "yup";

export const movimientoDetalleSchema = Yup.object({
  idEmpresa: Yup.number().nullable().required("Empresa es requerida"),
  fecha: Yup.date().required("Fecha es requerida"),
  idTipoEfectivo: Yup.number().required("Tipo efectivo es requerida"),
  cantidad: Yup.number().required("cantidad es requerida"),
  montoNumerico: Yup.number().required("Monto numerico es requerida"),
  idTipoMovimiento: Yup.number().required("Tipo movimiento es requerida"),
  ciclo: Yup.number().required("Ciclo es requerida")
});

export interface MovimientoDetalleForm
  extends Yup.InferType<typeof movimientoDetalleSchema> {}
