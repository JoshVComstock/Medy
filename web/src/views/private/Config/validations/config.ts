import * as Yup from "yup";

export const configSchema = Yup.object({
  nombre: Yup.string().required("Nombre es requerido"),
  limiteProducto: Yup.number().required("El limite es requerido"),
  limiteContactos: Yup.number().required("El contacto es requerido"),
  idEmpresa: Yup.number().required("La empresa es requerido"),
  idTipoTerminal: Yup.number().required("El tipo terminal es requerido"),
});

export interface ConfigForm extends Yup.InferType<typeof configSchema> {}
