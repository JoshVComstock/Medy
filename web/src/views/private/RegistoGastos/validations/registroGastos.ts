import { ModelMonedas } from "@/types/enums/Monedsa";
import * as Yup from "yup";

export const RegistroGastosSchema = Yup.object({
  descripcion: Yup.string().required("La descripción es requerida"),
  autorizado: Yup.string().required("La autorización es requerida"),
  recibo: Yup.string().required("El recibo es requerido"),
  factura: Yup.string().required("La factura es requerida"),
  moneda: Yup.string().required("Seleccione una moneda"),
  montoBs: Yup.number().test(
    "requiredIfBs",
    "El monto en Bolivianos es requerido",
    function (value) {
      return this.parent.moneda === ModelMonedas.BS ? !!value : true;
    }
  ),
  montoSus: Yup.number().test(
    "requiredIfSus",
    "El monto en Dólares es requerido",
    function (value) {
      return this.parent.moneda === ModelMonedas.US ? !!value : true;
    }
  ),
});

export interface RegistroGastosForm
  extends Yup.InferType<typeof RegistroGastosSchema> {}
