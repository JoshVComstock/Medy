import { useLocation } from "react-router-dom";
import { Page, PageLink } from "../../data/asideData";
import { useUser } from "@/context/user";

type Return =
  | {
      activeLink: PageLink;
      activePage: Page;
    }
  | {
      activeLink: undefined;
      activePage: undefined;
    };

const initialReturn: Return = {
  activeLink: undefined,
  activePage: undefined
}

export const useActiveNavPage = (): Return => {
  const { pathname } = useLocation();
  const { menu: asideData } = useUser();

  const getActiveLinkRecursive = (hijos: PageLink[], page: Page): Return => {
    for (const link of hijos) {
      if (link.accion?.startsWith(pathname)) {
        return {
          activePage: page,
          activeLink: link,
        };
      }

      let found: Return = initialReturn;
      if (link.hijos.length > 0) {
        found = getActiveLinkRecursive(link.hijos, page);
        if (found.activePage && found.activeLink) {
          return found;
        }
      }
    }
    return initialReturn;
  };

  let actives: Return = initialReturn;
  if (asideData) {
    for (const page of asideData) {
      actives = getActiveLinkRecursive(page.hijos, page);
      if (actives.activeLink) break;
    }
  }

  return actives;
};
