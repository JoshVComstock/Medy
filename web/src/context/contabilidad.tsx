import { TipoCambioRes } from "@/types/res/TipoCambioRes";
import { create } from "zustand";
import { useUser } from "./user";
import { MENUS } from "@/types/enums/Menus";
import { LibroDiarioRes } from "@/types/res/LibroDiarioRes";

interface State {
  cambioActual: TipoCambioRes | null;
  cambioActualDiff: number | null;
  libroDiarioActivo: LibroDiarioRes | null;
}

interface Functions {
  setCambioActual: (
    cambioActual: TipoCambioRes | null,
    cambioActualDiff: number | null
  ) => void;
  setLibroDiarioActual: (libroDiarioActivo: LibroDiarioRes | null) => void;
}

const contableContext = create<State & Functions>((set) => ({
  cambioActual: null,
  cambioActualDiff: null,
  libroDiarioActivo: null,
  setCambioActual(cambioActual, cambioActualDiff) {
    set((old) => ({ ...old, cambioActual, cambioActualDiff }));
  },
  setLibroDiarioActual(libroDiarioActivo) {
    set((old) => ({ ...old, libroDiarioActivo }));
  },
}));

export const useContabilidad = () => {
  const { canViewMenu } = useUser();
  const state = contableContext();

  const canUseContabilidad = canViewMenu(MENUS.CONTABILIDAD);

  return {
    ...state,
    canUseContabilidad,
  };
};
