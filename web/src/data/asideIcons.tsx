import { ASIDEICONS } from "@/types/enums/AsideIcons";
import IconBook from "@assets/icons/iconBook";
import IconBox from "@assets/icons/iconBox";
import IconCart from "@assets/icons/iconCart";
import IconHome from "@assets/icons/iconHome";
import IconInventory from "@assets/icons/iconInventory";
import IconPointer from "@assets/icons/iconPointer";
import IconSell from "@assets/icons/iconSell";
import {MapPin,Phone,Settings,Home,HospitalIcon,Dock,Library,LayoutDashboard} from "lucide-react"
export const asideIcons: Record<ASIDEICONS, JSX.Element> = {
  [ASIDEICONS.CONTACTOS]: <Phone />,
  [ASIDEICONS.COMPRAS]: <IconCart />,
  [ASIDEICONS.VENTAS]: <IconSell />,
  [ASIDEICONS.INVENTARIO]: <IconInventory />,
  [ASIDEICONS.PUNTERO]: <IconPointer />,
  [ASIDEICONS.DASHBOARD]: <LayoutDashboard />,
  [ASIDEICONS.CONTABLE]: <IconBook />,
  [ASIDEICONS.CONFIGURACION]: <Settings />,
  [ASIDEICONS.HOME]: <IconHome />,
  [ASIDEICONS.CATALOGO]: <IconBox />,
  [ASIDEICONS.LABORATORIO]: <HospitalIcon />,
  [ASIDEICONS.GESTIONCLINICA]: <Home />,
  [ASIDEICONS.REGIONES]: <MapPin />,
  [ASIDEICONS.CONTROLCARTILLA]: <Dock />,
  [ASIDEICONS.REPORTES]: <Library />,
};
