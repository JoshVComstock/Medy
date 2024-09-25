import TableContainer from "../../../components/common/table/tableContainer";
import { useGet } from "../../../components/hooks/useGet";
import { createColumns } from "../../../utils/createColumns";
import PageContainer from "../../../components/common/pageContainer";
import { useModal } from "../../../components/common/modal/useModal";
import Modal from "../../../components/common/modal/modal";
import Form from "../../../components/common/form/form";
import {
  TipoComprobanteForm,
  tipoComprobanteSchema,
} from "./validations/tipoComprobante";
import { TipoComprobantesRes } from "../../../types/res/TipoComprobantesRes";
import { ENDPOINTS } from "../../../types/enums/Endpoints";

const TipoComprobantes = () => {
  const { res, pushData, modifyData, filterData, getData } = useGet<
    TipoComprobantesRes[]
  >(ENDPOINTS.TIPOCOMPROBANTES.GET);
  const { state, item, openModal, closeModal } = useModal<TipoComprobantesRes>(
    "Formulario de tipo comprobante"
  );

  const columns = createColumns<TipoComprobantesRes>([
    {
      header: "Nombre",
      accessorKey: "nombre",
    },
    {
      header: "Estado",
      accessorKey: "estado",
    },
  ]);

  return (
    <PageContainer title="Tipo de comprobantes">
      <TableContainer
        name="tipoComprobantes"
        fixKey="id"
        columns={columns}
        data={res?.data}
        add={() => openModal()}
        controls={[
          {
            label: "Modificar",
            fn: (row) => openModal(row),
          },
        ]}
        reload={getData}
      />
      <Modal state={state}>
        <Form<TipoComprobantesRes, TipoComprobanteForm>
          item={item}
          initialValues={{
            nombre: item?.nombre || "",
          }}
          validationSchema={tipoComprobanteSchema}
          post={{
            route: ENDPOINTS.TIPOCOMPROBANTES.POST,
            onBody: (value) => value,
            onSuccess: (data) => {
              pushData(data);
              closeModal();
            },
          }}
          put={{
            route: ENDPOINTS.TIPOCOMPROBANTES.PUT + item?.id,
            onBody: (value) => value,
            onSuccess: (data) => {
              modifyData(data, (value) => value.id === data.id);
              closeModal();
            },
          }}
          del={{
            route: ENDPOINTS.TIPOCOMPROBANTES.DELETE + item?.id,
            onSuccess: (data) => {
              filterData((value) => value.id !== data.id);
              closeModal();
            },
          }}
        >
          <Form.Column>
            <Form.Input name="nombre" title="Nombre" />
          </Form.Column>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default TipoComprobantes;
