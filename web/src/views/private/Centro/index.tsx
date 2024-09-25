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
import { CentroRes } from "@/types/res/CentroRes";
import { centroSchema, CentroForm } from "./validations/centro";
import { MunicipioRes } from "@/types/res/MunicipioRes";

const Centro = () => {
  const { res, pushData, modifyData, filterData, getData } = useGet<
    CentroRes[]
  >(ENDPOINTS.CENTRO.GET);
  const { state, item, openModal, closeModal } = useModal<CentroRes>(
    "Formulario de centro"
  );
  const { canAdd, canDelete, canEdit, canModify, canView } = useAcceso(
    MODELOS.CENTRO
  );

  const columns = createColumns<CentroRes>([
    {
      header: "Municipio",
      accessorKey: "municipio",
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
      header: "Area",
      accessorKey: "area",
    },
    {
      header: "Seguimiento de casos",
      accessorKey: "seguimientoCasos",
    },
    {
      header: "Contacto",
      accessorKey: "contacto",
    },
    {
      header: "Telefono",
      accessorKey: "telefono",
    },
  ]);
  return (
    <PageContainer title="Centros">
      <TableContainer
        name="Centro"
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
        <Form<CentroRes, CentroForm>
          item={item}
          initialValues={{
            nombre: item?.nombre || "",
            idMunicipio: item?.idMunicipio || "",
            area: item?.area || "",
            contacto: item?.contacto || "",
            direccion: item?.direccion || "",
            seguimientoCasos: item?.seguimientoCasos || "",
            telefono: item?.telefono || "",
          }}
          validationSchema={centroSchema}
          post={{
            route: ENDPOINTS.CENTRO.POST,
            onBody: (value) => ({
              ...value,
            }),
            onSuccess: (data) => {
              pushData(data);
              closeModal();
            },
          }}
          put={canEdit({
            route: ENDPOINTS.CENTRO.PUT + item?.id,
            onBody: (value) => ({
              ...value,
            }),
            onSuccess: (data) => {
              modifyData(data, (value) => value.id === data.id);
              closeModal();
            },
          })}
          del={canDelete({
            route: ENDPOINTS.CENTRO.DELETE + item?.id,
            onSuccess: (data) => {
              filterData((value) => value.id !== data.id);
              closeModal();
            },
          })}
          debug
        >
          <Form.Column>
            <Form.Input name="nombre" title="Nombre" />
            <Form.Select<MunicipioRes>
              name="idMunicipio"
              optionTextKey="nombre"
              title="Municipio"
              route={ENDPOINTS.MUNICIPIO.GET}
              optionValueKey="id"
              placeholder="Seleccione una municipio"
            />
            <Form.Input name="direccion" title="Direccion" />
            <Form.Input name="area" title="Area" />
            <Form.Input name="seguimientoCasos" title="Seguimiento de casos" />
            <Form.Input name="contacto" title="Contacto" />
            <Form.Input name="telefono" title="Telefono" />
          </Form.Column>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default Centro;
