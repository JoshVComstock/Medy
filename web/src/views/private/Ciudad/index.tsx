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
import { CiudadRes } from "@/types/res/CiudadRes";
import { CiudadForm, ciudadSchema } from "./validations/ciudad";

const Ciudad = () => {
  const { res, pushData, modifyData, filterData, getData } = useGet<
    CiudadRes[]
  >(ENDPOINTS.CIUDAD.GET);
  const { state, item, openModal, closeModal } = useModal<CiudadRes>(
    "Formulario de banco"
  );
  const { canAdd, canDelete, canEdit, canModify, canView } = useAcceso(
    MODELOS.CIUDAD
  );

  const columns = createColumns<CiudadRes>([
    {
      header: "Nombre",
      accessorKey: "nombre",
    },
  ]);

  return (
    <PageContainer title="Ciudad">
      <TableContainer
        name="banco"
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
        <Form<CiudadRes, CiudadForm>
          item={item}
          initialValues={{
            nombre: item?.nombre || "",
          }}
          validationSchema={ciudadSchema}
          post={{
            route: ENDPOINTS.CIUDAD.POST,
            onBody: (value) => ({
              ...value,
            }),
            onSuccess: (data) => {
              pushData(data);
              closeModal();
            },
          }}
          put={canEdit({
            route: ENDPOINTS.CIUDAD.PUT + item?.id,
            onBody: (value) => ({
              ...value,
            }),
            onSuccess: (data) => {
              modifyData(data, (value) => value.id === data.id);
              closeModal();
            },
          })}
          del={canDelete({
            route: ENDPOINTS.CIUDAD.DELETE + item?.id,
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

export default Ciudad;
