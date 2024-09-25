import * as Yup from "yup";

export const InventarioContabilidadSchema = Yup.object({
  idContableCuenta: Yup.number().required("La cuenta es requerida"),
  descripcion: Yup.string().required("La descripcion es requerida"),
  precioCompra: Yup.number().required("El precio compra es requerido"),
  fechaCompra: Yup.date()
    .required("Fecha de compra es requerida")
    .min(
      Yup.ref("fechaIniDepreciacion"),
      "Esta fecha no puede ser menor a la fecha de incio depreciación"
    ),
  fechaIniDepreciacion: Yup.date().required(
    "Fecha de incio de depreciación es requerida"
  ),
});

export interface InventarioContabilidadForm
  extends Yup.InferType<typeof InventarioContabilidadSchema> {}
