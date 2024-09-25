import PageContainer from "../../../components/common/pageContainer";
import TableContainer from "../../../components/common/table/tableContainer";
import Modal from "../../../components/common/modal/modal";
import Form from "../../../components/common/form/form";
import { createColumns } from "../../../utils/createColumns";
import { useGet } from "../../../components/hooks/useGet";
import { useModal } from "../../../components/common/modal/useModal";
import { AtributoForm, atributoSchema } from "./validations/atributo";
import { ENDPOINTS } from "../../../types/enums/Endpoints";
import { useAcceso } from "@/components/hooks/useAcceso";
import { MODELOS } from "@/types/enums/Modelos";
import { atributoRes } from "./interfaces/atributo";
import Floating from "@/components/common/floating/floating";
import AtributoValor from "../AtributoValor";
import { useLang } from "@/context/lang";

const Atributo = () => {
  const {translate} = useLang()
  const { res, pushData, modifyData, filterData, getData } = useGet<
    atributoRes[]
  >(ENDPOINTS.ATRIBUTO.GET);
  const { state, item, openModal, closeModal } = useModal<atributoRes>(
    "Formulario atributo"
  );
  const {
    state: valorState,
    item: valorItem,
    openModal: valorOpenModal,
    closeModal: valorCloseModal,
  } = useModal<atributoRes>("Atributo valor");
  const { canAdd, canDelete, canEdit, canModify, canView } = useAcceso(
    MODELOS.ATRIBUTO
  );

  const columns = createColumns<atributoRes>([
    {
      header: translate("TABLE_ATRIBUTOS_COL_NOMBRE"),
      accessorKey: "nombre",
    },
    {
      header: translate("TABLE_ATRIBUTOS_COL_TIPO_VISUALIZACION"),
      accessorKey: "tipoVisualizacion",
    },
    {
      header: translate("TABLE_ATRIBUTOS_COL_MODO_CREACION"),
      accessorKey: "modoCreacion",
    },
  ]);

  return (
    <PageContainer title={translate("MODELOS_ATRIBUTOS")}>
      <TableContainer
        name="atributos"
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
            label: "Valores de atributo",
            fn: (row) => valorOpenModal(row as atributoRes),
          },
        ]}
        reload={getData}
      />
      <Floating width="60%" state={valorState}>
        <AtributoValor idAtributo={valorItem?.id} close={valorCloseModal} />
      </Floating>
      <Modal state={state}>
        <Form<atributoRes, AtributoForm>
          item={item}
          initialValues={{
            secuencia: 1,
            nombre: item?.nombre || "",
            modoCreacion: item?.modoCreacion || "",
            tipoVisualizacion: item?.tipoVisualizacion,
          }}
          validationSchema={atributoSchema}
          post={{
            route: ENDPOINTS.ATRIBUTO.POST,
            onBody: (value) => value,
            onSuccess: (data) => {
              pushData(data);
              closeModal();
            },
          }}
          put={canEdit({
            route: ENDPOINTS.ATRIBUTO.PUT + item?.id,
            onBody: (value) => value,
            onSuccess: (data) => {
              modifyData(data, (value) => value.id === data.id);
              closeModal();
            },
          })}
          del={canDelete({
            route: ENDPOINTS.ATRIBUTO.DELETE + item?.id,
            onSuccess: (data) => {
              filterData((value) => value.id !== data.id);
              closeModal();
            },
          })}
        >
          <Form.Column>
            <Form.Input name="nombre" title={translate("FORM_ATRIBUTOS_INPUT_NOMBRE")} />

            <Form.Select
              name="tipoVisualizacion"
              title={translate("FORM_ATRIBUTOS_INPUT_TIPO_VISUALIZACION")}
              placeholder={translate("FORM_ATRIBUTOS_INPUT_TIPO_VISUALIZACION_PLACEHOLDER")}
            >
              <Form.Option value="Radio">Radio</Form.Option>
              <Form.Option value="Pildoras">Pildoras</Form.Option>
              <Form.Option value="Color">Color</Form.Option>
              <Form.Option value="Seleccionar">Seleccionar</Form.Option>
            </Form.Select>

            <Form.Select
              name="modoCreacion"
              title={translate("FORM_ATRIBUTOS_INPUT_MODO_CREACION")}
              placeholder={translate("FORM_ATRIBUTOS_INPUT_MODO_CREACION_PLACEHOLDER")}
            >
              <Form.Option value="Instantáneamente">
                Instantáneamente
              </Form.Option>
              <Form.Option value="Dinámicamente">Dinámicamente</Form.Option>
              <Form.Option value="Nunca">Nunca (optional)</Form.Option>
            </Form.Select>
            
          </Form.Column>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default Atributo;
