import TableContainer from "../../../components/common/table/tableContainer";
import { useGet } from "../../../components/hooks/useGet";
import { createColumns } from "../../../utils/createColumns";
import PageContainer from "../../../components/common/pageContainer";
import { useModal } from "../../../components/common/modal/useModal";
import Modal from "../../../components/common/modal/modal";
import Form from "../../../components/common/form/form";
import { ENDPOINTS } from "../../../types/enums/Endpoints";
import { MODELOS } from "@/types/enums/Modelos";
import { useAcceso } from "@/components/hooks/useAcceso";
import {
  tipoMovimientosSchema,
  TipoMovimientoForm,
} from "./validations/tipoMovimiento";
import { TipoMovimientoRes } from "@/types/res/TipoMovimientoRes";

const TipoMovimiento = () => {
  const { res, pushData, modifyData, filterData, getData } = useGet<
    TipoMovimientoRes[]
  >(ENDPOINTS.TIPOMOVIMIENTO.GET);
  const { state, item, openModal, closeModal } = useModal<TipoMovimientoRes>(
    "Formulario de tipo movimiento"
  );
  const { canAdd, canDelete, canEdit, canModify, canView } = useAcceso(
    MODELOS.TIPO_MOVIMIENTO
  );

  const columns = createColumns<TipoMovimientoRes>([
    {
      header: "Nombre",
      accessorKey: "nombre",
    },
  ]);

  return (
    <PageContainer title="Tipo movimiento">
      <TableContainer
        name="tipoMovimiento"
        fixKey="id"
        columns={columns}
        data={res?.data}
        add={canAdd(() => openModal())}
        reports={canView}
        reload={getData}
        controls={[
          {
            label: "Modificar",
            fn: (row) => openModal(row),
            on: canModify,
          },
        ]}
      />
      <Modal state={state}>
        <Form<TipoMovimientoRes, TipoMovimientoForm>
          item={item}
          initialValues={{
            nombre: item?.nombre || "",
          }}
          validationSchema={tipoMovimientosSchema}
          post={{
            route: ENDPOINTS.TIPOMOVIMIENTO.POST,
            onBody: (value) => value,
            onSuccess: (data) => {
              pushData(data);
              closeModal();
            },
          }}
          put={canEdit({
            route: ENDPOINTS.TIPOMOVIMIENTO.PUT + item?.id,
            onBody: (value) => ({
              ...value,
            }),
            onSuccess: (data) => {
              modifyData(data, (value) => value.id === data.id);
              closeModal();
            },
          })}
          del={canDelete({
            route: ENDPOINTS.TIPOMOVIMIENTO.DELETE + item?.id,
            onSuccess: (data) => {
              filterData((value) => value.id !== data.id);
              closeModal();
            },
          })}
        >
          <Form.Column>
            <Form.Input name="nombre" title="Nombre" />
          </Form.Column>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default TipoMovimiento;
