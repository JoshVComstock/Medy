export enum ROUTES {
  INDEX = "/",
  REGISTER = "/registro",

  DASHBOARD = "/dashboard",
  INICIO = ROUTES.DASHBOARD + "/inicio",
  PROFILE = ROUTES.DASHBOARD + "/profile",

  CONTACTO_CONFIGURACION = ROUTES.DASHBOARD + "/contactos-configuracion",
  CONTACTO = ROUTES.DASHBOARD + "/contactos",
  CONTACTO_CATEGORIAS = ROUTES.DASHBOARD + "/contactos-categorias",
  CONTACTO_EMPRESA = ROUTES.DASHBOARD + "/contactos-empresa",
  BANCO = ROUTES.DASHBOARD + "/banco",
  CONTACTO_BANCO = ROUTES.DASHBOARD + "/contacto-banco",
  CONTACTO_DETALLE = ROUTES.DASHBOARD + "/contactos/",

  CONTACTO_CONFIGURACION_BANCO = ROUTES.DASHBOARD + "/configuracion-banco",
  CONTACTO_CONFIGURACION_CUENTAS_BANCARIAS = ROUTES.DASHBOARD +
    "/configuracion-cuentas-bancarias",

  COMPRAS_INFORMES = ROUTES.DASHBOARD + "/compras-informes",
  COMPRAS_CONFIGURACION = ROUTES.DASHBOARD + "/compras-configuracion",
  COMPRAS_PEDIDOS_SOLICITUDES = ROUTES.DASHBOARD +
    "/compras-pedidos-solicitudes",
  COMPRAS_PEDIDOS_COMPRA = ROUTES.DASHBOARD + "/compras-pedidos-compra",
  COMPRAS_PEDIDOS_PROVEEDORES = ROUTES.DASHBOARD +
    "/compras-pedidos-proveedores",
  COMPRAS_PRODUCTOS_PRODUCTOS = ROUTES.DASHBOARD + "/compras-productos-base",
  COMPRAS_PRODUCTOS_PRODUCTOS_DETALLES = ROUTES.DASHBOARD +
    "/compras-productos-base/",
  COMPRAS_PRODUCTOS_VARIANTES = ROUTES.DASHBOARD +
    "/compras-productos-variantes",
  COMPRAS_PRODUCTOS_TARIFA = ROUTES.DASHBOARD + "/compras-productos-tarifa",
  VENTAS_VENTAS_ORDEN = ROUTES.DASHBOARD + "/ventas-ventas",

  PUNTO_DE_VENTA_CONFIGURACION_CONFIG = ROUTES.DASHBOARD + "/config",
  PUNTO_DE_VENTA_CONFIGURACION_TIPOMOVIMIENTO = ROUTES.DASHBOARD +
    "/tipo-movimiento",
  PUNTO_DE_VENTA_CONFIGURACION_TIPOTERMINAL = ROUTES.DASHBOARD +
    "/tipo-terminal",
  PUNTO_DE_VENTA_CONFIGURACION_MOVIMIENTO = ROUTES.DASHBOARD + "/movimiento",

  COMPRAS_PRODUCTOS_CATEGORIA = ROUTES.DASHBOARD + "/producto-categoria",
  COMPRAS_METODO_PAGO = ROUTES.DASHBOARD + "/metodo-pago",
  COMPRAS_CONFIGURACION_CATEGORIA_PRODUCTOS = ROUTES.DASHBOARD +
    "/compras-categorias-productos",
  COMPRAS_PRODUCTOS_ATRIBUTO = ROUTES.DASHBOARD + "/producto-atributo",

  VENTAS_PEDIDOS = ROUTES.DASHBOARD + "/ventas-pedidos",
  VENTAS_FACTURAS = ROUTES.DASHBOARD + "/ventas-facturas",
  VENTAS_PRODUCTOS = ROUTES.DASHBOARD + "/ventas-productos",
  VENTAS_INFORMES = ROUTES.DASHBOARD + "/ventas-informes",
  VENTAS_CONFIGURACION = ROUTES.DASHBOARD + "/ventas-configuracion",
  VENTAS_PEDIDOS_COTIZACIONES = ROUTES.DASHBOARD + "/pedidos-cotizaciones",
  VENTAS_PEDIDOS_PEDIDOS = ROUTES.DASHBOARD + "/pedidos-pedidos",
  VENTAS_PEDIDOS_CLIENTES = ROUTES.DASHBOARD + "/pedidos-clientes",
  VENTAS_PEDIDOS_PEDIDOS_A_FACTURAR = ROUTES.DASHBOARD +
    "/pedidos-pedidos-a-facturar",
  VENTAS_PRODUCTOS_PRODUCTOS = ROUTES.DASHBOARD + "/productos-productos",
  VENTAS_PRODUCTOS_VARIANTES_DE_PRODUCTO = ROUTES.DASHBOARD +
    "/productos-variantes-de-producto",
  VENTAS_PRODUCTOS_TARIFAS_SIMPLES = ROUTES.DASHBOARD +
    "/productos-tarifas-simples",
  VENTAS_PRODUCTOS_TARIFAS_AVANZADAS = ROUTES.DASHBOARD +
    "/productos-tarifas-avanzadas",

  PUNTO_DE_VENTA_APERTURA_DE_CAJA = ROUTES.DASHBOARD +
    "/punto-de-venta-apertura-de-caja",

  PUNTO_DE_VENTA_ENTREGA_EFECTIVO = ROUTES.DASHBOARD +
    "/punto-de-venta-entrega-efectivo",
  PUNTO_DE_VENTA_CONFIGURACION = ROUTES.DASHBOARD +
    "/punto-de-venta-configuracion",
  PUNTO_DE_VENTA_CONFIGURACION_MONEDAS = ROUTES.DASHBOARD +
    "/punto-de-venta-monedas",
  PUNTO_DE_VENTA_CONFIGURACION_TIPOS_INGRESOS = ROUTES.DASHBOARD +
    "/punto-de-venta-tipos-ingresos",
  PUNTO_DE_VENTA_INGRESO_EXTRA = ROUTES.DASHBOARD + "/ingreso-extra",
  PUNTO_DE_VENTA_SALDO_FAVOR = ROUTES.DASHBOARD + "/saldo-Favor",
  PUNTO_DE_VENTA_REGISTRO_GASTOS = ROUTES.DASHBOARD +
    "/punto-de-venta-registro-de-gastos",

  CONTABILIDAD_LIBRO_DIARIO = ROUTES.DASHBOARD + "/contabilidad-libro-diario",
  CONTABILIDAD_CUENTAS = ROUTES.DASHBOARD + "/contabilidad-cuentas",
  CONTABILIDAD_ASIENTOS = ROUTES.DASHBOARD + "/contabilidad-asientos",
  CONTABILIDAD_LIBRO_COMPRAS = ROUTES.DASHBOARD + "/contabilidad-libro-compras",
  CONTABILIDAD_LIBRO_VENTAS = ROUTES.DASHBOARD + "/contabilidad-libro-ventas",
  CONTABILIDAD_SUMAS_SALDOS = ROUTES.DASHBOARD + "/contabilidad-sumas-saldos",
  CONTABILIDAD_FLUJO_EFECTIVO = ROUTES.DASHBOARD +
    "/contabilidad-flujo-efectivo",
  CONTABILIDAD_BALANCE_GENERAL = ROUTES.DASHBOARD +
    "/contabilidad-balance-general",
  CONTABILIDAD_REGISTRO_CAJA = ROUTES.DASHBOARD + "/registro-caja",
  CONTABILIDAD_INVENTARIO = ROUTES.DASHBOARD + "/inventario-contabilidad",

  CONFIGURACION_USUARIOS = ROUTES.DASHBOARD + "/configuracion-usuarios",
  CONFIGURACION_GRUPOS = ROUTES.DASHBOARD + "/configuracion-grupos",
  CONFIGURACION_MENUS = ROUTES.DASHBOARD + "/configuracion-menus",
  CONFIGURACION_MODELOS = ROUTES.DASHBOARD + "/configuracion-modelos",
  CONFIGURACION_DECIMALES = ROUTES.DASHBOARD + "/configuracion-decimales",

  PUNTO_DE_VENTA_RM_CATEGORIA = ROUTES.DASHBOARD + "/punto-de-venta-categoria",
  /* TIPOCOMPROBANTES = ROUTES.DASHBOARD + "/tipocomprobantes", */
  /* CATEGORIAS = ROUTES.DASHBOARD + "/categoria", */
  /* MODULOCATEGORIA = ROUTES.DASHBOARD + "/modulocategoria", */
  /* PRODUCTO = ROUTES.DASHBOARD + "/producto", */

  //Pesquisas
  CIUDAD = ROUTES.DASHBOARD + "/ciudades",
  PROVINCIA = ROUTES.DASHBOARD + "/provincias",
  MUNICIPIO = ROUTES.DASHBOARD + "/municipios",
  CENTRO = ROUTES.DASHBOARD + "/centros",
  LABORATORIO = ROUTES.DASHBOARD + "/laboratorio",
  MANEJOCARTILLA = ROUTES.DASHBOARD + "/provincia-cartilla",
  MANEJOCARTILLAHOSPITAL = ROUTES.DASHBOARD + "/hospital-cartilla",
  TODORESULTADO = ROUTES.DASHBOARD + "/todo-resultados",
  PENDIENTESRESULTADOS = ROUTES.DASHBOARD + "/pendientes-resultados",
  PENDIENTESENVIO = ROUTES.DASHBOARD + "/pendientes-envio",
  NUEVORESULTADO = ROUTES.DASHBOARD + "/nuevo-resultado",
  CARTILLA = ROUTES.DASHBOARD + "/cartilla",
  PACIENTESNEGATIVOS = ROUTES.DASHBOARD + "/paciente-negativo",
  PACIENTESPOSITIVOS = ROUTES.DASHBOARD + "/paciente-positivo",
  PACIENTESTODOS = ROUTES.DASHBOARD + "/paciente-todos",
  FALTANTES = ROUTES.DASHBOARD + "/faltantes",

}
