import React, { createContext, useContext, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
interface Props {
  windows: Window[];
  setWindows: React.Dispatch<React.SetStateAction<Window[]>>;
  closeAllWindows: () => void;
}
export const HeaderContext = createContext<Props | null>(null);

export const useHeaderContext = () => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error(
      "this contexts must be used whitin a HeaderContextProvider"
    );
  }
  return context;
};
interface Window {
  name: string;
  route: string;
}
export const HeaderContextProvider = ({ children }: any) => {
  const [windows, setWindows] = useState<Window[]>([]);
  const { pathname } = useLocation();
  
  const closeAllWindows = () => {
    const getActualWindow = (windows: Window[]) => windows.filter((window) => pathname === window.route);
    const actualWindow = getActualWindow(windows);
    localStorage.setItem('rutas-guardadas', JSON.stringify(actualWindow));//save only the actual window
    setWindows((old) => getActualWindow(old));
  };


  const routesJson = localStorage.getItem('rutas-guardadas');
  const routes : Window[] = ((routesJson)? JSON.parse(routesJson) : []);
  if (windows.length > routes.length){//update windows
    localStorage.setItem('rutas-guardadas', JSON.stringify(windows));
  }
  else if (windows.length == 0 && routes.length > 0){//In a void array of windows, we load if exist routes and we have saved routes
    const savedRoutes: Window[] = routes;
    setWindows(savedRoutes);   
  } 

  const value = useMemo(
    () => ({
      windows,
      setWindows,
      closeAllWindows
    }),
    [windows, setWindows, closeAllWindows]
  );
  return (
    <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>
  );
};

