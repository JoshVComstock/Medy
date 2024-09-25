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
import { ProvinciaRes } from "@/types/res/ProvinciaRes";
import { provinciaSchema, ProvinciaForm } from "./validations/provincia";
import { CiudadRes } from "@/types/res/CiudadRes";

const Provincia = () => {
  const { res, pushData, modifyData, filterData, getData } = useGet<
    ProvinciaRes[]
  >(ENDPOINTS.PROVINCIA.GET);
  const { state, item, openModal, closeModal } = useModal<ProvinciaRes>(
    "Formulario de provincia"
  );
  const { canAdd, canDelete, canEdit, canModify, canView } = useAcceso(
    MODELOS.PROVINCIA
  );

  const columns = createColumns<ProvinciaRes>([
    {
      header: "Nombre",
      accessorKey: "nombre",
    },
    {
      header: "Ciudad",
      accessorFn: (row) => row.ciudad.nombre,
    },
  ]);

  return (
    <PageContainer title="Provincia">
      <TableContainer
        name="provincia"
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
        <Form<ProvinciaRes, ProvinciaForm>
          item={item}
          initialValues={{
            nombre: item?.nombre || "",
            idCiudad: item?.idCiudad || "",
          }}
          validationSchema={provinciaSchema}
          post={{
            route: ENDPOINTS.PROVINCIA.POST,
            onBody: (value) => ({
              ...value,
            }),
            onSuccess: (data) => {
              pushData(data);
              closeModal();
            },
          }}
          put={canEdit({
            route: ENDPOINTS.PROVINCIA.PUT + item?.id,
            onBody: (value) => ({
              ...value,
            }),
            onSuccess: (data) => {
              modifyData(data, (value) => value.id === data.id);
              closeModal();
            },
          })}
          del={canDelete({
            route: ENDPOINTS.PROVINCIA.DELETE + item?.id,
            onSuccess: (data) => {
              filterData((value) => value.id !== data.id);
              closeModal();
            },
          })}
        >
          <Form.Column>
            <Form.Input name="nombre" title="Nombre" />
            <Form.Select<CiudadRes>
              name="idCiudad"
              optionTextKey="nombre"
              title="Ciudad"
              route={ENDPOINTS.CIUDAD.GET}
              optionValueKey="id"
              placeholder="Seleccione una ciudad"
            />
          </Form.Column>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default Provincia;
