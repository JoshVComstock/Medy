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
import { LaboratorioRes } from "@/types/res/LaboratorioRes";
import { laboratorioSchema, LaboratorioForm } from "./validations/laboratorio";
import { ProvinciaRes } from "@/types/res/ProvinciaRes";

const Laboratorio = () => {
  const { res, pushData, modifyData, filterData, getData } = useGet<
    LaboratorioRes[]
  >(ENDPOINTS.LABORATORIO.GET);
  const { state, item, openModal, closeModal } = useModal<LaboratorioRes>(
    "Formulario de laboratorio"
  );
  const { canAdd, canDelete, canEdit, canModify, canView } = useAcceso(
    MODELOS.LABORATORIO
  );

  const columns = createColumns<LaboratorioRes>([
    {
      header: "Provincia",
      accessorKey: "provincia",
    },
    {
      header: "Nombre",
      accessorKey: "nombre",
    },
    {
      header: "Direccion",
      accessorKey: "direccion",
    },
    {
      header: "Telefono",
      accessorKey: "telefono",
    },
  ]);

  return (
    <PageContainer title="Laboratorios">
      <TableContainer
        name="Laboratorio"
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
        <Form<LaboratorioRes, LaboratorioForm>
          item={item}
          initialValues={{
            nombre: item?.nombre || "",
            idProvincia: item?.idProvincia || "",
            direccion: item?.direccion || "",
            telefono: item?.telefono || "",
          }}
          validationSchema={laboratorioSchema}
          post={{
            route: ENDPOINTS.LABORATORIO.POST,
            onBody: (value) => ({
              ...value,
            }),
            onSuccess: (data) => {
              pushData(data);
              closeModal();
            },
          }}
          put={canEdit({
            route: ENDPOINTS.LABORATORIO.PUT + item?.id,
            onBody: (value) => ({
              ...value,
            }),
            onSuccess: (data) => {
              modifyData(data, (value) => value.id === data.id);
              closeModal();
            },
          })}
          del={canDelete({
            route: ENDPOINTS.LABORATORIO.DELETE + item?.id,
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
            <Form.Input name="direccion" title="Direccion" />
            <Form.Input name="telefono" title="Telefono" />
          </Form.Column>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default Laboratorio;
