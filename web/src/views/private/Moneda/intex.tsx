import TableContainer from "../../../components/common/table/tableContainer";
import { useGet } from "../../../components/hooks/useGet";
import { createColumns } from "../../../utils/createColumns";
import PageContainer from "../../../components/common/pageContainer";
import { useModal } from "../../../components/common/modal/useModal";
import Modal from "../../../components/common/modal/modal";
import Form from "../../../components/common/form/form";
import { ENDPOINTS } from "../../../types/enums/Endpoints";
import { MonedaRes } from "@/types/res/MonedaRes";
import { MonedaForm, monedaSchema } from "./validations/moduloMoneda";
import { MODELOS } from "@/types/enums/Modelos";
import { useAcceso } from "@/components/hooks/useAcceso";
import Floating from "@/components/common/floating/floating";
import Efectivo from "../Efectivo";
const Monedas = () => {
  const { res, modifyData, filterData, getData } = useGet<MonedaRes[]>(
    ENDPOINTS.MONEDA.GET
  );
  const { state, item, openModal, closeModal } = useModal<MonedaRes>(
    "Formulario de moneda"
  );
  const { canAdd, canDelete, canEdit, canModify, canView } = useAcceso(
    MODELOS.MONEDA
  );
  const {
    state: valorState,
    item: valorItem,
    openModal: valorOpenModal,
    closeModal: valorCloseModal,
  } = useModal<MonedaRes>("Atributo valor");
  const columns = createColumns<MonedaRes>([
    {
      header: "Código",
      accessorKey: "codigo",
    },
    {
      header: "Símbolo",
      accessorKey: "simbolo",
    },
    {
      header: "Nombre",
      accessorKey: "nombre",
    },
    {
      header: "Decimales",
      accessorKey: "decimales",
    },
    {
      header: "Unidad Monetaria",
      accessorKey: "unidadMonetaria",
    },
    {
      header: "Sub Unidad Monetaria ",
      accessorKey: "subUnidadMonetaria",
    },
    {
      header: "Redondeo",
      accessorKey: "redondeo",
    },
  ]);
  return (
    <PageContainer title="Monedas">
      <TableContainer
        name="monedas"
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
          {
            label: "Efectivo",
            fn: (row) => valorOpenModal(row as MonedaRes),
          },
        ]}
        reload={getData}
      />
      <Floating width="60%" state={valorState}>
        <Efectivo idMoneda={valorItem?.id} close={valorCloseModal} />
      </Floating>
      <Modal state={state}>
        <Form<MonedaRes, MonedaForm>
          item={item}
          initialValues={{
            codigo: item?.codigo || "",
            simbolo: item?.simbolo || "",
            nombre: item?.nombre || "",
            decimales: item?.decimales || 0,
            unidadMonetaria: item?.unidadMonetaria || "",
            subUnidadMonetaria: item?.subUnidadMonetaria || "",
            redondeo: item?.redondeo || 0,
          }}
          validationSchema={monedaSchema}
          post={{
            route: ENDPOINTS.MONEDA.POST,
            onSuccess: () => {
              getData();
              closeModal();
            },
          }}
          put={canEdit({
            route: ENDPOINTS.MONEDA.PUT + item?.id,
            onSuccess: (data) => {
              modifyData(data, (value) => value.id === data.id);
              closeModal();
            },
          })}
          del={canDelete({
            route: ENDPOINTS.MONEDA.DELETE + item?.id,
            onSuccess: (data) => {
              filterData((value) => value.id !== data.id);
              closeModal();
            },
          })}
        >
          <Form.Column>
            <Form.Input name="codigo" title="Código" />
            <Form.Input name="simbolo" title="Símbolo" />
            <Form.Input name="nombre" title="Nombre" />
            <Form.Input name="decimales" title="Decimales" />
            <Form.Input name="unidadMonetaria" title="Unidad Monetaria" />
            <Form.Input
              name="subUnidadMonetaria"
              title="Sub Unidad Monetaria"
            />
            <Form.Input name="redondeo" title="Redondeo" />
          </Form.Column>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default Monedas;
