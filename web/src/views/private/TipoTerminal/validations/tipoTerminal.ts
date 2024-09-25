import * as Yup from "yup";

export const tipoTerminalSchema = Yup.object({
  nombre: Yup.string().required("Nombre es requerido"),
});

export interface TipoTerminalForm
  extends Yup.InferType<typeof tipoTerminalSchema> {}
