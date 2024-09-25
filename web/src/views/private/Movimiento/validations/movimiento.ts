import * as Yup from "yup";

export const movimientoSchema = Yup.object({
  idEmpresa: Yup.number().required("Empresa es requerido"),
  descripcion: Yup.string().required(" Descripcion es requerida"),
  monto: Yup.string().required(" Monto es requerida"),
  idTipoMovimiento: Yup.number().required("Tipo movimiento es requerido")
});

export interface MovimientoForm
  extends Yup.InferType<typeof movimientoSchema> {}
