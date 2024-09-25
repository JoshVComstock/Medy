import TableContainer from "../../../components/common/table/tableContainer";
import { useGet } from "../../../components/hooks/useGet";
import { CuentaSaldoRes } from "../../../types/res/CuentaSaldo";
import { createColumns } from "../../../utils/createColumns";
import PageContainer from "../../../components/common/pageContainer";
import { ENDPOINTS } from "../../../types/enums/Endpoints";
import { MODELOS } from "@/types/enums/Modelos";
import { useAcceso } from "@/components/hooks/useAcceso";
import { useLang } from "@/context/lang";
import { formatDate } from "@/utils/date";
import { useRequest } from "@/components/hooks/useRequest";
import IconMoney from "@assets/icons/iconMoney";
const SumasSaldos = () => {
  const { translate } = useLang();
  const { res, getData } = useGet<CuentaSaldoRes[]>(ENDPOINTS.CUENTAS.ACCOUNT);
  const { canView } = useAcceso(MODELOS.SUMAS_SALDOS);
  const { sendRequest } = useRequest();
  const columns = createColumns<CuentaSaldoRes>([
    {
      header: translate("TABLE_CUENTAS_COL_CODIGO"),
      accessorKey: "codigo",
    },
    {
      header: translate("TABLE_CUENTAS_COL_DESCRIPCION"),
      accessorKey: "descripcion",
    },
    {
      header: "Suma deudora",
      accessorKey: "sumaDeudora",
    },
    {
      header: "Suma acredora",
      accessorKey: "sumaAcredora",
    },
    {
      header: "Saldo deudora",
      accessorKey: "saldoDeudora",
    },
    {
      header: "Saldo acredora",
      accessorKey: "saldoAcredora",
    },
  ]);

  const getSumasYSaldos = async () => {
    await sendRequest(ENDPOINTS.DETALLEASIENTOS.SUMASYSALDOS, null, {
      method: "GET",
      blobFilename: `Cuentas_y_Saldos_${formatDate(
        new Date().toUTCString()
      )}.xlsx`,
    });
  };

  return (
    <PageContainer title={"Sumas y saldos"}>
      <TableContainer
        name="sumasYSaldos"
        columns={columns}
        data={res?.data}
        reports={canView}
        reload={getData}
        buttons={[
          {
            icon: <IconMoney />,
            fn: getSumasYSaldos,
            title: "Exportar Excel con formato",
          },
        ]}
      />
    </PageContainer>
  );
};

export default SumasSaldos;
