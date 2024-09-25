import TableContainer from "../../../components/common/table/tableContainer";
import { useGet } from "../../../components/hooks/useGet";
import { createColumns } from "../../../utils/createColumns";
import PageContainer from "../../../components/common/pageContainer";
import { ENDPOINTS } from "../../../types/enums/Endpoints";
import { MODELOS } from "@/types/enums/Modelos";
import { useAcceso } from "@/components/hooks/useAcceso";
import { PacienteRes } from "@/types/res/PacienteRes";

const PacientesTodos = () => {
  const { res, getData } = useGet<PacienteRes[]>(
    ENDPOINTS.PACIENTE.GET
  );

  const { canView } = useAcceso(MODELOS.PACIENTESTODOS);

  const columns = createColumns<PacienteRes>([
    {
      header: "Paciente",
      accessorKey: "nombrePaciente",
    },
    {
      header: "Madre ",
      accessorKey: "madre",
    },
    {
      header: "Sexo",
      accessorKey: "sexoPaciente",
    },
    {
      header: "Fecha nacimiento",
      accessorKey: "fechaNacimientoPaciente",
    },
    {
      header: "Peso nacimiento ",
      accessorKey: "pesoNacimientoPaciente",
    },
  ]);
  return (
    <PageContainer title="Todos los pacientes">
      <TableContainer
        name="todo pacientes"
        fixKey="id"
        columns={columns}
        data={res?.data}
        reports={canView}
        reload={getData}
      />
    </PageContainer>
  );
};

export default PacientesTodos;
