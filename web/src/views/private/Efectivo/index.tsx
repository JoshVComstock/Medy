import PageContainer from "../../../components/common/pageContainer";
import TableContainer from "../../../components/common/table/tableContainer";
import Modal from "../../../components/common/modal/modal";
import Form from "../../../components/common/form/form";
import { createColumns } from "../../../utils/createColumns";
import { useGet } from "../../../components/hooks/useGet";
import { useModal } from "../../../components/common/modal/useModal";

import {
  efectivoForm,
  efectivoSchema,
} from "./validations/efectivo";

import { ENDPOINTS } from "../../../types/enums/Endpoints";
import { useAcceso } from "@/components/hooks/useAcceso";
import { MODELOS } from "@/types/enums/Modelos";
import efectivoRes from "./interfaces/efectivoRes";

interface Props {
  idMoneda?: number;
  close: () => void;
}
const Efectivo = ({ idMoneda, close }: Props) => {

  const { res, pushData, modifyData, filterData, getData } = useGet<
    efectivoRes[]
  >(ENDPOINTS.EFECTIVO.GETBYMONEDA + idMoneda);
  const { state, item, openModal, closeModal } = useModal<efectivoRes>(
    "Formulario efectivo"
  );
  const { canAdd, canDelete, canEdit, canModify, canView } = useAcceso(
    MODELOS.EFECTIVO
  );
  const columns = createColumns<efectivoRes>([
    {
      header: "Descripción",
      accessorKey: "descripcion"
    },
    {
      header: "Moneda",
      accessorFn: (row) => row.moneda.nombre,
      meta: {
        isRelational: "moneda",
      },
    },
    {
      header: "Valor",
      accessorKey: "valor"
    }
  ]);

  return (
    <PageContainer title="Efectivo" backRoute={close}>
      <TableContainer
        name="atributo valor"
        fixKey="id"
        columns={columns}
        data={res?.data}
        add={canAdd(() => openModal())}
        reports={canView}
        controls={[
          {
            label: "Modificar",
            fn: (row) => openModal(row),
            on: canModify,
          },
        ]}
        reload={getData}
      />
      <Modal state={state}>
        <Form<efectivoRes, efectivoForm>
          item={item}
          initialValues={{
            descripcion: item?.descripcion || "",
            valor : item?.valor || 0,
            idMoneda: idMoneda
          }}
          validationSchema={efectivoSchema}
          post={{
            route: ENDPOINTS.EFECTIVO.POST,
            onBody: (value) => value,
            onSuccess: (data) => {
              pushData(data);
              closeModal();
            },
          }}
          put={canEdit({
            route: ENDPOINTS.EFECTIVO.PUT + item?.id,
            onBody: (value) => value,
            onSuccess: (data) => {
              modifyData(data, (value) => value.id === data.id);
              closeModal();
            },
          })}
          del={canDelete({
            route: ENDPOINTS.EFECTIVO.DELETE + item?.id,
            onSuccess: (data) => {
              filterData((value) => value.id !== data.id);
              closeModal();
            },
          })}
        >
          <Form.Column>
            <Form.Input name="descripcion" title="Descripción" />
            <Form.Input name="valor" title="Valor" />
          </Form.Column>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default Efectivo;
