import Button from "@/components/common/button/button";
import { useHeaderContext } from "@/context/header";
import IconX from "@assets/icons/iconX";
import { useLocation, useNavigate } from "react-router-dom";

const HeaderPage = () => {
  const { windows, setWindows, closeAllWindows } = useHeaderContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleCloseWindow = (name: string) => {
    const remove = (windows: any[]) => windows.filter((window) => name !== window.name);//remove the window that have the name
    const windowsToStorage = remove(windows);
    localStorage.setItem('rutas-guardadas', JSON.stringify(windowsToStorage));
    setWindows((old) => remove(old));
  };

  return (
    <div className="flex w-full h-6 border-t border-l border-r border-gray-300/20 rounded-[6px_6px_0_0] justify-between">
      <div className="flex overflow-x-auto overflow-y-hidden max-w-[calc(100%_-_23px)]">
        {windows.map((page, _) => (
          <div key={page.name} className="flex items-center min-w-32 w-32 animate-[growFromLeft_.3s] origin-left">
            <Button
              onClick={() => navigate(page.route)}
              size="small"
              borderRadius="6px 6px 0 0"
              width="full"
              btnType={page.route === pathname ? "primary" : "quaternary"}
              icon={pathname !== page.route ? <IconX /> : undefined}
              onClickIcon={() => handleCloseWindow(page.name)}
            >
              {page.name}
            </Button>
          </div>
        ))}
      </div>
      <div className="h-full">
        <Button
          size="smallsquare"
          borderRadius="6px 6px 0 0"
          icon={<IconX />}
          onClick={closeAllWindows}
          title="Cerrar todo (Ctrl + Alt + Q)"
        />
      </div>
    </div>
  );
};

export default HeaderPage;
