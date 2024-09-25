import TableContainer from "../../../components/common/table/tableContainer";
import { useGet } from "../../../components/hooks/useGet";
import { createColumns } from "../../../utils/createColumns";
import PageContainer from "../../../components/common/pageContainer";
import { useModal } from "../../../components/common/modal/useModal";
import Modal from "../../../components/common/modal/modal";
import Form from "../../../components/common/form/form";
import { menuSchema, MenuForm } from "./validation/menu";
import { MenuRes } from "../../../types/res/MenuRes";
import { ENDPOINTS } from "../../../types/enums/Endpoints";
import { ASIDEICONS } from "@/types/enums/AsideIcons";
import { ROUTES } from "@/types/enums/Routes";
import { MODELOS } from "@/types/enums/Modelos";
import { useAcceso } from "@/components/hooks/useAcceso";

const RiMenu = () => {
  const { res, modifyData, filterData, getData } = useGet<MenuRes[]>(
    ENDPOINTS.MENU.GET
  );
  const { state, item, openModal, closeModal } =
    useModal<MenuRes>("Formulario de menu");
  const { canAdd, canDelete, canEdit, canModify, canView } = useAcceso(
    MODELOS.MENUS
  );
  const columns = createColumns<MenuRes>([
    {
      header: "Nombre",
      accessorKey: "nombre",
    },
    {
      header: "Padre",
      accessorKey: "nombrePadre",
    },

    {
      header: "Secuencia",
      accessorKey: "secuencia",
    },

    {
      header: "Ícono",
      accessorKey: "pathIcono",
    },
    {
      header: "Accion",
      accessorKey: "accion",
    },
  ]);

  return (
    <PageContainer title="Menús">
      <TableContainer
        name="menus"
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
        <Form<MenuRes, MenuForm>
          item={item}
          initialValues={{
            nombre: item?.nombre || "",
            idPadre: item?.idPadre || "",
            secuencia: item?.secuencia || "",
            pathIcono: item?.pathIcono || "",
            pathPadre: item?.pathPadre || "",
            accion: item?.accion || "",
          }}
          validationSchema={menuSchema}
          post={{
            route: ENDPOINTS.MENU.POST,
            onBody: (value) => ({
              ...value,
              idPadre: String(value.idPadre),
            }),
            onSuccess: () => {
              getData();
              closeModal();
            },
          }}
          put={canEdit({
            route: ENDPOINTS.MENU.PUT + item?.id,
            onBody: (value) => ({
              ...value,
              idPadre: String(value.idPadre),
            }),
            onSuccess: (data) => {
              modifyData(data, (value) => value.id === data.id);
              closeModal();
            },
          })}
          del={canDelete({
            route: ENDPOINTS.MENU.DELETE + item?.id,
            onSuccess: (data) => {
              filterData((value) => value.id !== data.id);
              closeModal();
            },
          })}
        >
          <Form.Column>
            <Form.Input name="nombre" title="Nombre" />
            <Form.Input name="secuencia" title="Secuencia" />
            <Form.Select<MenuRes>
              name="idPadre"
              title="Padre"
              route={ENDPOINTS.MENU.GET}
              optionValueKey="id"
              optionTextKey="nombre"
              placeholder="Seleccione un padre"
            />
            <Form.Select
              title="Ícono"
              name="pathIcono"
              placeholder="Seleccione un ícono"
              condition={(values) => !values.idPadre}
            >
              {Object.values(ASIDEICONS).map((key) => (
                <Form.Option key={key} value={key}>
                  {key}
                </Form.Option>
              ))}
            </Form.Select>
            <Form.Select
              name="accion"
              title="Accion"
              placeholder="Seleccione una acción"
              condition={(values) => !!values.idPadre}
            >
              {Object.values(ROUTES).map((key) => (
                <Form.Option key={key} value={key}>
                  {key}
                </Form.Option>
              ))}
            </Form.Select>
          </Form.Column>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default RiMenu;
