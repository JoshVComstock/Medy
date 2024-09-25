import Form from "@/components/common/form/form";
import PageContainer from "@/components/common/pageContainer";
import TableContainer from "@/components/common/table/tableContainer";
import { useGet } from "@/components/hooks/useGet";
import { ENDPOINTS } from "@/types/enums/Endpoints";
import { MetodoPagoRes } from "@/types/res/MetodoPagoRes";
import { createColumns } from "@/utils/createColumns";
import { metodoPagoSchema, MetodoPagoForm } from "./validations/metodoPago";
import { useModal } from "@/components/common/modal/useModal";
import { MODELOS } from "@/types/enums/Modelos";
import { useAcceso } from "@/components/hooks/useAcceso";
import Modal from "@/components/common/modal/modal";

const MetodoPago = () => {
  const { res, pushData, modifyData, filterData, getData } = useGet<
    MetodoPagoRes[]
  >(ENDPOINTS.METODOPAGO.GET);
  const { state, item, openModal, closeModal } = useModal<MetodoPagoRes>(
    "Formulario de metodo pago"
  );
  const { canAdd, canDelete, canEdit, canModify, canView } = useAcceso(
    MODELOS.METODO_PAGO
  );
  const columns = createColumns<MetodoPagoRes>([
    {
      header: "Tipo pago",
      accessorKey: "tipoPago",
    },
  ]);

  return (
    <PageContainer title="Metodo pago">
      <TableContainer
        name="metodoPago"
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
        <Form<MetodoPagoRes, MetodoPagoForm>
          item={item}
          initialValues={{
            tipoPago: item?.tipoPago || "",
          }}
          validationSchema={metodoPagoSchema}
          post={{
            route: ENDPOINTS.METODOPAGO.POST,
            onBody: (value) => ({
              ...value,
            }),
            onSuccess: (data) => {
              pushData(data);
              closeModal();
            },
          }}
          put={canEdit({
            route: ENDPOINTS.METODOPAGO.PUT + item?.id,
            onBody: (value) => ({
              ...value,
            }),
            onSuccess: (data) => {
              modifyData(data, (value) => value.id === data.id);
              closeModal();
            },
          })}
          del={canDelete({
            route: ENDPOINTS.METODOPAGO.DELETE + item?.id,
            onSuccess: (data) => {
              filterData((value) => value.id !== data.id);
              closeModal();
            },
          })}
        >
          <Form.Column>
            <Form.Input name="tipoPago" title="Tipo pago" />
          </Form.Column>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default MetodoPago;
