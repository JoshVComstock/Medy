import { serverWS } from "../config";
import { SocketCallbacks } from "../types/enums/Sockets";
import { SocketResponse } from "../types/interfaces/SocketResponse";
import { alertError } from "./alertsToast";
import { getAuthCookie } from "./authCookie";

export let socket: WebSocket;

export const socketConnect = () => {
  return new Promise<boolean>((res) => {
    const authToken = getAuthCookie();
    if (!authToken) {
      alertError("Error al conectar al socket");
      res(false);
    };
    socket = new WebSocket(serverWS + `?token=${authToken}`);
    socket.addEventListener("open", () => {
      console.log("Conexión al socket exitosa");
      res(true);
    });
    socket.addEventListener("close", () => {
      console.log("Conexión al socket cerrada");
    });
  });
};

const handleListen = (
  callbacks: Partial<SocketCallbacks>,
  event: MessageEvent
) => {
  const res = JSON.parse(event.data) as SocketResponse<any>;
  if (res.type in callbacks) {
    const response: SocketResponse<any> = {
      data: res.data ? JSON.parse(res.data) : null,
      message: res.message,
      type: res.type,
    };
    //@ts-ignore
    callbacks[res.type](response);
  }
};

export const socketListen = (callbacks: Partial<SocketCallbacks>) => {
  const listener = (e: MessageEvent) => handleListen(callbacks, e);
  socket.addEventListener("message", listener);
  return listener;
};

export const socketUnlisten = (listener: (e: MessageEvent) => void) => {
  socket.removeEventListener("message", listener);
};

export const socketDisconnect = () => {
  socket.close();
};
