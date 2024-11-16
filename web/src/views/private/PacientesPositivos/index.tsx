import TableContainer from "../../../components/common/table/tableContainer";
import { useGet } from "../../../components/hooks/useGet";
import { createColumns } from "../../../utils/createColumns";
import PageContainer from "../../../components/common/pageContainer";
import { ENDPOINTS } from "../../../types/enums/Endpoints";
import { MODELOS } from "@/types/enums/Modelos";
import { useAcceso } from "@/components/hooks/useAcceso";
import { ResultadoRes } from "@/types/res/Resultado";

const PacientesPositivos = () => {
  const { res, getData } = useGet<ResultadoRes[]>(
    ENDPOINTS.RESULTADO.POSITIVO
  );

  const { canView } = useAcceso(MODELOS.PACIENTESPOSITIVOS);

  const columns = createColumns<ResultadoRes>([
    {
      header: "Codigo de barras",
      accessorKey: "codigoBarra",
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
    {
      header: "Paciente ",
      accessorKey: "nombrePaciente",
    },
  ]);
  return (
    <PageContainer title="Pacientes positivos">
      <TableContainer
        name="pacientes positivos"
        fixKey="id"
        columns={columns}
        data={res?.data}
        reports={canView}
        reload={getData}
      />
    </PageContainer>
  );
};

export default PacientesPositivos;
