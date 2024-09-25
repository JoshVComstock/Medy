import PageContainer from "../../../components/common/pageContainer";
import TableContainer from "../../../components/common/table/tableContainer";
import { createColumns } from "../../../utils/createColumns";
import { useGet } from "../../../components/hooks/useGet";
import { useModal } from "../../../components/common/modal/useModal";
import { ENDPOINTS } from "../../../types/enums/Endpoints";
import { MovimientoRes } from "@/types/res/movimientoRes";
import Floating from "@/components/common/floating/floating";
import { MODELOS } from "@/types/enums/Modelos";
import { useAcceso } from "@/components/hooks/useAcceso";
import MovimientoFormulario from "./components/MovimientoForm";
const Movimiento = () => {
  const { res, getData, modifyData, filterData } = useGet<MovimientoRes[]>(
    ENDPOINTS.MOVIMIENTO.GET
  );
  const { state, openModal, closeModal, item } = useModal<MovimientoRes>(
    "Formulario movimiento"
  );
  const { canAdd, canDelete, canEdit, canModify } = useAcceso(
    MODELOS.MOVIMIENTO
  );

  const columns = createColumns<MovimientoRes>([
    {
      header: "Tipo movimiento",
      accessorFn: (row) => row.tipoMovimiento.nombre,
      meta: {
        isRelational: "tipoMovimiento",
      },
    },
    {
      header: "Empresa",
      accessorFn: (row) => row.empresa.nombre,
      meta: {
        isRelational: "empresa",
      },
    },
    {
      header: "Descripcion",
      accessorKey: "descripcion",
    },
    {
      header: "Monto",
      accessorKey: "monto",
    },
  ]);

  return (
    <PageContainer title="Movimiento">
      <TableContainer
        name="movimiento"
        fixKey="id"
        columns={columns}
        data={res?.data}
        add={canAdd(() => openModal())}
        reload={getData}
        controls={[
          {
            label: "Modificar",
            fn: (row) => openModal(row),
            on: canModify,
          },
        ]}
      />
      <Floating width="1200px" state={state}>
        <PageContainer title="Formulario de movimiento" backRoute={closeModal}>
          <MovimientoFormulario
            item={item}
            onSuccessPost={() => {
              getData();
              closeModal();
            }}
            onSuccessPut={(data) => {
              modifyData(data, (value) => value.id === data.id);
              closeModal();
            }}
            onSuccessDelete={(data) => {
              filterData((value) => value.id !== data.id);
              closeModal();
            }}
            canEdit={canEdit}
            canDelete={canDelete}
          />
        </PageContainer>
      </Floating>
    </PageContainer>
  );
};

export default Movimiento;
