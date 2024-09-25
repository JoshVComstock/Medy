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
import { MunicipioRes } from "@/types/res/MunicipioRes";
import { municipioSchema, MunicipioForm } from "./validations/municipio";
import { ProvinciaRes } from "@/types/res/ProvinciaRes";

const Municipio = () => {
  const { res, pushData, modifyData, filterData, getData } = useGet<
    MunicipioRes[]
  >(ENDPOINTS.MUNICIPIO.GET);
  const { state, item, openModal, closeModal } = useModal<MunicipioRes>(
    "Formulario de municipio"
  );
  const { canAdd, canDelete, canEdit, canModify, canView } = useAcceso(
    MODELOS.MUNICIPIO
  );

  const columns = createColumns<MunicipioRes>([
    {
      header: "Nombre",
      accessorKey: "nombre",
    },
    {
      header: "Provincia",
      accessorKey: "provincia",
    },
  ]);

  return (
    <PageContainer title="Municipio">
      <TableContainer
        name="Municipio"
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
        <Form<MunicipioRes, MunicipioForm>
          item={item}
          initialValues={{
            nombre: item?.nombre || "",
            idProvincia: item?.idProvincia || "",
          }}
          validationSchema={municipioSchema}
          post={{
            route: ENDPOINTS.MUNICIPIO.POST,
            onBody: (value) => ({
              ...value,
            }),
            onSuccess: (data) => {
              pushData(data);
              closeModal();
            },
          }}
          put={canEdit({
            route: ENDPOINTS.MUNICIPIO.PUT + item?.id,
            onBody: (value) => ({
              ...value,
            }),
            onSuccess: (data) => {
              modifyData(data, (value) => value.id === data.id);
              closeModal();
            },
          })}
          del={canDelete({
            route: ENDPOINTS.MUNICIPIO.DELETE + item?.id,
            onSuccess: (data) => {
              filterData((value) => value.id !== data.id);
              closeModal();
            },
          })}
        >
          <Form.Column>
            <Form.Input name="nombre" title="Nombre" />
            <Form.Select<ProvinciaRes>
              name="idProvincia"
              optionTextKey="nombre"
              title="Provincia"
              route={ENDPOINTS.PROVINCIA.GET}
              optionValueKey="id"
              placeholder="Seleccione una provincia"
            />
          </Form.Column>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default Municipio;
