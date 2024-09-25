import { ROUTES } from "@/types/enums/Routes";
import Asientos from "@/views/private/Asientos";
import Atributo from "@/views/private/Atributo";
import Categoria from "@/views/private/Categoria";
import Banco from "@/views/private/Banco";
import CategoriaContacto from "@/views/private/CategoriaContacto";
import CompraOrden from "@/views/private/Compra";
import Contacto from "@/views/private/Contacto";
import ContactoBanco from "@/views/private/ContactoBanco";
import Cuentas from "@/views/private/Cuentas";
import Empresa from "@/views/private/Empresa";
import Grupo from "@/views/private/Grupo";
import LibroDiario from "@/views/private/LibroDiario";
import LibroVentas from "@/views/private/LibroVentas";
import RiMenu from "@/views/private/Menu";
import MetodoPago from "@/views/private/MetodoPago";
import Modelos from "@/views/private/Modelos";
import ProductoBase from "@/views/private/ProductoBase";
import ProductoCategoria from "@/views/private/ProductoCategoria";
import ProductoDetalles from "@/views/private/ProductoDetalles";
import ProductoVariantes from "@/views/private/ProductoVariantes";
import Usuario from "@/views/private/Usuarios";
import VentaOrden from "@/views/private/Venta";
import Monedas from "@/views/private/Moneda/intex";
import SumasSaldos from "@/views/private/SumasSaldos";
import Tarifa from "@/views/private/Tarifa";
import ContactoDetalle from "@/views/private/ContactoDetalle";
import Config from "@/views/private/Config";
import TipoMovimiento from "@/views/private/TipoMovimiento";
import TipoTerminal from "@/views/private/TipoTerminal";
import Movimiento from "@/views/private/Movimiento";
import ConfiguracionDecimales from "@/views/private/ConfiguracionDecimales/ConfiguracionDecimales";
import RegistroCaja from "@/views/private/RegistroCaja";
import RmCategoria from "@/views/private/RmCategoria";
import FlujoEfectivo from "@/views/private/FlujoEfectivo";
import BalanceGeneral from "@/views/private/BalanceGeneral";
import IngresoExtra from "@/views/private/IngresoExtra";
import SaldoFavor from "@/views/private/SaldoFavor";
import EntregaDeEfectivo from "@/views/private/EntregaDeEfectivo";
import InventarioContabilidad from "@/views/private/InventarioContabilidad";
import AperturaCaja from "@/views/private/AperturaCaja/AperturaCaja";
import RegistroGastos from "@/views/private/RegistoGastos";
import Ciudad from "@/views/private/Ciudad";
import Provincia from "@/views/private/Provincia";
import Municipio from "@/views/private/Municipio";
import Centro from "@/views/private/Centro";
import Laboratorio from "@/views/private/Laboratorio";
import ProvinciaCartilla from "@/views/private/ProvinciaCartilla";
import HospitalCartilla from "@/views/private/HospitalCartilla";
import ResultadoPendienteEnvio from "@/views/private/ResultadoPendienteEnvio";
import ResultadoTodo from "@/views/private/ResultadoTodo";
import ResultadosPendientes from "@/views/private/ResultadoPendiente";
import Resultado from "@/views/private/Resultado";
import Cartilla from "@/views/private/Cartilla";
import PacientesNegativos from "@/views/private/PacientesNegativos";
import PacientesPositivos from "@/views/private/PacientesPositivos";
import PacientesTodos from "@/views/private/PacientesTodos";
import Faltantes from "@/views/private/Faltantes";

export const routecomponents: Record<
  ROUTES,
  {
    name: string;
    component: JSX.Element;
  }
> = {
  [ROUTES.INDEX]: {
    name: "Index",
    component: <div>Index</div>,
  },
  [ROUTES.REGISTER]: {
    name: "Register",
    component: <div>Register</div>,
  },
  [ROUTES.DASHBOARD]: {
    name: "Dashboard",
    component: <div>Dashboard</div>,
  },

  [ROUTES.INICIO]: {
    name: "Inicio",
    component: <div>Inicio</div>,
  },
  [ROUTES.PROFILE]: {
    name: "Perfil",
    component: <div>Profile</div>,
  },
  [ROUTES.MUNICIPIO]: {
    name: "Municipio",
    component: <Municipio />,
  },
  [ROUTES.CENTRO]: {
    name: "Centros",
    component: <Centro />,
  },

  [ROUTES.CARTILLA]: {
    name: "Cartilla",
    component: <Cartilla />,
  },
  
  [ROUTES.FALTANTES]: {
    name: "Faltantes",
    component: <Faltantes />,
  },
  [ROUTES.PACIENTESNEGATIVOS]: {
    name: "Paciente negativo",
    component: <PacientesNegativos />,
  },
  [ROUTES.PACIENTESPOSITIVOS]: {
    name: "Paciente positivo",
    component: <PacientesPositivos />,
  },

  [ROUTES.PACIENTESTODOS]: {
    name: "Paciente todos",
    component: <PacientesTodos />,
  },
  [ROUTES.TODORESULTADO]: {
    name: "Todos resultados",
    component: <ResultadoTodo />,
  },
  [ROUTES.NUEVORESULTADO]: {
    name: "Nuevo resultado",
    component: <Resultado />,
  },
  [ROUTES.PENDIENTESENVIO]: {
    name: "Pendiente envio",
    component: <ResultadoPendienteEnvio />,
  },
  [ROUTES.PENDIENTESRESULTADOS]: {
    name: "Pendiente resultados",
    component: <ResultadosPendientes />,
  },
  [ROUTES.MANEJOCARTILLAHOSPITAL]: {
    name: "Hospital cartilla",
    component: <HospitalCartilla />,
  },
  [ROUTES.MANEJOCARTILLA]: {
    name: "Provincia cartilla",
    component: <ProvinciaCartilla />,
  },
  [ROUTES.LABORATORIO]: {
    name: "Laboratorio",
    component: <Laboratorio />,
  },
  [ROUTES.PROVINCIA]: {
    name: "Provincia",
    component: <Provincia />,
  },
  [ROUTES.CIUDAD]: {
    name: "Ciudad",
    component: <Ciudad />,
  },
  [ROUTES.CONTACTO_CONFIGURACION]: {
    name: "Configuración de contactos",
    component: <div>Configuración de contactos</div>,
  },
  [ROUTES.CONTACTO]: {
    name: "Contactos",
    component: <Contacto />,
  },
  [ROUTES.CONTACTO_DETALLE]: {
    name: "Contacto",
    component: <ContactoDetalle />,
  },
  [ROUTES.CONTACTO_CATEGORIAS]: {
    name: "Categorías de contactos",
    component: <CategoriaContacto />,
  },
  [ROUTES.CONTACTO_EMPRESA]: {
    name: "Empresa de contactos",
    component: <Empresa />,
  },
  [ROUTES.CONTACTO_CONFIGURACION_BANCO]: {
    name: "Banco",
    component: <div>Bancos</div>,
  },
  [ROUTES.CONTACTO_CONFIGURACION_CUENTAS_BANCARIAS]: {
    name: "Cuentas bancarias",
    component: <div>Cuentas bancarias</div>,
  },
  [ROUTES.CONTACTO_BANCO]: {
    name: "Contacto banco",
    component: <ContactoBanco />,
  },
  [ROUTES.BANCO]: {
    name: "Banco",
    component: <Banco />,
  },
  [ROUTES.COMPRAS_PRODUCTOS_ATRIBUTO]: {
    name: "Atributos",
    component: <Atributo />,
  },
  [ROUTES.COMPRAS_INFORMES]: {
    name: "Informes de compra",
    component: <div>Informes de compra</div>,
  },
  [ROUTES.COMPRAS_CONFIGURACION]: {
    name: "Configuraciones de compra",
    component: <div>Configuraciones de compra</div>,
  },
  [ROUTES.COMPRAS_PEDIDOS_SOLICITUDES]: {
    name: "Solicitudes de pedidos",
    component: <div>Solicitudes de pedidos</div>,
  },
  [ROUTES.COMPRAS_PEDIDOS_COMPRA]: {
    name: "Compras de pedidos",
    component: <CompraOrden />,
  },
  [ROUTES.COMPRAS_METODO_PAGO]: {
    name: "Metodo de pago",
    component: <MetodoPago />,
  },
  [ROUTES.COMPRAS_PRODUCTOS_CATEGORIA]: {
    name: "Producto categoria",
    component: <ProductoCategoria />,
  },
  [ROUTES.VENTAS_VENTAS_ORDEN]: {
    name: "Venta",
    component: <VentaOrden />,
  },
  [ROUTES.COMPRAS_PEDIDOS_PROVEEDORES]: {
    name: "Proveedores de pedidos",
    component: <div>Proveedores de pedidos</div>,
  },
  [ROUTES.COMPRAS_PRODUCTOS_VARIANTES]: {
    name: "Variantes de productos",
    component: <ProductoVariantes />,
  },
  [ROUTES.COMPRAS_PRODUCTOS_PRODUCTOS]: {
    name: "Productos base",
    component: <ProductoBase />,
  },
  [ROUTES.COMPRAS_PRODUCTOS_PRODUCTOS_DETALLES]: {
    //revisar
    name: "Producto",
    component: <ProductoDetalles />,
  },
  [ROUTES.COMPRAS_CONFIGURACION_CATEGORIA_PRODUCTOS]: {
    name: "Categorias productos",
    component: <Categoria />,
  },

  [ROUTES.VENTAS_PEDIDOS]: {
    name: "Pedidos",
    component: <div>Pedidos</div>,
  },
  [ROUTES.VENTAS_FACTURAS]: {
    name: "Facturas",
    component: <div>Facturas</div>,
  },
  [ROUTES.VENTAS_PRODUCTOS]: {
    name: "Productos",
    component: <div>Productos</div>,
  },
  [ROUTES.VENTAS_INFORMES]: {
    name: "Informes",
    component: <div>Informes</div>,
  },
  [ROUTES.VENTAS_CONFIGURACION]: {
    name: "Configuracion ventas",
    component: <div>Configuración</div>,
  },
  [ROUTES.VENTAS_PEDIDOS_COTIZACIONES]: {
    name: "Pedidos cotizaciones",
    component: <div>Pedidos cotizaciones</div>,
  },
  [ROUTES.VENTAS_PEDIDOS_PEDIDOS]: {
    name: "Pedidos",
    component: <div>Pedidos pedidos</div>,
  },
  [ROUTES.VENTAS_PEDIDOS_CLIENTES]: {
    name: "Pedidos clientes",
    component: <div>Pedidos clientes</div>,
  },
  [ROUTES.VENTAS_PEDIDOS_PEDIDOS_A_FACTURAR]: {
    name: "Pedidos a facturar",
    component: <div>Pedidos a facturar</div>,
  },
  [ROUTES.VENTAS_PRODUCTOS_PRODUCTOS]: {
    name: "Productos",
    component: <ProductoBase />,
  },
  [ROUTES.VENTAS_PRODUCTOS_VARIANTES_DE_PRODUCTO]: {
    name: "Variantes de producto",
    component: <ProductoVariantes />,
  },
  [ROUTES.VENTAS_PRODUCTOS_TARIFAS_SIMPLES]: {
    name: "Tarifas simples",
    component: <Tarifa />,
  },
  [ROUTES.VENTAS_PRODUCTOS_TARIFAS_AVANZADAS]: {
    name: "Tarifas avanzadas",
    component: <div>Tarifas avanzadas</div>,
  },

  [ROUTES.PUNTO_DE_VENTA_APERTURA_DE_CAJA]: {
    name: "Apertura/Cierre de caja",
    component: <AperturaCaja />,
  },
  [ROUTES.PUNTO_DE_VENTA_ENTREGA_EFECTIVO]: {
    name: "Entrega efectivo",
    component: <EntregaDeEfectivo />,
  },

  [ROUTES.PUNTO_DE_VENTA_INGRESO_EXTRA]: {
    name: "Ingreso extra",
    component: <IngresoExtra />,
  },
  [ROUTES.COMPRAS_PRODUCTOS_TARIFA]: {
    name: "Tarifa",
    component: <Tarifa />,
  },
  [ROUTES.PUNTO_DE_VENTA_CONFIGURACION]: {
    name: "Configuración de punto de venta",
    component: <div>Configuración de punto de venta</div>,
  },
  [ROUTES.PUNTO_DE_VENTA_CONFIGURACION_MONEDAS]: {
    name: "Monedas",
    component: <Monedas />,
  },
  [ROUTES.PUNTO_DE_VENTA_CONFIGURACION_TIPOS_INGRESOS]: {
    name: "Tipos ingreso",
    component: <div>Tipos ingresos</div>,
  },
  [ROUTES.PUNTO_DE_VENTA_CONFIGURACION_CONFIG]: {
    name: "Configuraciones",
    component: <Config />,
  },
  [ROUTES.PUNTO_DE_VENTA_SALDO_FAVOR]: {
    name: "Saldo a favor",
    component: <SaldoFavor />,
  },
  [ROUTES.PUNTO_DE_VENTA_CONFIGURACION_TIPOMOVIMIENTO]: {
    name: "Tipo movimiento",
    component: <TipoMovimiento />,
  },
  [ROUTES.PUNTO_DE_VENTA_CONFIGURACION_TIPOTERMINAL]: {
    name: "Tipo terminal",
    component: <TipoTerminal />,
  },
  [ROUTES.PUNTO_DE_VENTA_CONFIGURACION_MOVIMIENTO]: {
    name: "Movimiento",
    component: <Movimiento />,
  },
  [ROUTES.CONTABILIDAD_LIBRO_DIARIO]: {
    name: "Libro diario",
    component: <LibroDiario />,
  },
  [ROUTES.CONTABILIDAD_CUENTAS]: {
    name: "Cuentas",
    component: <Cuentas />,
  },
  [ROUTES.CONTABILIDAD_ASIENTOS]: {
    name: "Asientos",
    component: <Asientos />,
  },
  [ROUTES.CONTABILIDAD_LIBRO_COMPRAS]: {
    name: "Libro de compras",
    component: <LibroVentas />,
  },
  [ROUTES.CONTABILIDAD_LIBRO_VENTAS]: {
    name: "Libro de ventas",
    component: <LibroVentas />,
  },

  [ROUTES.CONTABILIDAD_SUMAS_SALDOS]: {
    name: "Sumas y saldos",
    component: <SumasSaldos />,
  },

  [ROUTES.CONTABILIDAD_FLUJO_EFECTIVO]: {
    name: "Flujo de efectivo",
    component: <FlujoEfectivo />,
  },

  [ROUTES.CONTABILIDAD_BALANCE_GENERAL]: {
    name: "Balance general",
    component: <BalanceGeneral />,
  },

  [ROUTES.CONFIGURACION_USUARIOS]: {
    name: "Usuarios",
    component: <Usuario />,
  },
  [ROUTES.CONFIGURACION_GRUPOS]: {
    name: "Grupos",
    component: <Grupo />,
  },
  [ROUTES.CONFIGURACION_MENUS]: {
    name: "Menús",
    component: <RiMenu />,
  },
  [ROUTES.CONFIGURACION_MODELOS]: {
    name: "Modelos",
    component: <Modelos />,
  },
  [ROUTES.PUNTO_DE_VENTA_RM_CATEGORIA]: {
    name: "RmCategoria",
    component: <RmCategoria />,
  },
  [ROUTES.CONTABILIDAD_REGISTRO_CAJA]: {
    name: "Registro de caja",
    component: <RegistroCaja />,
  },
  [ROUTES.CONFIGURACION_DECIMALES]: {
    name: "Configuración decimales",
    component: <ConfiguracionDecimales />,
  },
  [ROUTES.CONTABILIDAD_INVENTARIO]: {
    name: "Inventario",
    component: <InventarioContabilidad />,
  },
  [ROUTES.PUNTO_DE_VENTA_REGISTRO_GASTOS]: {
    name: "Registro de gastos",
    component: <RegistroGastos />,
  },

  /* <TipoComprobantes />, <Categoria />, <ModuloCategoria />, <Producto />  */
};
