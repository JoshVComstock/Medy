import { Sockets } from "../enums/Sockets";

export interface SocketResponse<T> {
  type: Sockets;
  message: string;
  data: T;
}
