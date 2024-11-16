import { ROUTES } from "@/types/enums/Routes";
import CategoriaContacto from "@/views/private/CategoriaContacto";
import Contacto from "@/views/private/Contacto";
import Empresa from "@/views/private/Empresa";
import Grupo from "@/views/private/Grupo";
import RiMenu from "@/views/private/Menu";
import Modelos from "@/views/private/Modelos";
import Usuario from "@/views/private/Usuarios";
import ContactoDetalle from "@/views/private/ContactoDetalle";
import Config from "@/views/private/Config";
//import ConfiguracionDecimales from "@/views/private/ConfiguracionDecimales/ConfiguracionDecimales";
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
  [ROUTES.CENTROS]: {
    name: "Centros",
    component: <div>Centros</div>,
  },
  [ROUTES.CONTACTOS]: {
    name: "Contactos",
    component: <div>Contactos</div>,
  },
  [ROUTES.INFORMACION]: {
    name: "Informacion",
    component: <div>Informacion</div>,
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
  [ROUTES.LOGIN]: {
    name: "Login",
    component: <div>Login</div>,
  },
  [ROUTES.INFORMATIVA]: {
    name: "Informativa",
    component: <div>Informativa</div>,
  },
  [ROUTES.HOME]: {
    name: "Home",
    component: <div>Home</div>,
  },
  [ROUTES.PROGRAMAS]: {
    name: "Programas",
    component: <div>Programas</div>,
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

  [ROUTES.PUNTO_DE_VENTA_CONFIGURACION_CONFIG]: {
    name: "Configuraciones",
    component: <Config />,
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
  /* <TipoComprobantes />, <Categoria />, <ModuloCategoria />, <Producto />  */
};
