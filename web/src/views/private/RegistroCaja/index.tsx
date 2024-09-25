import PageContainer from "@/components/common/pageContainer";
import TableContainer, {
  DateFilter,
} from "@/components/common/table/tableContainer";
import { useGet } from "@/components/hooks/useGet";
import { useLang } from "@/context/lang";
import { ENDPOINTS } from "@/types/enums/Endpoints";
import { RegistroCajaRes } from "@/types/res/RegistroCaja";
import { createColumns } from "@/utils/createColumns";
import { useEffect, useState } from "react";

const RegistroCaja = () => {
  const { translate } = useLang();

  //? start: search by fate
  const fechaStart = "FECHAINI=";
  const fechaEnd = "&FECHAFIN=";
  const [date, setDate] = useState(
    `${fechaStart}2024-03-14${fechaEnd}2024-03-14&EMPRESA=1`
  );

  const { res, getData } = useGet<RegistroCajaRes[]>(
    ENDPOINTS.REGISTROCAJA.GETALLBYFECHA + date,
    undefined,
    true
  );

  useEffect(() => {
    getData();
    console.log("useefect");
  }, [date]);

  //? end: search by fate

  const columns = createColumns<RegistroCajaRes>([
    {
      header: translate("FORM_TABLE_RIGISTRO_CAJA_COL_PEDIDO"),
      accessorKey: "PEDIDO",
    },
    {
      header: translate("FORM_TABLE_RIGISTRO_CAJA_COL_COMPRADOR"),
      accessorKey: "NOME",
    },
    {
      header: translate("FORM_TABLE_RIGISTRO_CAJA_COL_VENDEDOR"),
      accessorKey: "VENDEDOR",
    },
    {
      header: translate("FORM_TABLE_RIGISTRO_CAJA_COL_TOTAL_PAGO"),
      accessorKey: "TOTAL_PAGO",
    },
    {
      header: translate("FORM_TABLE_RIGISTRO_CAJA_COL_POSICAO"),
      accessorKey: "POSICAO",
    },
    {
      header: translate("FORM_TABLE_RIGISTRO_CAJA_COL_DTFECHAMENTO"),
      accessorKey: "DTFECHAMENTO",
      meta: {
        filterType: "date",
        //? start: search by fate
        filterBackend: (v: DateFilter) => {
          const newFecha = `${fechaStart}${v.from}${fechaEnd}${v.to}&EMPRESA=1`;
          setDate(newFecha);
        },
        //? end: search by fate
      },
    },
  ]);
  
  return (
    <PageContainer title={translate("FORM_RIGISTRO_CAJA_TITLE")}>
      <TableContainer
        name="usuarios"
        fixKey="PEDIDO"
        columns={columns}
        data={res?.data}
        /*    reports={canView} */
        reload={getData}
        controls={[]}
      />
    </PageContainer>
  );
};

export default RegistroCaja;
