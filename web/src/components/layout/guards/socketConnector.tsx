import { socketConnect, socketDisconnect } from "@/utils/webSocket";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { ROUTES } from "@/types/enums/Routes";
import { alertError } from "@/utils/alertsToast";
import Loader from "../../common/loader/loader";

type State = "loading" | "rejected" | "connected";

interface Props {
  children: JSX.Element
}

const SocketConnector = ({ children }: Props) => {
  const [state, setState] = useState<State>("loading");

  useEffect(() => {
    const handleConnect = async () => {
      const connected = await socketConnect();
      if (connected) {
        setState("connected");
      } else {
        setState("rejected");
      }
    };
    handleConnect();
    return socketDisconnect;
  }, []);

  if (state === "loading")
    return (
      <div className="w-screen h-screen">
        <Loader text="Conectando al servidor..." />
      </div>
    );
  if (state === "rejected") {
    alertError("Error al conectar al servidor socket");
    return <Navigate to={ROUTES.INDEX} />;
  }
  return children;
};

export default SocketConnector;
