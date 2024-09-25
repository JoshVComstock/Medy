import * as Yup from "yup";

export const empresaSchema = Yup.object({
  idContacto: Yup.number().required("Contacto es requerido"),
  idMoneda: Yup.number().required("Moneda es requerido"),
  idPadre: Yup.number().required("Padre es requerido"),
  nombre: Yup.string().required("Nombre es requerido"),
  empresaDetalles: Yup.string().required("Detalles de la empresa son requeridos"),
  secuencia: Yup.number().required("Secuencia es requerida"),
  email: Yup.string().email("Correo electrónico inválido").required("Email es requerido"),
  telefonoFijo: Yup.string().required("Teléfono fijo es requerido"),
  telefonoMovil: Yup.string().required("Teléfono móvil es requerido"),
  fuenteLetra: Yup.string().required("Fuente de letra es requerida"),
  colorPrimario: Yup.string().required("Color primario es requerido"),
  colorSecundario: Yup.string().required("Color secundario es requerido"),
  colorBackground: Yup.string().required("Color de fondo es requerido"),
  pieInforme: Yup.string().required("Pie de informe es requerido"),
  cabeceraInforme: Yup.string().required("Cabecera de informe es requerida"),
  pathLogo: Yup.string().required("Ruta del logo es requerida"),
  idNomenclatura: Yup.number().required("Nomenclatura es requerido"),
  codigoQR: Yup.string().required("Código QR es requerido"),
});

export interface EmpresaForm extends Yup.InferType<typeof empresaSchema> {}
