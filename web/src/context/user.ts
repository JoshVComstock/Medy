import { create } from "zustand";
import { User } from "../types/interfaces/User";
import {
  deleteAuthCookie,
  getAuthCookie,
  setAuthCookie,
} from "../utils/authCookie";
import { serverAPI } from "../config";
import { ApiResponse } from "../types/interfaces/ApiResponse";
import { errorAlert } from "../utils/alerts";
import { AUTH, ENDPOINTS } from "../types/enums/Endpoints";
import { Page } from "@/data/asideData";
import { AccesoRes } from "@/types/res/AccesoRes";
import {
  TableConfigObject,
  localTableConfigName,
} from "@/components/common/table/hooks/useTableConfig";
import { MENUS } from "@/types/enums/Menus";

interface LoginBody {
  username: string;
  password: string;
}

interface State {
  user: User | null;
  menu: Page[] | null;
  acceso: AccesoRes[] | null;
  tableConfig: TableConfigObject | null;
  state: "unlogged" | "loading" | "logged";
}

interface Functions {
  setUser: (user: User | null) => void;
  login: (body: LoginBody) => Promise<boolean>;
  getUser: () => Promise<void>;
  logout: () => Promise<void>;
  getMenus: () => Promise<void>;
}

export const userContext = create<State & Functions>((set) => {
  const token = getAuthCookie();
  return {
    user: null,
    menu: null,
    acceso: null,
    tableConfig: null,
    state: token ? "loading" : "unlogged",
    setUser: (user) =>
      set((old) => ({ ...old, user, state: user ? "logged" : "unlogged" })),
    login: async (body) => {
      const logged = await login(body);
      if (!logged) return false;
      const res = await getUser();
      if (!res) return false;
      set((old) => ({
        ...old,
        user: res.user,
        menu: res.menu,
        acceso: res.acceso,
        tableConfig: res.tableConfig,
        state: "logged",
      }));
      return true;
    },
    getUser: async () => {
      const res = await getUser();
      if (!res) return;
      set((old) => ({
        ...old,
        user: res.user,
        menu: res.menu,
        acceso: res.acceso,
        tableConfig: res.tableConfig,
        state: "logged",
      }));
    },
    logout: async () => {
      await logout();
      set((old) => ({
        ...old,
        user: null,
        menu: null,
        acceso: null,
        tableConfig: null,
        state: "unlogged",
      }));
    },
    getMenus: async () => {
      const menus = await getMenus();
      if (menus) {
        set((old) => ({
          ...old,
          menu: menus.data.menus,
          acceso: menus.data.accesos,
        }));
      }
    },
  };
});

function getMenuNames(objeto: any): string[] {
  let nombres = [];
  nombres.push(objeto.nombre);
  if ("hijos" in objeto && Array.isArray(objeto.hijos)) {
    for (const hijo of objeto.hijos) {
      nombres = nombres.concat(getMenuNames(hijo));
    }
  }
  return nombres;
}

export const useUser = () => {
  const state = userContext();

  const canViewMenu = (menu: MENUS) => {
    const names = getMenuNames({ hijos: state.menu });
    const exists = names.some((name) => name === menu);
    return exists;
  };

  return {
    ...state,
    canViewMenu,
  };
};

async function login(body: LoginBody): Promise<boolean> {
  const response = await fetch(serverAPI + AUTH.LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });
  const json: ApiResponse<string> = await response.json();
  if (!response.ok) {
    errorAlert(json.message);
    return false;
  }
  setAuthCookie(json.data);
  return true;
}

async function getUser(): Promise<{
  user: User;
  menu: Page[];
  acceso: AccesoRes[];
  tableConfig: TableConfigObject | null;
} | null> {
  const token = getAuthCookie();

  const response = await fetch(
    serverAPI + AUTH.ME,
    token
      ? {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
      : undefined
  );
  if (response.status === 401) {
    localStorage.removeItem(localTableConfigName);
    deleteAuthCookie();
    window.location.reload();
    return null;
  }
  if (!response.ok) {
    errorAlert("Error al obtener el usuario");
    return null;
  }
  const json: ApiResponse<User> = await response.json();

  const menuJson = await getMenus();
  if (!menuJson) return null;

  let tableConfig: TableConfigObject | null = null;
  const tableConfigResponse = await fetch(
    serverAPI + ENDPOINTS.CONFIG.GET,
    token
      ?{
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
        credentials: "include",
      }
      : undefined
  );
  if (tableConfigResponse.status === 404) {
    console.log("No se pudo obtener la configuración del usuario.");
  }
  if (tableConfigResponse.ok) {
    const tableConfigJson: ApiResponse<TableConfigObject | null> =
      await tableConfigResponse.json();
    tableConfig = tableConfigJson.data;
  }

  return {
    user: json.data,
    menu: menuJson.data.menus,
    acceso: menuJson.data.accesos,
    tableConfig: tableConfig,
  };
}

async function getMenus() {
  const token = getAuthCookie();
  const menuResponse = await fetch(
    serverAPI + ENDPOINTS.MENU.DASHBOARD,
    token
      ? {
        headers: {
          
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
      : undefined
  );
  if (!menuResponse.ok) {
    errorAlert("Error al obtener el menu");
    return null;
  }
  const menuJson: ApiResponse<{
    menus: Page[];
    accesos: AccesoRes[];
  }> = await menuResponse.json();
  return menuJson;
}

async function logout() {
  try {
    /* const token = getAuthCookie();
    const res = await fetch(authAPI + "auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token ? "Token " + token : "",
      },
    });
    if (res.status === 401) {
      alertError("Sin autorización");
    }zz
    if (res.ok) {
      alertSuccess("Cierre de sesión correcto");
    } */
    localStorage.removeItem(localTableConfigName);
    deleteAuthCookie();
  } catch (e) {
    console.log(e);
  }
}
