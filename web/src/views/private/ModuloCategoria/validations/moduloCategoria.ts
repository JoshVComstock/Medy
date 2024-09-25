import * as Yup from "yup";

export const moduloCategoriaSchema = Yup.object({
  nombre: Yup.string().required("Nombre es requerido"),
  descripcion:Yup.string().required("La descripcion es requerida"),
  idPadre:Yup.string().required("Este campo es requerido"),
  secuencia:Yup.number().required("La secuencia es requerida"),
  visible:Yup.bool(),
  exclusivo:Yup.bool(),
});

export interface ModuloCategoriaForm
  extends Yup.InferType<typeof moduloCategoriaSchema> {}
