import * as Yup from "yup";

export const libroDiarioSchema = Yup.object({
  fechaInicio: Yup.date().required("Fecha inicio es requerido"),
  nombre: Yup.string().required("Nombre es requerido"),
  descripcion: Yup.string().required("Descripcion es requerido"),
});

export interface LibroDiarioForm
  extends Yup.InferType<typeof libroDiarioSchema> {}

export const libroDiarioSchemaImportantShare = Yup.object({
  id: Yup.number().required("Campo requerido, seleccione uno"),
});

export interface LibroDiarioImportantShare
  extends Yup.InferType<typeof libroDiarioSchemaImportantShare> {}
