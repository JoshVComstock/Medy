import { SocketResponse } from "../interfaces/SocketResponse";
import { User } from "../interfaces/User";
import { AsientosRes } from "../res/AsientosRes";

export enum Sockets {
  CONNECT = "connect",
  COUNT = "count",
  DISCONNECT = "disconnect",
  MESSAGE = "message",
  USERMODIFY = "userModify",
  USERGROUP = "userGroup",

  ASIENTOLOCAL = "asientoLocal",
  ASIENTOPOST = "asientoPost",
  ASIENTOPUT = "asientoPut",
  ASIENTODELETE = "asientoDelete",
}

export type SocketCallbacks = {
  [Sockets.CONNECT]: (res: SocketResponse<null>) => void;
  [Sockets.COUNT]: (res: SocketResponse<null>) => void;
  [Sockets.DISCONNECT]: (res: SocketResponse<null>) => void;
  [Sockets.MESSAGE]: (res: SocketResponse<null>) => void;
  [Sockets.USERMODIFY]: (res: SocketResponse<User>) => void;
  [Sockets.USERGROUP]: (res: SocketResponse<null>) => void;

  [Sockets.ASIENTOLOCAL]: (res: SocketResponse<null>) => void;
  [Sockets.ASIENTOPOST]: (res: SocketResponse<AsientosRes>) => void;
  [Sockets.ASIENTOPUT]: (res: SocketResponse<AsientosRes>) => void;
  [Sockets.ASIENTODELETE]: (res: SocketResponse<number>) => void;
};
