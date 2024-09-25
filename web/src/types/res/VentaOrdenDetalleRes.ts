export interface VentaOrdenDetalleRes {
    secuencia: number;
    idMoneda: number;
    idProducto: number ;
    idUnidadMedida: number;
    idEmpaquetado: number;
    estadoOrden: string;
    estadoFacturacion: string;
    codigoInterno: string;
    nombre: string;
    cantidad: number;
    precioUnitario: number;
    descuento: number;
    precioReducido: number;
    precioImpuesto: number;
    precioUnitConImpuesto: number;
    precioUnitSinImpuesto: number;
    subtotalConImpuesto: number;
    subtotalSinImpuesto: number;
    cantidadEnviada: number;
    tiempoEspera: number;
  }