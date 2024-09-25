import { NavigateFunction } from "react-router-dom";
import { ROUTES } from "../types/enums/Routes";
import { deleteAuthCookie } from "./authCookie";
import { localTableConfigName } from "@/components/common/table/hooks/useTableConfig";
import { alertError } from "./alertsToast";

export const checkResponse = (
  response: Response,
  navigate: NavigateFunction,
  alert = true
): boolean => {
  if (response.status === 401) {
    if (alert) {
      alertError("No autorizado");
    }
    navigate(ROUTES.INDEX);
    localStorage.removeItem(localTableConfigName);
    deleteAuthCookie();
    return false;
  }
  return true;
};
