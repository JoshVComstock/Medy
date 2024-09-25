import { SocketCallbacks } from "@/types/enums/Sockets";
import { socketListen, socketUnlisten } from "@/utils/webSocket";
import { useEffect } from "react";

export const useSocket = (callbacks: Partial<SocketCallbacks>) => {
  /* const { callbacks } = useSocketContext(); */

  useEffect(() => {
    const listener = socketListen(callbacks);
    return () => {
      socketUnlisten(listener);
    };
  }, []);
};
