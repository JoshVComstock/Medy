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
  TipoTerminalForm,
  tipoTerminalSchema,
} from "./validations/tipoTerminal";
import { TipoTerminalRes } from "@/types/res/TipoTerminalRes";

const TipoTerminal = () => {
  const { res, pushData, modifyData, filterData, getData } = useGet<
    TipoTerminalRes[]
  >(ENDPOINTS.TIPOMOVIMIENTO.GET);
  const { state, item, openModal, closeModal } = useModal<TipoTerminalRes>(
    "Formulario de tipo terminal"
  );
  const { canAdd, canDelete, canEdit, canModify, canView } = useAcceso(
    MODELOS.TIPO_TERMINAL
  );

  const columns = createColumns<TipoTerminalRes>([
    {
      header: "Nombre",
      accessorKey: "nombre",
    },
  ]);

  return (
    <PageContainer title="Tipo terminal">
      <TableContainer
        name="tipoTerminal"
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
        <Form<TipoTerminalRes, TipoTerminalForm>
          item={item}
          initialValues={{
            nombre: item?.nombre || "",
          }}
          validationSchema={tipoTerminalSchema}
          post={{
            route: ENDPOINTS.TIPOTERMINAL.POST,
            onBody: (value) => value,
            onSuccess: (data) => {
              pushData(data);
              closeModal();
            },
          }}
          put={canEdit({
            route: ENDPOINTS.TIPOTERMINAL.PUT + item?.id,
            onBody: (value) => ({
              ...value,
            }),
            onSuccess: (data) => {
              modifyData(data, (value) => value.id === data.id);
              closeModal();
            },
          })}
          del={canDelete({
            route: ENDPOINTS.TIPOTERMINAL.DELETE + item?.id,
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

export default TipoTerminal;
