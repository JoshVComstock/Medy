import { useUser } from "@/context/user"
import { ROUTES } from "@/types/enums/Routes";
import { Navigate, Outlet } from "react-router-dom";

const IsLogged = () => {
  const { state } = useUser();
  if(state === "loading" || state === "logged") return <Navigate to={ROUTES.INICIO} />
  return <Outlet />;
}

export default IsLogged