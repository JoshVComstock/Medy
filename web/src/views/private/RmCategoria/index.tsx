import TableContainer from "../../../components/common/table/tableContainer";
import { useGet } from "../../../components/hooks/useGet";
import { createColumns } from "../../../utils/createColumns";
import PageContainer from "../../../components/common/pageContainer";
import { useModal } from "../../../components/common/modal/useModal";
import Modal from "../../../components/common/modal/modal";
import Form from "../../../components/common/form/form";
import { rmCategoriaSchema, RmCategoriaForm } from "./validation/rmCategoria";
import RmCategoriaRes from "@/types/res/RmCategoriaRes";
import { ENDPOINTS } from "../../../types/enums/Endpoints";
import { MODELOS } from "@/types/enums/Modelos";
import { useAcceso } from "@/components/hooks/useAcceso";
import Floating from "@/components/common/floating/floating";
import RmUnidadMedida from "../RmUnidadMedida";
import { useLang } from "@/context/lang";
const RmCategoria = () => {
  const {translate} = useLang();
  const { res, modifyData, filterData, getData } = useGet<RmCategoriaRes[]>(
    ENDPOINTS.RMCATEGORIA.GET
  );
  const { state, item, openModal, closeModal } = useModal<RmCategoriaRes>(translate("FORM_UM_CATEGORIA_FORM_TITULO"));
  const { canAdd, canDelete, canEdit, canModify, canView } = useAcceso(
    MODELOS.RMCATEGORIA
  );
  const {
    state: valorState,
    item: valorItem,
    openModal: valorOpenModal,
    closeModal: valorCloseModal,
  } = useModal<RmCategoriaRes>("Rm Categoria");
  const columns = createColumns<RmCategoriaRes>([
    {
      header: translate("FORM_UM_CATEGORIA_NOMBRE"),
      accessorKey: "nombre",
    },
    {
      header: translate("FORM_UM_CATEGORIA_AGRUPABLE"),
      accessorKey: "agrupable",
      accessorFn: (row) => (row.agrupable ? "SI" : "NO"),
    },
  ]);

  return (
    <PageContainer title={translate("FORM_UM_CATEGORIA_TITULO")}>
        <TableContainer
            name="Rm Categorias"
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
                {
                  label: "Unidades de medida",
                  fn: (row) => valorOpenModal(row as RmCategoriaRes),
                }
            ]}
            reload={getData}
        />
        <Floating width="60%" state={valorState}>
          <RmUnidadMedida rmCategoria={(valorItem)? valorItem : undefined} close={valorCloseModal} />
        </Floating>
        <Modal state={state}>
            <Form<RmCategoriaRes, RmCategoriaForm>
            item={item}
            initialValues={{
                nombre: item?.nombre || "",
                agrupable: item?.agrupable || false
            }}
            validationSchema={rmCategoriaSchema}
            post={{
                route: ENDPOINTS.RMCATEGORIA.POST,
                onBody: (value) => ({
                ...value
                }),
                onSuccess: () => {
                getData();
                closeModal();
                },
            }}
            put={canEdit({
                route: ENDPOINTS.RMCATEGORIA.PUT + item?.id,
                onBody: (value) => ({
                ...value
                }),
                onSuccess: (data) => {
                modifyData(data, (value) => value.id === data.id);
                closeModal();
                },
            })}
            del={canDelete({
                route: ENDPOINTS.RMCATEGORIA.DELETE + item?.id,
                onSuccess: (data) => {
                filterData((value) => value.id !== data.id);
                closeModal();
                },
            })}
            >
              <Form.Column>
                  <Form.Input name="nombre" title={translate("FORM_UM_CATEGORIA_NOMBRE")} />
                  <Form.Checkbox name="agrupable" title={translate("FORM_UM_CATEGORIA_AGRUPABLE")} />
              </Form.Column>
            </Form>
        </Modal>
    </PageContainer>
  );
};



export default RmCategoria;


/*

      
*/