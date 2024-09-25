import * as Yup from "yup";

export const CuentasAcitvosSchema = Yup.object({
  idContableCuenta: Yup.number().required("La cuenta es requerida"),
  tiempo: Yup.number().required("El tiempo es requerido"),
  montoDepreciado: Yup.number()
    .required("El monto depreciado es requerido")
    .max(100, "El monto depreciado no puede ser mayor a 100"),
});

export interface CuentasActivosForm
  extends Yup.InferType<typeof CuentasAcitvosSchema> {}
