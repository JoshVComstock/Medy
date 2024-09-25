import * as Yup from "yup";

export const productoBaseSchema = Yup.object({
  idCategoria: Yup.number().required("Categoría es requerida"),
  idUnidadMedida: Yup.number().required("Unidad medida es requerida"),
  idUnidadMedCompra: Yup.number().required("Unidad medida compra es requerida"),
  idEmpresa: Yup.number().required("Empresa es requerida"),
  idTipoProducto: Yup.number().required("Tipo producto es requerido"),
  secuencia: Yup.number().required("Secuencia es requerida"),
  color: Yup.number().required("Color es requerido"),
  codInterno: Yup.string().required("Código interno es requerido"),
  codFabricante: Yup.string().required("Código fabricante es requerido"),
  codBarras: Yup.string().required("Código barras es requerido"),
  prioridad: Yup.string().required("Prioridad es requerida"),
  nombre: Yup.string().required("Nombre es requerido"),
  descripcion: Yup.string().required("Descripción es requerido"),
  descripcionCompra: Yup.string().required("Descripción compra es requerido"),
  descripcionVenta: Yup.string().required("Descripción venta es requerido"),
  precioVenta: Yup.number().required("Precio venta es requerido"),
  precioCosto: Yup.number().required("Precio costo es requerido"),
  volumen: Yup.number().required("Volumen es requerido"),
  peso: Yup.number().required("Peso es requerido"),
  vendible: Yup.boolean(),
  comprable: Yup.boolean(),
  configurable: Yup.boolean(),
  trazabilidad: Yup.string().required("Trazabilidad es requerido"),
  plazoEntregaCli: Yup.string().required("Plazo entrega es requerida"),
  tipoServEnt: Yup.string().required("Tipo servicio de entrega es requerido"),
});

export interface ProductoBaseForm
  extends Yup.InferType<typeof productoBaseSchema> {}
