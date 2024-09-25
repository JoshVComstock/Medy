import { ASIDEICONS } from "@/types/enums/AsideIcons";
import IconBook from "@assets/icons/iconBook";
import IconBox from "@assets/icons/iconBox";
import IconCart from "@assets/icons/iconCart";
import IconCartilla from "@assets/icons/iconCartilla";
import IconClinica from "@assets/icons/iconClinica";
import IconConfig from "@assets/icons/iconConfig";
import IconContact from "@assets/icons/iconContact";
import IconHome from "@assets/icons/iconHome";
import IconInventory from "@assets/icons/iconInventory";
import IconLab from "@assets/icons/iconLab";
import IconMenu from "@assets/icons/iconMenu";
import IconPointer from "@assets/icons/iconPointer";
import IconRegiones from "@assets/icons/iconRegion";
import IconReportes from "@assets/icons/iconReportes";
import IconSell from "@assets/icons/iconSell";

export const asideIcons: Record<ASIDEICONS, JSX.Element> = {
  [ASIDEICONS.CONTACTOS]: <IconContact />,
  [ASIDEICONS.COMPRAS]: <IconCart />,
  [ASIDEICONS.VENTAS]: <IconSell />,
  [ASIDEICONS.INVENTARIO]: <IconInventory />,
  [ASIDEICONS.PUNTERO]: <IconPointer />,
  [ASIDEICONS.DASHBOARD]: <IconMenu />,
  [ASIDEICONS.CONTABLE]: <IconBook />,
  [ASIDEICONS.CONFIGURACION]: <IconConfig />,
  [ASIDEICONS.HOME]: <IconHome />,
  [ASIDEICONS.CATALOGO]: <IconBox />,
  [ASIDEICONS.LABORATORIO]: <IconLab />,
  [ASIDEICONS.GESTIONCLINICA]: <IconClinica />,
  [ASIDEICONS.REGIONES]: <IconRegiones />,
  [ASIDEICONS.CONTROLCARTILLA]: <IconCartilla />,
  [ASIDEICONS.REPORTES]: <IconReportes />,
};
