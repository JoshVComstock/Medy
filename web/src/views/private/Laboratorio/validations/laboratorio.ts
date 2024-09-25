import * as Yup from "yup";

export const laboratorioSchema = Yup.object({
  nombre: Yup.string().required("Nombre es requerido"),
  idProvincia: Yup.number().required("La provincia es requerida"),
  direccion: Yup.string().required("Direccion es requerido"),
  telefono: Yup.string().required("telefono es requerido"),
});

export interface LaboratorioForm
  extends Yup.InferType<typeof laboratorioSchema> {}
