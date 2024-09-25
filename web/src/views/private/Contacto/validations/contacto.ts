import * as Yup from "yup";

export const contactoSchema = Yup.object({
  idEmpresa: Yup.number().nullable(),
  idPadre: Yup.number().nullable(),
  tipoContacto: Yup.string().required("Tipo contacto es requerido"),
  nombre: Yup.string().required("Nombre es requerido"),
  profesion: Yup.string().required("Profesión es requerida"),
  nombreDespliegue: Yup.string().required("Nombre de Despliegue es requerido"),
  identFiscal: Yup.string().required("Identificación Fiscal es requerida"),
  color: Yup.number().required("Color es requerido"),
  idPais: Yup.number().required("País es requerido"),
  idCiudad: Yup.number().required("Ciudad es requerido"),
  esEmpresa: Yup.boolean(),
  direccion1: Yup.string().required("Dirección 1 es requerida"),
  direccion2: Yup.string().required("Dirección 2 es requerida"),
  numeracion: Yup.string().required("numeracion es requerido"),
  zona: Yup.string().required("Zona es requerido"),
  longitud: Yup.number().required("Longitud  es requerido"),
  latitud: Yup.number().required("Latitud es requerido"),
  telefonoFijo: Yup.string().required("Teléfono Fijo es requerido"),
  telefonoMovil: Yup.string().required("Teléfono Móvil es requerido"),
  puestoTrabajo: Yup.string().required("Puesto de Trabajo es requerido"),
  email: Yup.string().required("Correo Electrónico es requerido"),
  sitioWeb: Yup.string(),
  comentario: Yup.string().required("Comentario es requerido"),
  idsCategContacto:Yup.array().required("Categoria es requerido"),
});

export interface ContactoForm extends Yup.InferType<typeof contactoSchema> {}
