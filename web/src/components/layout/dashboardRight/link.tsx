import { NavLink as RouterLink, useLocation } from "react-router-dom";
import { PageLink } from "@/data/asideData";
import IconChevronDown from "@assets/icons/iconChevronDown";
import Expandable from "@/components/common/utils/expandable";
import { useState } from "react";

interface Props {
  to: string;
  children: string;
  disabled?: boolean;
  tab: number;
  childrens: PageLink[];
  onClick: () => void;
}

const Link = ({
  to,
  children,
  disabled,
  childrens,
  tab,
  onClick,
}: Props) => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  
  const isActiveRoute = (childrens: PageLink[]) => {
    for (let i = 0; i < childrens.length; i++) {
      if (childrens[i].accion === pathname || isActiveRoute(childrens[i].hijos)) {
        return true;
      }
    }
    return false;
  };

  const active = pathname === to || isActiveRoute(childrens);
  const classNames = [
    "peer block text-sm py-2 rounded-md px-2 text-gray-500 transition-all duration-300 whitespace-nowrap flex justify-between hover:text-primary-500 hover:",
  ];
  if (active) {
    classNames.push("text-primary-500");
  }

  if (disabled) {
    classNames.push("pointer-events-none");
    return (
      <a onClick={onClick} className={classNames.join(" ")}>
        {children}
      </a>
    );
  }
    classNames.push("hover:bg-white");

  classNames.push("peer-hover:bg-white");

  const hasChildren = childrens.length > 0;
  return (
    <div className="group relative">
      {hasChildren ? (
        <button
          onClick={() => setOpen(!open)}
          className={classNames.join(" ")}
          style={{
            width: `calc(100% - ${tab * 14}px)`,
            marginLeft: `${tab * 14}px`,
          }}
        >
          <p className="overflow-hidden text-ellipsis whitespace-nowrap">
            {children}
          </p>
          <div
            className="h-5 transition-all duration-200"
            style={{
              transform: open ? "rotate(-180deg)" : "unset",
            }}
          >
            <IconChevronDown />
          </div>
        </button>
      ) : (
        <RouterLink
          title={children}
          onClick={onClick}
          className={classNames.join(" ")}
          to={to}
          style={{
            marginLeft: `${tab * 14}px`,
          }}
        >
          <p className="overflow-hidden text-ellipsis whitespace-nowrap">
            {children}
          </p>
        </RouterLink>
      )}

      {hasChildren && (
        <Expandable expand={open}>
          <div className="pt-1 bg-white rounded-md shadow-xl flex flex-col gap-1">
            {childrens.map((link, i) => (
              <Link
                key={i}
                onClick={onClick}
                disabled={link.hijos.length == 0 && !link.accion}
                to={link.accion || ""}
                childrens={link.hijos}
                tab={tab + 1}
              >
                {link.nombre}
              </Link>
            ))}
          </div>
        </Expandable>
      )}
    </div>
  );
};

export default Link;
