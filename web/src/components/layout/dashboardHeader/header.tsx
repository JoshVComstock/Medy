import { useNavigate } from "react-router-dom";
import styles from "../dashboard.module.css";
import { useUser } from "../../../context/user";
import IconConfig from "@assets/icons/iconConfig";
import IconLogout from "@assets/icons/iconLogout";
import Button from "../../common/button/button";
import { ROUTES } from "../../../types/enums/Routes";
import IconSave from "@assets/icons/iconSave";
import { useRequest } from "@/components/hooks/useRequest";
import { confirmAlert } from "@/utils/alerts";
import { ENDPOINTS } from "@/types/enums/Endpoints";
import { localTableConfigName } from "@/components/common/table/hooks/useTableConfig";
import { alertError, alertSuccess } from "@/utils/alertsToast";
import HeaderPage from "./headerPage";
import { useLang } from "@/context/lang";

const Header = () => {
  const navigate = useNavigate();
  const { logout } = useUser();
  const { sendRequest } = useRequest();

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.INDEX);
    return;
  };

  const handleSaveConfig = () => {
    confirmAlert(async () => {
      const tableConfig = localStorage.getItem(localTableConfigName);
      if (!tableConfig) return alertError("No se encontró la configuración");
      const json = JSON.parse(tableConfig);
      const res = await sendRequest<null>(ENDPOINTS.CONFIG.POST, json);
      if (res) {
        alertSuccess(res.message);
      }
    }, "¿Guardar mis configuraciones?");
  };

  return (
    <header
      className={
        styles.header +
        " w-[calc(100vw_-_80px)] h-20 border-b flex flex-col px-5 dark:bg-gray-800"
      }
    >
      <div className="flex justify-between w-full flex-1 items-center">
        <div className="flex gap-4">
          <Button
            onClick={() => navigate(ROUTES.PROFILE)}
            btnType="tertiary"
            className="dark:text-white"
            icon={<IconConfig />}
          />
          <Button
            onClick={handleSaveConfig}
            btnType="tertiary"
            className="dark:text-white"
            icon={<IconSave />}
          />
          <Button
            btnType="tertiary"
            onClick={handleLogout}
            className="dark:text-white"
            icon={<IconLogout />}
          />
        </div>
      </div>
      <HeaderPage />
    </header>
  );
};

export default Header;
