import PageContainer from "../../../components/common/pageContainer";
import TableContainer from "../../../components/common/table/tableContainer";
import Modal from "../../../components/common/modal/modal";
import Form from "../../../components/common/form/form";
import { createColumns } from "../../../utils/createColumns";
import { UsuarioRes } from "../../../types/res/UsuarioRes";
import { useGet } from "../../../components/hooks/useGet";
import { useModal } from "../../../components/common/modal/useModal";
import { UsuarioForm, usuarioSchema } from "./validations/usuarios";
import { ENDPOINTS } from "../../../types/enums/Endpoints";
import { GrupoRes } from "@/types/res/GrupoRes";
import Floating from "@/components/common/floating/floating";
import { ContactoRes } from "@/types/res/ContactoRes";
import { MODELOS } from "@/types/enums/Modelos";
import { useAcceso } from "@/components/hooks/useAcceso";

const Usuario = () => {
  const { res, pushData, modifyData, filterData, getData } = useGet<
    UsuarioRes[]
  >(ENDPOINTS.USUARIO.GET);
  const { state, item, openModal, closeModal } =
    useModal<UsuarioRes>("Formulario usuario");
  const {
    state: stateGrupos,
    item: itemGrupos,
    openModal: openGrupos,
    closeModal: closeGrupos,
  } = useModal<UsuarioRes>("Permisos de grupos");
  const { canAdd, canDelete, canEdit, canModify, canView } = useAcceso(
    MODELOS.USUARIOS
  );

  const columns = createColumns<UsuarioRes>([
    {
      header: "Nombre",
      accessorKey: "login",
    },
    {
      header: "Telefono",
      accessorKey: "telefono",
    },
    {
      header: "Firma",
      accessorKey: "firma",
    },
    {
      header: "Estado bot",
      accessorKey: "estadoBot",
    },
    {
      header: "Codigo bot",
      accessorKey: "codigoBot",
    },
    {
      header: "Activo",
      accessorKey: "activo",
    },
  ]);

  return (
    <PageContainer title="Usuarios">
      <TableContainer
        name="usuarios"
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
            label: "Asignar grupos",
            fn: (row) => openGrupos(row),
          },
        ]}
      />
      <Floating state={stateGrupos} width="30%">
        <PageContainer title="Asignar grupos" backRoute={closeGrupos}>
          <Form
            debug
            item={itemGrupos}
            initialValues={{
              grupos: itemGrupos?.grupos.map((grupo) => grupo.id) || [],
            }}
            put={{
              route: ENDPOINTS.USUARIO.GRUPOS + itemGrupos?.id,
              onBody: (value) => ({
                idsGrupo: value.grupos,
              }),
              onSuccess: (data) => {
                modifyData(data, (value) => value.id === data.id);
                closeGrupos();
              },
            }}
          >
            <Form.Select<GrupoRes>
              route={ENDPOINTS.GRUPO.GET}
              optionTextKey="nombre"
              optionValueKey="id"
              placeholder="Seleccione grupos"
              name="grupos"
              title="Grupos"
              alwaysShow
            />
          </Form>
        </PageContainer>
      </Floating>
      <Modal state={state}>
        <Form<UsuarioRes, UsuarioForm>
          item={item}
          initialValues={{
            idTipoUsuario: 1,
            idEmpresa: 1,
            idContacto: item?.idContacto,
            idAccion: 1,
            telefono: item?.telefono || "",
            login: item?.login || "",
            password: item?.password || "",
            codigoSecreto: item?.codigoSecreto || "",
            firma: item?.firma || "",
            notificacion: item?.notificacion || "",
            estadoBot: item?.estadoBot || "",
            codigoBot: item?.codigoBot || "",
            activo: item?.activo || false
          }}
          validationSchema={usuarioSchema}
          post={{
            route: ENDPOINTS.USUARIO.POST,
            onBody: (value) => value,
            onSuccess: (data) => {
              pushData(data);
              closeModal();
            },
          }}
          put={canEdit({
            route: ENDPOINTS.USUARIO.PUT + item?.id,
            onBody: (value) => value,
            onSuccess: (data) => {
              modifyData(data, (value) => value.id === data.id);
              closeModal();
            },
          })}
          del={canDelete({
            route: ENDPOINTS.USUARIO.DELETE + item?.id,
            onSuccess: (data) => {
              filterData((value) => value.id !== data.id);
              closeModal();
            },
          })}
          debug
        >
          <Form.Column>
            <Form.Input name="login" title="Usuario" />
            <Form.Input name="password" title="Password" />
          </Form.Column>
          <Form.Column>
            <Form.Select<ContactoRes>
              route={ENDPOINTS.CONTACTO.GET}
              optionTextKey="nombre"
              optionValueKey="id"
              placeholder="Seleccione contacto"
              name="idContacto"
              title="Contacto"
            />
            <Form.Input name="telefono" title="Telefono" />
            <Form.Input name="codigoSecreto" title="Codigo secreto" />
            <Form.Checkbox name="activo" title="Estado" />
          </Form.Column>
          <Form.Column>
            <Form.Input name="firma" title="Firma" />
            <Form.Input name="notificacion" title="Notificacion" />
            <Form.Input name="estadoBot" title="Estado bot" />
            <Form.Input name="codigoBot" title="Codigo Bot" />
          </Form.Column>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default Usuario;
