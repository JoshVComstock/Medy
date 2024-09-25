import * as Yup from "yup";

export const resultadoSchema = Yup.object({
  fechaIngreso: Yup.date().required("Fecha de ingreso es requerida"),
  fechaResultado: Yup.date().required("Fecha de resultado es requerida"),
  fechaEntregado: Yup.date().required("Fecha de entrega es requerida"),
  resultadoPaciente: Yup.string().required(
    "Resultado del paciente es requerido"
  ),
  metodo: Yup.string().required("Método es requerido"),
  valorResultado: Yup.string().required("Valor del resultado es requerido"),
  valorReferencia: Yup.string().required("Valor de referencia es requerido"),
  observacion: Yup.string().nullable(),
  idCartilla: Yup.number().required("Cartilla es requerida"),
  idLaboratorio: Yup.number().required("Laboratorio es requerido"),
});

export interface ResultadoForm extends Yup.InferType<typeof resultadoSchema> {}
