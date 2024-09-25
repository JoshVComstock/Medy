import { HeaderContextProvider } from "@/context/header";
import Dashboard from "../dashboard";
import SocketConnector from "./socketConnector";
import UserLogged from "./userLogged";
import InitialSistem from "./initialSistema";

const DashboardGuards = () => {
  return (
    <UserLogged>
      <SocketConnector>
        <InitialSistem>
          <HeaderContextProvider>
            <Dashboard />
          </HeaderContextProvider>
        </InitialSistem>
      </SocketConnector>
    </UserLogged>
  );
};

export default DashboardGuards;
