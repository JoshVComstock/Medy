import { ASIDEICONS } from "@/types/enums/AsideIcons";
import { ROUTES } from "../types/enums/Routes";

export interface PageLink {
  id: number;
  nombre: string;
  padre: string;
  accion: ROUTES | null;
  hijos: PageLink[];
}

export interface Page {
  id: number;
  icon: ASIDEICONS;
  nombre: string;
  hijos: PageLink[];
}

//AHORA ESTO SALE DE LA BASE DE DATOS, PERO SIRVE DE EJEMPLO PARA VER LA ESTRUCTURA
/* const asideData: Page[] = [
  {
    id: 1,
    nombre: "Home",
    icon: ASIDEICONS.HOME,
    hijos: [
      {
        id: 5,
        nombre: "Inicio",
        accion: ROUTES.INICIO,
        hijos: [],
      },
      {
        id: 6,
        nombre: "Mis datos",
        accion: ROUTES.PROFILE,
        hijos: [],
      },
    ],
  },
  {
    id: 2,
    nombre: "Contable",
    icon: ASIDEICONS.CONTABLE,
    hijos: [
      {
        id: 7,
        nombre: "Cuentas",
        accion: ROUTES.CUENTAS,
        hijos: [],
      },
      {
        id: 8,
        nombre: "Tipo de comprobantes",
        accion: ROUTES.TIPOCOMPROBANTES,
        hijos: [],
      },
      {
        id: 9,
        nombre: "Asientos",
        accion: ROUTES.ASIENTOS,
        hijos: [],
      },
    ],
  },
  {
    id: 3,
    nombre: "Catalogo",
    icon: ASIDEICONS.CATALOGO,
    hijos: [
      {
        id: 10,
        nombre: "Categoria",
        accion: ROUTES.CATEGORIAS,
        hijos: [
          {
            id: 11,
            nombre: "Modulo categoria",
            accion: ROUTES.MODULOCATEGORIA,
            hijos: [],
          },
        ],
      },
      {
        id: 12,
        nombre: "Producto",
        accion: ROUTES.PRODUCTO,
        hijos: [],
      },
    ],
  },
  {
    id: 4,
    nombre: "Contactos",
    icon: ASIDEICONS.CONTACTOS,
    hijos: [
      {
        id: 13,
        nombre: "Categoria",
        accion: ROUTES.CATEGORIACONTACTO,
        hijos: [],
      },
      {
        id: 14,
        nombre: "Contacto",
        accion: ROUTES.CONTACTO,
        hijos: [],
      },
      {
        id: 15,
        nombre: "Grupo",
        accion: ROUTES.GRUPO,
        hijos: [],
      },
      {
        id: 16,
        nombre: "Menu",
        accion: ROUTES.MENU,
        hijos: [],
      },
    ],
  },
];

export default asideData; */
