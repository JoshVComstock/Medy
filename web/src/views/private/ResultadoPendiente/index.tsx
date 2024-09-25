import TableContainer from "../../../components/common/table/tableContainer";
import { useGet } from "../../../components/hooks/useGet";
import { createColumns } from "../../../utils/createColumns";
import PageContainer from "../../../components/common/pageContainer";
import { ENDPOINTS } from "../../../types/enums/Endpoints";
import { MODELOS } from "@/types/enums/Modelos";
import { useAcceso } from "@/components/hooks/useAcceso";
import { ResultadoRes } from "@/types/res/Resultado";

const ResultadosPendientes = () => {
  const { res, getData } = useGet<ResultadoRes[]>(
    ENDPOINTS.RESULTADO.GETPENDIENTE
  );

  const { canView } = useAcceso(MODELOS.RESULTADOSPENDIENTES);

  const columns = createColumns<ResultadoRes>([
    {
      header: "Paciente",
      accessorFn: (row) => row.Cartilla.paciente.nombre,
    },
    {
      header: "Fecha entregado",
      accessorKey: "fechaEntregado",
    },
    {
      header: "Fecha resultado",
      accessorKey: "fechaResultado",
    },
    {
      header: "Resultado ",
      accessorKey: "resultadoPaciente",
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
