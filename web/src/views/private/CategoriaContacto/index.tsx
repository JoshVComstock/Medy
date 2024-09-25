import PageContainer from "../../../components/common/pageContainer";
import TableContainer from "../../../components/common/table/tableContainer";
import Modal from "../../../components/common/modal/modal";
import Form from "../../../components/common/form/form";
import { createColumns } from "../../../utils/createColumns";
import { CategoriaContactoRes } from "../../../types/res/CategoriaContactoRes";
import { useGet } from "../../../components/hooks/useGet";
import { useModal } from "../../../components/common/modal/useModal";
import {
  CategoriaContactoForm,
  categoriaContactoSchema,
} from "./validations/categoriaContacto";
import { ENDPOINTS } from "../../../types/enums/Endpoints";
import { MODELOS } from "@/types/enums/Modelos";
import { useAcceso } from "@/components/hooks/useAcceso";
import { useLang } from "@/context/lang";

const CategoriaContacto = () => {
  const { translate } = useLang();
  const { res, pushData, modifyData, filterData, getData } = useGet<
    CategoriaContactoRes[]
  >(ENDPOINTS.CATEGORIACONTACTO.GET);
  const { state, item, openModal, closeModal } = useModal<CategoriaContactoRes>(
    translate("FORM_CONTACTO_CATEGORIA_TITLE")
  );
  const { canAdd, canDelete, canEdit, canModify, canView } = useAcceso(
    MODELOS.CATEGORÍAS_DE_CONTACTO
  );
  const columns = createColumns<CategoriaContactoRes>([
    {
      header: translate("TABLE_CATEGORÍAS_DE_CONTACTO_COL_NOMBRE"),
      accessorKey: "nombre",
    },
    {
      header: translate("TABLE_CATEGORÍAS_DE_CONTACTO_COL_COLOR"),
      accessorKey: "color",
    },
  ]);
  return (
    <PageContainer title={translate("MODELOS_CATEGORÍAS_DE_CONTACTO")}>
      <TableContainer
        name="categoriacontactos"
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
        <Form<CategoriaContactoRes, CategoriaContactoForm>
          item={item}
          initialValues={{
            idPadre: 1,
            nombre: item?.nombre || "",
            pathPadre: item?.pathPadre || "",
            color: item?.color || "",
          }}
          validationSchema={categoriaContactoSchema}
          post={{
            route: ENDPOINTS.CATEGORIACONTACTO.POST,
            onBody: (value) => value,
            onSuccess: (data) => {
              pushData(data);
              closeModal();
            },
          }}
          put={canEdit({
            route: ENDPOINTS.CATEGORIACONTACTO.PUT + item?.id,
            onBody: (value) => value,
            onSuccess: (data) => {
              modifyData(data, (value) => value.id === data.id);
              closeModal();
            },
          })}
          del={canDelete({
            route: ENDPOINTS.CATEGORIACONTACTO.DELETE + item?.id,
            onSuccess: (data) => {
              filterData((value) => value.id !== data.id);
              closeModal();
            },
          })}
        >
          <Form.Column>
            <Form.Input
              name="nombre"
              title={translate("FORM_CONTACTO_CATEGORIA_INPUT_NOMBRE")}
            /><Form.Input
            name="pathPadre"
            title={translate("FORM_CONTACTO_CATEGORIA_INPUT_PATH_PADRE")}
          />
            <Form.Input
              name="color"
              title={translate("FORM_CONTACTO_CATEGORIA_INPUT_COLOR")}
            />
          </Form.Column>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default CategoriaContacto;
