// import { useAcceso } from "@/components/hooks/useAcceso";
import { useGet } from "@/components/hooks/useGet";
import { createColumns } from "@/utils/createColumns";
import {
  ReportFlujoEfectivo,
  SumDetalleAsientosByAsientos,
} from "@/types/res/AsientosRes";
import { ENDPOINTS } from "@/types/enums/Endpoints";
import { useLang } from "@/context/lang";
import PageContainer from "@/components/common/pageContainer";
import TableContainer from "@/components/common/table/tableContainer";

const FlujoEfectivo = () => {
  const { translate } = useLang();
  const { res, getData } = useGet<ReportFlujoEfectivo>(
    ENDPOINTS.DETALLEASIENTOS.REPORTFLUJOEFECTIVO
  );
  // const { canView } = useAcceso(MODELOS.FLUJO_EFECTIVO);

  const columns = createColumns<SumDetalleAsientosByAsientos>([
    {
      header: translate("TABLE_ASIENTOS_COL_TIPO_COMPROBANTE"),
      accessorKey: "tipoComprobante",
    },
    {
      // translate("TABLE_ASIENTOS_COL_CONCEPTO")
      header: "Concepto asiento",
      accessorKey: "concepto",
    },
    {
      header: translate("TABLE_ASIENTOS_COL_FECHA_CREACION"),
      accessorKey: "fecha",
      meta: {
        filterType: "date",
      },
    },
    {
      header: "Total detalles",
      accessorKey: "totalHaber",
    },
  ]);
  return (
    <PageContainer title="Flujo de efectivo">
      {res?.data.totalEgreso && res.data.totalIngreso && (
        <>
          <p>{`Total ingresos: ${res?.data.totalIngreso}`}</p>
          <p>{`Total egresos: ${res?.data.totalEgreso}`}</p>
          <p>{`Resultado operaciones: ${
            res?.data.totalIngreso - res?.data.totalEgreso
          }`}</p>
        </>
      )}
      <TableContainer
        name="flujoefectivo"
        columns={columns}
        data={res?.data.asientos}
        reload={getData}
        // reports={canView}
      />
    </PageContainer>
  );
};

export default FlujoEfectivo;
