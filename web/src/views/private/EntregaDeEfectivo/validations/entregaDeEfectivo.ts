import * as Yup from "yup";

export const entregaDeEfectivoSchema = Yup.object({
  descripcion: Yup.string().required("Descripción es requerido"),
  cajera: Yup.string().required("Cajera es requerido"),
  moneda: Yup.string().required("Seleccione una moneda"),
  montoBs: Yup.number(),
  montoSus: Yup.number()
});

export interface EntregaDeEfectivoForm extends Yup.InferType<typeof entregaDeEfectivoSchema> {}
