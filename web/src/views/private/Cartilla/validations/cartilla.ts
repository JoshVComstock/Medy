import * as Yup from "yup";
// Esquema de validación con Yup
export const cartillaSchema = Yup.object({
  // Datos de la Madre
  nombreMadre: Yup.string().required("Nombre de la madre es requerido"),
  ciMadre: Yup.string().required("CI de la madre es requerido"),
  direccionMadre: Yup.string().required("Dirección de la madre es requerida"),
  detalleDireccionMadre: Yup.string(),
  telefonoMadre: Yup.string().required("Teléfono de la madre es requerido"),
  telefonoEmergenciaMadre: Yup.string().required(
    "Teléfono de emergencia es requerido"
  ),
  tratamientoHiportiroidismo: Yup.boolean().required(
    "El tratamiento de hipotiroidismo es requerido"
  ),
  tratamientoHipertiroidismo: Yup.boolean().required(
    "El tratamiento de hipertiroidismo es requerido"
  ),
  tratamientoMadre: Yup.string().required(
    "Tratamiento de la madre es requerido"
  ),
  enfermedadMadre: Yup.string().required("Enfermedad de la madre es requerida"),
  idProvincia: Yup.number().nullable().required("Provincia es requerida"),

  // Datos del Paciente
  nombrePaciente: Yup.string().required("Nombre del paciente es requerido"),
  sexoPaciente: Yup.string().required("Sexo del paciente es requerido"),
  edadGestacionalSemanaPaciente: Yup.number().required(
    "Edad gestacional (semanas) es requerida"
  ),
  edadGestacionalDiaPaciente: Yup.number().required(
    "Edad gestacional (días) es requerida"
  ),
  fechaNacimientoPaciente: Yup.date().required(
    "Fecha de nacimiento es requerida"
  ),
  pesoNacimientoPaciente: Yup.number().required(
    "Peso de nacimiento es requerido"
  ),
  nacimientoTerminoPaciente: Yup.boolean().required(
    "Indicación de nacimiento a término es requerida"
  ),

  // Datos de la Cartilla
  codigoBarras: Yup.string().required("Código de barras es requerido"),
  fechaTomaMuestras: Yup.date().required(
    "Fecha de toma de muestras es requerida"
  ),
  numeroMuestra: Yup.number().required("Número de muestra es requerido"),
  transfucion: Yup.boolean().required("Indicación de transfusión es requerida"),
  antibioticos: Yup.string().nullable(),
  notas: Yup.string().nullable(),
});

// Definición de la interfaz para el formulario usando Yup.InferType
export interface CartillaForm extends Yup.InferType<typeof cartillaSchema> {}
