import * as Yup from "yup";

export const modeloSchema = Yup.object({
  modelo: Yup.string().required("Nombre es requerido"),
  descripcion: Yup.string().required("Descripción es requerida"),
  tipo: Yup.string().required("Tipo es requerido"),
  secuencia: Yup.string().required("Secuencia es requerida"),
  idMenu: Yup.number().required("Menú es requerido"),
});
export interface ModeloForm extends Yup.InferType<typeof modeloSchema> {}
