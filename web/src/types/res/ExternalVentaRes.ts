export interface ExternalVentaRes {
  cabecera: ExternalVentaCabecera[]
  detalle: any[]
}

export interface ExternalVentaCabecera {
  PEDIDO: number
  EMPRESA: number
  RAZAO_SOCIAL: string
  COD_CLIENTE: number
  RG_INSC?: string
  NOME: string
  EMAIL?: string
  DATA: string
  VENDEDOR: string
  TOTAL_PAGO: number
  TOTAL_PEDIDO: number
  OBS: string
  POSICAO: string
  DTFECHAMENTO: string
  TOTAL_PRODUTOS: number
  NRO_FACTURA?: number
  FECHA_FACTURA?: string
}
