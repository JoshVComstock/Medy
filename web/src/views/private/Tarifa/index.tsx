import PageContainer from "../../../components/common/pageContainer";
import TableContainer from "../../../components/common/table/tableContainer";
import { createColumns } from "../../../utils/createColumns";
import { useGet } from "../../../components/hooks/useGet";
import { useModal } from "../../../components/common/modal/useModal";
import { ENDPOINTS } from "../../../types/enums/Endpoints";
import { TarifaRes } from "@/types/res/TarifaRes";
import Floating from "@/components/common/floating/floating";
import TarifaFormulario from "./components/TarifaForm";
import { MODELOS } from "@/types/enums/Modelos";
import { useAcceso } from "@/components/hooks/useAcceso";
const Tarifa = () => {
  const { res, getData, modifyData, filterData } = useGet<TarifaRes[]>(
    ENDPOINTS.TARIFA.GET
  );
  const { state, openModal, closeModal,item } =
    useModal<TarifaRes>("Formulario tarifa");
  const { canAdd, canDelete, canEdit, canModify } = useAcceso(
    MODELOS.TARIFA
  );

  const columns = createColumns<TarifaRes>([
    {
      header: "Nombre",
      accessorKey: "nombre",
    },
    {
      header: "Moneda",
      accessorFn: (row) => row.moneda.nombre,
      meta: {
        isRelational: "moneda",
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
      header: "Policita de descuento",
      accessorKey: "politicaDescuento",
    },
  ]);

  return (
    <PageContainer title="Tarifa">
      <TableContainer
        name="tarifa"
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
        <PageContainer title="Formulario de tarifa" backRoute={closeModal}>
          <TarifaFormulario
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

export default Tarifa;
