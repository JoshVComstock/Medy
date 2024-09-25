export interface TarifaDetalleRes {
  id:string;
  idMoneda: number;
  idProducto: number ;
  idProductoCategoria: number ;
  idProductoBase: number ;
  precioComputable: string;
  precioFijo: number;
  descuento: number ;
  aplicadoEn: string;
  cantidadMin: number;
  fechaInicio: Date;
  fechaFin: Date;
}
