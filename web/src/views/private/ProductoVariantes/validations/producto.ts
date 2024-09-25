import * as Yup from "yup";

export const productoSchema = Yup.object({
  codInterno: Yup.string().required("Código interno es requerido"),
  codBarras: Yup.string().required("Código barras es requerido"),
  codFabricante: Yup.string().required("Código fabricante es requerido"),
  volumen: Yup.number().required("Volumen es requerido"),
  peso: Yup.number().required("Peso es requerido"),
  pathImagen: Yup.mixed().nullable(),
});
export interface ProductoForm extends Yup.InferType<typeof productoSchema> {}
