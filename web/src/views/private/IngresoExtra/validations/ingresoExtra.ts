import * as Yup from "yup";

export const ingresoExtraSchema = Yup.object({
    descripcion: Yup.string().required("Descripción es requerida"),
    nroDeVenta: Yup.number().required("Nro de venta es requerido"),
    recibo: Yup.number().required("Recibo es requerido"),
    factura: Yup.number().required("Factura es requerida"),
    tipoIngreso: Yup.string().required("Tipo de ingreso es requerido"),
    monto: Yup.number().required("Monto es requerido")
});

export interface IngresoExtraForm
  extends Yup.InferType<typeof ingresoExtraSchema> {}
 