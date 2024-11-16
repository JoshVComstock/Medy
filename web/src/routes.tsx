import { Route, Routes as RRDRoutes } from "react-router-dom";
import Login from "./views/public/Login";
import { ROUTES } from "./types/enums/Routes";
import Error404 from "./views/guard/error404";
import { useUser } from "./context/user";
import Home from "./views/private/Home";
import Profile from "./views/private/Profile";
import IsLogged from "./views/guard/isLogged";
import { routecomponents } from "./data/routeComponents";
import DashboardGuards from "./components/layout/guards";
//import HomeStart from "./views/public/home";
import Layout from "./views/public/layout";
import HomePage from "./views/public/home";

function obtenerAcciones(objeto: any): string[] {
  let acciones = [];
  if ("accion" in objeto) {
    acciones.push(objeto.accion);
  }
  if ("hijos" in objeto && Array.isArray(objeto.hijos)) {
    for (const hijo of objeto.hijos) {
      acciones = acciones.concat(obtenerAcciones(hijo));
    }
  }
  return acciones;
}

const Routes = () => {
  const { menu } = useUser();

  const renderRoutes = () => {
    if (!menu) return [];
    const ableToRender = obtenerAcciones({ hijos: menu });
    return Object.keys(routecomponents).filter((route) => {
      return ableToRender.includes(route);
    });
  };

  return (
    <RRDRoutes>
      <Route path="" element={<Layout />}>
        <Route path={ROUTES.INDEX}  element={<HomePage />} />
      </Route>
      <Route path="/login" element={<IsLogged />}>
        <Route path={ROUTES.LOGIN} element={<Login />} />
      </Route>
      <Route path={ROUTES.DASHBOARD} element={<DashboardGuards />}>
        <Route path={ROUTES.INICIO} element={<Home />} />
        <Route path={ROUTES.PROFILE} element={<Profile />} />
        {renderRoutes().map((routeKey) => (
          <Route
            key={routeKey}
            path={routeKey}
            element={routecomponents[routeKey as ROUTES].component}
          />
        ))}

        <Route
          path={ROUTES.CONTACTO_DETALLE + ":id"}
          element={routecomponents[ROUTES.CONTACTO_DETALLE].component}
        />
        <Route path={ROUTES.DASHBOARD + "/*"} element={<Error404 />} />
      </Route>
    </RRDRoutes>
  );
};

export default Routes;
