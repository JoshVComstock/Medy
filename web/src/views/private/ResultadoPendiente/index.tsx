import TableContainer from "../../../components/common/table/tableContainer";
import { useGet } from "../../../components/hooks/useGet";
import { createColumns } from "../../../utils/createColumns";
import PageContainer from "../../../components/common/pageContainer";
import { ENDPOINTS } from "../../../types/enums/Endpoints";
import { MODELOS } from "@/types/enums/Modelos";
import { useAcceso } from "@/components/hooks/useAcceso";
import { CartillaFormRes, CartillaRes } from "@/types/res/CartillaRes";

const ResultadosPendientes = () => {
  const { res, getData } = useGet<CartillaFormRes[]>(
    ENDPOINTS.CARTILLA.RESULTADONULL
  );

  const { canView } = useAcceso(MODELOS.CARTILLA);

  const columns = createColumns<CartillaRes>([
    {
      header: "Codigo de barras",
      accessorKey: "codigoBarras",
    },
    {
      header: "Nombre",
      accessorKey: "nombrePaciente",
    },
    {
      header: "Fecha toma de muestra",
      accessorKey: "fechaTomaMuestras",
    },
    {
      header: "Sexo",
      accessorKey: "sexoPaciente",
    },

    {
      header: "Numero de muestra",
      accessorKey: "numeroMuestra",
    },
  ]);
  return (
    <PageContainer title="Resultados pendientes">
      <TableContainer
        name="resultados pendientes"
        fixKey="id"
        columns={columns}
        data={res?.data}
        reports={canView}
        reload={getData}
      />
    </PageContainer>
  );
};

export default ResultadosPendientes;
