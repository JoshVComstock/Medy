import { useCallback, useEffect, useState } from "react";

export const useLocalState = <T,>(initialState: T, localkey: string) => {
  const getLocalState = useCallback(() => {
    const local = localStorage.getItem(localkey);
    if (local) return JSON.parse(local);
    return initialState;
  }, []);

  const [local, setLocal] = useState<T>(getLocalState());

  useEffect(() => {
    if (local) {
      localStorage.setItem(localkey, JSON.stringify(local));
    } else {
      localStorage.removeItem(localkey);
    }
  }, [local]);

  return [local, setLocal] as const;
};
