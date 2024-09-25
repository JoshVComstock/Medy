import { ContactoRes } from "./ContactoRes";
import { MonedaRes } from "./MonedaRes";

export interface EmpresaRes {
  id: number;
  moneda: MonedaRes;
  contacto: ContactoRes;
  idContacto: number;
  idMoneda: number;
  idPadre: number;
  nombre: string;
  empresaDetalles: string;
  secuencia: number;
  email: string;
  telefonoFijo: string;
  telefonoMovil: string;
  fuenteLetra: string;
  colorPrimario: string;
  colorSecundario: string;
  colorBackground: string;
  pieInforme: string;
  cabeceraInforme: string;
  pathLogo: string;
  idNomenclatura: number;
  codigoQR: string;
}
