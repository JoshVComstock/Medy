import { BancoRes } from "./BancoRes";
import { BaseRes } from "./Base";
import { ContactoRes } from "./ContactoRes";
import { EmpresaRes } from "./EmpresaRes";
import { MonedaRes } from "./MonedaRes";
export interface ContactoBancoRes extends BaseRes {
  id: number;
  idContacto: number;
  idBanco: number;
  idMoneda: number;
  idEmpresa: number;
  moneda: MonedaRes;
  contacto: ContactoRes;
  empresa: EmpresaRes;
  banco: BancoRes;
  numeroCuenta: string;
}
