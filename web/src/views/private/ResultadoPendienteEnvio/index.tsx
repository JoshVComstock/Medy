import TableContainer from "../../../components/common/table/tableContainer";
import { useGet } from "../../../components/hooks/useGet";
import { createColumns } from "../../../utils/createColumns";
import PageContainer from "../../../components/common/pageContainer";
import { ENDPOINTS } from "../../../types/enums/Endpoints";
import { MODELOS } from "@/types/enums/Modelos";
import { useAcceso } from "@/components/hooks/useAcceso";
import { ResultadoRes } from "@/types/res/Resultado";
import Checkbox from "@/components/common/inputs/checkbox";
import { useState } from "react";

const ResultadoPendienteEnvio = () => {
  const { res, getData } = useGet<ResultadoRes[]>(
    ENDPOINTS.RESULTADO.PENDIENTEENVIO
  );
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [confi, setConfi] = useState(false);
  console.log(confi);
  const handleSelectRow = (id: number, isSelected: boolean) => {
    setSelectedIds((prev) =>
      isSelected
        ? [...prev, id]
        : prev.filter((selectedId) => selectedId !== id)
    );
    if (isSelected) setConfi(true);
  };
  const { canView } = useAcceso(MODELOS.RESULTADOSTODO);

  const columns = createColumns<ResultadoRes>([
    {
      header: "Enviar resultado",
      cell: ({ row }) => (
        <Checkbox
          onChange={(e) => {
            handleSelectRow(row.original.id, e.target.checked);
          }}
          value={selectedIds.includes(row.original.id)}
          title={"Sin enviar"}
        />
      ),
    },
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
    <PageContainer title="Resultados pendientes envio">
      <TableContainer
        name="resultados pendientes envio"
        fixKey="id"
        columns={columns}
        data={res?.data}
        reports={canView}
        reload={getData}
      />
    </PageContainer>
  );
};

export default ResultadoPendienteEnvio;
