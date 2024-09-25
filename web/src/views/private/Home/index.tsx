import PageContainer from "@/components/common/pageContainer";
import { useUser } from "../../../context/user";
import { useContabilidad } from "@/context/contabilidad";
import DataCard from "./components/dataCard";
import IconContact from "@assets/icons/iconContact";
import { MENUS } from "@/types/enums/Menus";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/types/enums/Routes";
import StringCard from "./components/stringCard";
import IconX from "@assets/icons/iconX";

const Home = () => {
  const { user, canViewMenu } = useUser();
  const {
    cambioActual,
    cambioActualDiff,
    canUseContabilidad,
    libroDiarioActivo,
  } = useContabilidad();
  const navigate = useNavigate();

  return (
    <PageContainer title="Inicio">
      <div className="flex flex-col gap-6">
        <p className="text-base dark:text-white">
          ¡Bienvenido <span className="text-primary-700 dark:text-sky-400">{user?.login}</span>!
        </p>
        <div className="flex gap-8">
          {canUseContabilidad && (
            <>
              <StringCard
                data={libroDiarioActivo ? libroDiarioActivo.nombre : "N/A"}
                description="Se muestran las cuentas de este libro"
                icon={<IconX />}
                title="Libro diario actual"
                onClick={
                  canViewMenu(MENUS.LIBRO_DIARIO)
                    ? () => navigate(ROUTES.CONTABILIDAD_LIBRO_DIARIO)
                    : undefined
                }
              />
              <DataCard
                title="1 BOB a US$"
                data={
                  cambioActual ? cambioActual.dolar.toFixed(3) + " US$" : "N/A"
                }
                icon={<IconContact />}
                incrementPercentage={cambioActualDiff}
                since="ayer"
                onClick={
                  canViewMenu(MENUS.TIPO_DE_CAMBIO)
                    ? () => navigate(ROUTES.CONTABILIDAD_TIPO_CAMBIO)
                    : undefined
                }
              />
            </>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default Home;
