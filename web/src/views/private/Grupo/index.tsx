import TableContainer from "../../../components/common/table/tableContainer";
import { useGet } from "../../../components/hooks/useGet";
import { createColumns } from "../../../utils/createColumns";
import PageContainer from "../../../components/common/pageContainer";
import { useModal } from "../../../components/common/modal/useModal";
import Modal from "../../../components/common/modal/modal";
import Form from "../../../components/common/form/form";
import { grupoSchema, GrupoForm } from "./validations/grupo";
import { GrupoRes } from "../../../types/res/GrupoRes";
import { ENDPOINTS } from "../../../types/enums/Endpoints";
import Floating from "@/components/common/floating/floating";
import AsignarMenus from "./components/asignarAccesos";
import { MODELOS } from "@/types/enums/Modelos";
import { useAcceso } from "@/components/hooks/useAcceso";

const Grupo = () => {
  const { res, pushData, modifyData, filterData, getData } = useGet<GrupoRes[]>(
    ENDPOINTS.GRUPO.GET
  );
  const { state, item, openModal, closeModal } = useModal<GrupoRes>(
    "Formulario de grupo"
  );

  const {
    state: stateMenus,
    item: itemMenus,
    openModal: openMenus,
    closeModal: closeMenus,
  } = useModal<GrupoRes>("Permisos de menús");
  
  const { canAdd, canDelete, canEdit, canModify, canView } = useAcceso(
    MODELOS.GRUPOS
  );

  const columns = createColumns<GrupoRes>([
    {
      header: "Nombre",
      accessorKey: "nombre",
    },
    {
      header: "Descripcion",
      accessorKey: "descripcion",
    },

    {
      header: "Categoria",
      accessorKey: "idCategoria",
    },

    {
      header: "Usuario modificado",
      accessorKey: "idUsrModificacion",
    },

    {
      header: "Usuario creado",
      accessorKey: "idUsrCreacion",
    },
  ]);

  return (
    <PageContainer title="Grupos">
      <TableContainer
        name="grupos"
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
          {
            label: "Asignar menús",
            fn: (row) => openMenus(row),
          },
        ]}
      />
      <Floating state={stateMenus}>
        <AsignarMenus
          item={itemMenus}
          onSuccess={(data) => {
            modifyData(data, (row) => row.id === data.id);
            closeMenus();
          }}
          close={closeMenus}
        />
      </Floating>
      <Modal state={state}>
        <Form<GrupoRes, GrupoForm>
          item={item}
          initialValues={{
            nombre: item?.nombre || "",
            descripcion: item?.descripcion || "",
            idCategoria: 1,
          }}
          validationSchema={grupoSchema}
          post={{
            route: ENDPOINTS.GRUPO.POST,
            onBody: (value) => value,
            onSuccess: (data) => {
              pushData(data);
              closeModal();
            },
          }}
          put={canEdit({
            route: ENDPOINTS.GRUPO.PUT + item?.id,
            onBody: (value) => value,
            onSuccess: (data) => {
              modifyData(data, (value) => value.id === data.id);
              closeModal();
            },
          })}
          del={canDelete({
            route: ENDPOINTS.GRUPO.DELETE + item?.id,
            onSuccess: (data) => {
              filterData((value) => value.id !== data.id);
              closeModal();
            },
          })}
        >
          <Form.Column>
            <Form.Input name="nombre" title="Nombre" />
            <Form.Input name="descripcion" title="Descripcion" />
          </Form.Column>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default Grupo;
