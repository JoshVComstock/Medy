import { toast as alerta } from "react-toastify";
import { toast } from "react-hot-toast";
export const alertSuccess = (message: string) => {
  toast.success(message);
};
export const alertError = (message: string) => {
  toast.error(message);
};
export const alertWarning = (message: string) => {
  alerta.warning(message);
};
