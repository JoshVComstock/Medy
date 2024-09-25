import PageContainer from "@/components/common/pageContainer";
import TableContainer from "@/components/common/table/tableContainer";
import { getTotals } from "@/components/common/table/utils/footers/getTotals";
import { useRequest } from "@/components/hooks/useRequest";
import { useLang } from "@/context/lang";
import {
  ExternalVentaCabecera,
  ExternalVentaRes,
} from "@/types/res/ExternalVentaRes";
import { createColumns } from "@/utils/createColumns";
import { useEffect, useState } from "react";

const LibroVentas = () => {
  const { translate } = useLang();
  const [res, setRes] = useState<ExternalVentaRes | null>(null);
  const { sendExternal } = useRequest();

  useEffect(() => {
    const getData = async () => {
      const res = await sendExternal<ExternalVentaRes>(
        `vfecha/FECHAINI=2024-02-07&FECHAFIN=2024-02-07&EMPRESA=1`,
        null,
        {
          baseUrl: "http://lks.dyndns.info:8002/",
          method: "GET",
        }
      );
      if (res) {
        setRes(res);
      }
    };
    getData();
  }, []);

  const columns = createColumns<ExternalVentaCabecera>([
    {
      header: translate("TABLE_LIBRO_VENTAS_COL_CODIGO_DE_CONTROL"),
      accessorKey: "PEDIDO",
    },
    {
      header: translate("TABLE_LIBRO_VENTAS_COL_ESPECIFICACION"),
    },
    {
      header: translate("TABLE_LIBRO_VENTAS_COL_FECHA_DE_FACTURA"),
      accessorFn: (row) => row.FECHA_FACTURA || "NO",
    },
    {
      header: translate("TABLE_LIBRO_VENTAS_COL_NUMERO_DE_FACTURA"),
      accessorFn: (row) => row.NRO_FACTURA || "S/N",
    },
    {
      header: translate("TABLE_LIBRO_VENTAS_COL_CODIGO_DE_AUTORIZACION"),
    },
    {
      header: translate("TABLE_LIBRO_VENTAS_COL_NIT_CI_CLIENTE"),
      accessorFn: (row) => row.RG_INSC?.trim() || "N/A",
    },
    {
      header: translate("TABLE_LIBRO_VENTAS_COL_COMPLEMENTO"),
    },
    {
      header: translate("TABLE_LIBRO_VENTAS_COL_NOMBRE_RAZON_SOCIAL"),
      accessorKey: "NOME",
    },
    {
      header: translate("TABLE_LIBRO_VENTAS_COL_IMPORTE_TOTAL"),
      accessorKey: "TOTAL_PAGO",
    },
    {
      header: translate("TABLE_LIBRO_VENTAS_COL_IMPORTE_ICE"),
    },
    {
      header: translate("TABLE_LIBRO_VENTAS_COL_IMPORTE_IEHD"),
    },
    {
      header: translate("TABLE_LIBRO_VENTAS_COL_IMPORTE_IPJ"),
    },
    {
      header: translate("TABLE_LIBRO_VENTAS_COL_TASAS"),
    },
    {
      header: translate("TABLE_LIBRO_VENTAS_COL_OTROS_NO_SUJETOS_IVA"),
    },
    {
      header: translate(
        "TABLE_LIBRO_VENTAS_COL_EXPORTACIONES_Y_OPERACIONES_EXENTAS"
      ),
    },
    {
      header: translate("TABLE_LIBRO_VENTAS_COL_VENTAS_GRABADAS_TASA_CERO"),
    },
    {
      header: translate("TABLE_LIBRO_VENTAS_COL_SUBTOTAL"),
      accessorKey: "TOTAL_PEDIDO",
      footer: getTotals,
    },
    {
      header: translate(
        "TABLE_LIBRO_VENTAS_COL_DESCUENTOS_BONIFICACIONES_Y_REBAJAS_OBTENIDAS"
      ),
      accessorFn: () => "N/A",
    },
    {
      header: translate("TABLE_LIBRO_VENTAS_COL_IMPORTES_GIFT"),
    },
    {
      header: translate("TABLE_LIBRO_VENTAS_COL_IMPORTE_BASE_CREDITO_FISCAL"),
    },
    {
      header: translate("TABLE_LIBRO_VENTAS_COL_DEBITO_FISCAL"),
    },
    {
      header: translate("TABLE_LIBRO_VENTAS_COL_ESTADO"),
    },
  ]);

  return (
    <PageContainer title={translate("MODELOS_LIBRO_VENTAS")}>
      <TableContainer
        name="libroVentas"
        fixKey="PEDIDO"
        columns={columns}
        data={res?.cabecera}
      />
    </PageContainer>
  );
};

export default LibroVentas;
