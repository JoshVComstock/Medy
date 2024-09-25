import * as Yup from "yup";

export const provinciaCartillaSchema = Yup.object({
  tipoManejo: Yup.string().required("Tipo manejo es requerido"),
  idCentro: Yup.number().required("Centro es requerido"),
  cantidadEntrega: Yup.number(),
  cantidadRecivida: Yup.number(),
  codigoTarjetaInicio: Yup.number().required("codigo inicial es requerido"),
  codigoTarjetaFinal: Yup.number().required("Codigo final es requerido"),
  entregadoPor: Yup.string().required("Entregado por es requerido"),
  recibidoPor: Yup.string(),
  telefono: Yup.string(),
});

export interface ProvinciaCartillaForm
  extends Yup.InferType<typeof provinciaCartillaSchema> {}
