import { useGet } from "@/components/hooks/useGet";
import { ENDPOINTS } from "@/types/enums/Endpoints";
import { create } from "zustand";

interface State {
  database: string | null;
}

interface Functions {
  setDatabase: (database: string) => void;
}

const environmentContext = create<State & Functions>((set) => ({
  database: null,
  setDatabase(database) {
    set((old) => ({ ...old, database }));
  },
}));

export const useEnvironment = () => {
  const state = environmentContext();
  const { database, setDatabase } = state;
  useGet<{
    db: string;
  }>(ENDPOINTS.COMMON.DATA, {
    send: !database,
    onResponse: (res) => {
      if (res) {
        setDatabase(res.data.db);
      }
    },
  });
  console.log(state.database);
  return {
    ...state,
  };
};
