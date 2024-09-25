import Swal from "sweetalert2";
import { AnyFunction } from "../types/interfaces/AnyFunction";
import { tailwindColors } from "./tailwindConfig";

export const successAlert = (message: string) => {
  Swal.fire({
    icon: "success",
    title: "Éxito",
    text: message,
  });
};

export const errorAlert = (message: string) => {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: message,
  });
}

export const confirmAlert = (onConfirm: AnyFunction, text?: string) => {
  Swal.fire({
    title: "¿Estás seguro?",
    text: text || "Se eliminará este elemento permanentemente.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: tailwindColors.rose["800"],
    cancelButtonColor: tailwindColors.gray["700"],
    confirmButtonText: "Confirmar"
  }).then((result) => {
    if(result.isConfirmed) {
      onConfirm();
    }
  });
}