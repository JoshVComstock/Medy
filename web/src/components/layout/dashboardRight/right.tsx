import IconX from "@assets/icons/iconX";
import Button from "../../common/button/button";
import styles from "../dashboard.module.css";
import Link from "./link";
import { useUser } from "@/context/user";
import { MENUS } from "@/types/enums/Menus";
import { useContabilidad } from "@/context/contabilidad";

interface Props {
  page: number;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openNav: boolean;
}

const Right = ({ page, open, openNav, setOpen }: Props) => {
  const { menu: asideData } = useUser();
  const { cambioActual, libroDiarioActivo } = useContabilidad();
  const pageSelected = asideData?.find((value) => value.id === page);
  const handleCloseNav = () => {
    if (!openNav) {
      setOpen(false);
    }
  };

  const classNames = [
    styles.right,
    "z-50 transition-all duration-300 overflow-hidden bg-gray-700 fixed h-full left-20",
  ];
  if (open) {
    classNames.push("w-64");
  } else {
    classNames.push("w-0 pointer-events-none");
  }

  const getPagesToRender = () => {
    if (!pageSelected) return [];
    const pages = pageSelected.hijos.filter((page) => {
      if (
        page.padre === MENUS.CONTABILIDAD &&
        !cambioActual &&
        !(
          page.nombre === MENUS.TIPO_DE_CAMBIO ||
          page.nombre === MENUS.CONTABILIDAD_REPORTES
        )
      ) {
        return false;
      }
      return true;
    });
    return pages;
  };

  const pages = getPagesToRender();
  return (
    <div className={classNames.join(" ")}>
      <header className="h-20 flex items-center justify-center relative">
        <div className="absolute top-2 right-2">
          <Button
            onClick={handleCloseNav}
            btnType="tertiary"
            icon={<IconX />}
          />
        </div>
        <h2 className="text-gray-400 whitespace-nowrap">
          <div className="flex flex-col items-center">
            <p>{pageSelected?.nombre}</p>
            {pageSelected?.nombre == "Contabilidad" && (
              <small className="text-blue-500">
                ({libroDiarioActivo?.nombre}
                {libroDiarioActivo?.visualizacion == "Privado" &&
                  ` - ${libroDiarioActivo?.visualizacion}`}
                )
              </small>
            )}
          </div>
        </h2>
      </header>
      <div className="px-4 flex flex-col gap-1" key={pageSelected?.nombre}>
        <p className="w-[calc(256px_-_32px)] text-center leading-6   text-gray-400 text-sm">
          {pages.length === 0 && "Por el momento no puedes hacer nada aquí"}
        </p>
        {pages.map((link, i) => (
          <Link
            key={i}
            onClick={handleCloseNav}
            disabled={link.hijos.length == 0 && !link.accion}
            to={link.accion || ""}
            childrens={link.hijos}
            tab={0}
          >
            {link.nombre}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Right;
