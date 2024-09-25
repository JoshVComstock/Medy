import PageContainer from "../../../components/common/pageContainer";
import TableContainer from "../../../components/common/table/tableContainer";
import Modal from "../../../components/common/modal/modal";
import Form from "../../../components/common/form/form";
import { createColumns } from "../../../utils/createColumns";
import { useGet } from "../../../components/hooks/useGet";
import { useModal } from "../../../components/common/modal/useModal";
import {
  AtributoValorForm,
  atributoValorSchema,
} from "./validations/atributoValor";
import { ENDPOINTS } from "../../../types/enums/Endpoints";
import { useAcceso } from "@/components/hooks/useAcceso";
import { MODELOS } from "@/types/enums/Modelos";
import { AtributoValorRes } from "./interfaces/atributo";
interface Props {
  idAtributo?: number;
  close: () => void;
}
const AtributoValor = ({ idAtributo, close }: Props) => {
  const { res, pushData, modifyData, filterData, getData } = useGet<
    AtributoValorRes[]
  >(ENDPOINTS.ATRIBUTOVALOR.GETBYATRIBUTO + idAtributo);
  const { state, item, openModal, closeModal } = useModal<AtributoValorRes>(
    "Formulario atributo"
  );
  const { canAdd, canDelete, canEdit, canModify, canView } = useAcceso(
    MODELOS.ATRIBUTO_VALOR
  );
  const columns = createColumns<AtributoValorRes>([
    {
      header: "Nombre",
      accessorKey: "nombre",
    },
    {
      header: "Color",
      accessorKey: "color",
    },
    {
      header: "Color HTML",
      accessorKey: "colorHtml",
    },
    {
      header: "Personalizable",
      accessorKey: "personalizable",
    },
  ]);

  return (
    <PageContainer title="Atributo Valor" backRoute={close}>
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
        <Form<AtributoValorRes, AtributoValorForm>
          item={item}
          initialValues={{
            secuencia: 1,
            nombre: item?.nombre || "",
            color: item?.color || 0,
            colorHtml: item?.colorHtml || "",
            personalizable: item?.personalizable || false,
            idAtributo: idAtributo,
          }}
          validationSchema={atributoValorSchema}
          post={{
            route: ENDPOINTS.ATRIBUTOVALOR.POST,
            onBody: (value) => value,
            onSuccess: (data) => {
              pushData(data);
              closeModal();
            },
          }}
          put={canEdit({
            route: ENDPOINTS.ATRIBUTOVALOR.PUT + item?.id,
            onBody: (value) => value,
            onSuccess: (data) => {
              modifyData(data, (value) => value.id === data.id);
              closeModal();
            },
          })}
          del={canDelete({
            route: ENDPOINTS.ATRIBUTOVALOR.DELETE + item?.id,
            onSuccess: (data) => {
              filterData((value) => value.id !== data.id);
              closeModal();
            },
          })}
        >
          <Form.Column>
            <Form.Input name="nombre" title="Nombre" />
            <Form.Input name="color" title="Color" />
            <Form.Input name="colorHtml" title="Color html" />
            <Form.Checkbox name="personalizable" title="Personalizable" />
          </Form.Column>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default AtributoValor;
