import { Navigate } from "react-router-dom";
import { ROUTES } from "../../../types/enums/Routes";
import Loader from "../../common/loader/loader";
import { useUser } from "../../../context/user";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode
}

const UserLogged = ({ children }: Props) => {
  const { getUser, state } = useUser();

  useEffect(() => {
    if (state === "loading") {
      getUser();
    }
  }, []);

  if (state === "loading")
    return (
      <div className="w-screen h-screen">
        <Loader text="Cargando datos de usuario..." />
      </div>
    );
  if (state === "unlogged") return <Navigate to={ROUTES.INDEX} />;
  return children;
};

export default UserLogged;
