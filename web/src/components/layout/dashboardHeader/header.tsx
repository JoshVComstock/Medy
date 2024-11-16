import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import styles from "../dashboard.module.css";
import { useUser } from "../../../context/user";
import { ROUTES } from "../../../types/enums/Routes";
//import { useRequest } from "@/components/hooks/useRequest";
/* import { confirmAlert } from "@/utils/alerts";
import { ENDPOINTS } from "@/types/enums/Endpoints";
import { localTableConfigName } from "@/components/common/table/hooks/useTableConfig";
import { alertError, alertSuccess } from "@/utils/alertsToast"; */
import HeaderPage from "./headerPage";
/* import IconUser from "@assets/icons/iconUser"; */
import { User } from "lucide-react";
const Header = () => {
  const navigate = useNavigate();
  const { logout, user } = useUser();
  //const { sendRequest } = useRequest();

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.INDEX);
  };

  /* const handleSaveConfig = () => {
    confirmAlert(async () => {
      const tableConfig = localStorage.getItem(localTableConfigName);
      if (!tableConfig) return alertError("No se encontró la configuración");
      const json = JSON.parse(tableConfig);
      const res = await sendRequest<null>(ENDPOINTS.CONFIG.POST, json);
      if (res) {
        alertSuccess(res.message);
      }
    }, "¿Guardar mis configuraciones?");
  }; */

  return (
    <header
      className={`${styles.header} w-[calc(100vw_-_80px)] h-20 border-b flex flex-col px-5 dark:bg-gray-800`}
    >
      <div className="flex justify-between w-full flex-1 items-center">
        <div className="flex gap-4"></div>
        <Menu as="div" className="relative inline-block w-[100px] text-left">
          <div>
            <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-500 bg-gray-400 gap-1 rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              <User />
              {user?.login}
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                   
                      <button
                        className={`${
                          active ? "bg-primary-500 text-white" : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        onClick={() => navigate(ROUTES.PROFILE)}
                      >
                        Perfil
                      </button>
                    
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-primary-500 text-white" : "text-gray-900"
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      onClick={handleLogout}
                    >
                      Salir
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <HeaderPage />
    </header>
  );
};

export default Header;
