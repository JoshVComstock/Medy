import { useUser } from "@/context/user";
import { MODELOS } from "@/types/enums/Modelos";

export const useAcceso = (modelo: MODELOS) => {
  const { acceso } = useUser();
  const ac = acceso?.find((a) => a.nombreModelo === modelo);

  const canView = !!ac?.ver;
  const canAdd = <T,>(data?: T) => !!ac?.crear ? data : undefined;
  const canEdit = <T,>(data?: T) => !!ac?.editar ? data : undefined;
  const canDelete = <T,>(data?: T) => !!ac?.eliminar ? data : undefined;
  const canModify = () => !!(ac?.editar || ac?.eliminar);

  return {
    ac,
    canView,
    canAdd,
    canEdit,
    canDelete,
    canModify,
  };
};
