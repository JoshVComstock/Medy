import { routecomponents } from "@/data/routeComponents";
import { ROUTES } from "@/types/enums/Routes";
import { useLocation } from "react-router-dom";
import { useHeaderContext } from "@/context/header";
import { useEffect } from "react";

export const useHeaderPage = () => {
  const { setWindows } = useHeaderContext();
  const { pathname } = useLocation();
  useEffect(() => {
    const Page = routecomponents[pathname as ROUTES];
    if (Page) {
      setWindows((state) => {
        const exist = state.some((v) => v.name === Page.name);
        if (!exist) {
          return [...state, { name: Page.name, route: pathname }];
        }
        return state;
      });
    }
  }, [pathname]);
};
