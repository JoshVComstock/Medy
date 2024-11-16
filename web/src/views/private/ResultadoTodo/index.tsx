import TableContainer from "../../../components/common/table/tableContainer";
import { useGet } from "../../../components/hooks/useGet";
import { createColumns } from "../../../utils/createColumns";
import PageContainer from "../../../components/common/pageContainer";
import { ENDPOINTS } from "../../../types/enums/Endpoints";
import { MODELOS } from "@/types/enums/Modelos";
import { useAcceso } from "@/components/hooks/useAcceso";
import { ResultadoRes } from "@/types/res/Resultado";

const ResultadoTodo = () => {
  const { res, getData } = useGet<ResultadoRes[]>(ENDPOINTS.RESULTADO.GETALL);

  const { canView } = useAcceso(MODELOS.RESULTADOSTODO);

  const columns = createColumns<ResultadoRes>([
    {
      header: "Paciente",
      accessorKey: "nombrePaciente",
      
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
    <PageContainer title="Todos los resultados">
      <TableContainer
        name="todos los resultados"
        fixKey="id"
        columns={columns}
        data={res?.data}
        reports={canView}
        reload={getData}
      />
    </PageContainer>
  );
};

export default ResultadoTodo;
