import PageContainer from "@/components/common/pageContainer";
import TableContainer from "@/components/common/table/tableContainer";
// import { useAcceso } from "@/components/hooks/useAcceso";
import { useGet } from "@/components/hooks/useGet";
import { ENDPOINTS } from "@/types/enums/Endpoints";
import { ReportBalanceGeneral } from "@/types/res/CuentasRes";
import { createColumns } from "@/utils/createColumns";

const BalanceGeneral = () => {
  const { res, getData } = useGet<ReportBalanceGeneral[]>(
    ENDPOINTS.CUENTAS.REPORTBALANCEGENERAL
  );
  // const { canView } = useAcceso(MODELOS.BALANCE_GENERAL);

  const columns = createColumns<ReportBalanceGeneral>([
    {
      header: "Codigo",
      accessorKey: "codigo",
    },
    {
      header: "Descripcion",
      accessorKey: "descripcion",
    },
    {
      header: "Total",
      accessorFn: (row) => row.sumaHaber - row.sumaDebe,
    },
  ]);
  return (
    <PageContainer title="Balance general">
      <TableContainer
        name="balancegeneral"
        columns={columns}
        data={res?.data}
        reload={getData}
        // reports={canView}
      />
    </PageContainer>
  );
};

export default BalanceGeneral;
