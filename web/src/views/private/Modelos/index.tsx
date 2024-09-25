import TableContainer from "../../../components/common/table/tableContainer";
import { useGet } from "../../../components/hooks/useGet";
import { createColumns } from "../../../utils/createColumns";
import PageContainer from "../../../components/common/pageContainer";
import { useModal } from "../../../components/common/modal/useModal";
import Modal from "../../../components/common/modal/modal";
import Form from "../../../components/common/form/form";
import { MenuRes } from "../../../types/res/MenuRes";
import { ENDPOINTS } from "../../../types/enums/Endpoints";
import { ModeloRes } from "@/types/res/ModeloRes";
import { ModeloForm, modeloSchema } from "./validations/modelo";
import { MODELOS } from "@/types/enums/Modelos";
import { useAcceso } from "@/components/hooks/useAcceso";

const Modelos = () => {
  const { res, modifyData, filterData, getData } = useGet<ModeloRes[]>(
    ENDPOINTS.MODELO.GET
  );
  const { state, item, openModal, closeModal } = useModal<ModeloRes>(
    "Formulario de modelo"
  );
  const { canAdd, canDelete, canEdit, canModify, canView } = useAcceso(
    MODELOS.MODELOS
  );

  const columns = createColumns<ModeloRes>([
    {
      header: "Nombre",
      accessorKey: "modelo",
    },
    {
      header: "Descripción",
      accessorKey: "descripcion",
    },
    {
      header: "Secuencia",
      accessorKey: "secuencia",
    },
    {
      header: "Tipo",
      accessorKey: "tipo",
    },
    {
      header: "Menú",
      accessorKey: "nombreMenu",
    },
  ]);

  return (
    <PageContainer title="Modelos">
      <TableContainer
        name="modelos"
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
        <Form<ModeloRes, ModeloForm>
          item={item}
          initialValues={{
            modelo: item?.modelo || "",
            descripcion: item?.descripcion || "",
            tipo: item?.tipo || "CRUD",
            idMenu: item?.idMenu || "",
            secuencia: item?.secuencia || "",
          }}
          validationSchema={modeloSchema}
          post={{
            route: ENDPOINTS.MODELO.POST,
            onSuccess: () => {
              getData();
              closeModal();
            },
          }}
          put={canEdit({
            route: ENDPOINTS.MODELO.PUT + item?.id,
            onSuccess: (data) => {
              modifyData(data, (value) => value.id === data.id);
              closeModal();
            },
          })}
          del={canDelete({
            route: ENDPOINTS.MODELO.DELETE + item?.id,
            onSuccess: (data) => {
              filterData((value) => value.id !== data.id);
              closeModal();
            },
          })}
        >
          <Form.Column>
            <Form.Select
              name="modelo"
              title="Nombre"
              placeholder="Seleccione un modelo"
            >
              {Object.values(MODELOS).map((key) => (
                <Form.Option key={key} value={key}>
                  {key}
                </Form.Option>
              ))}
            </Form.Select>
            <Form.Input name="descripcion" title="Descripción" />
            <Form.Input name="secuencia" title="Secuencia" />
            <Form.Select title="Tipo" name="tipo">
              <Form.Option value="CRUD">CRUD</Form.Option>
              <Form.Option value="Reportes">Reportes</Form.Option>
            </Form.Select>
            <Form.Select<MenuRes>
              name="idMenu"
              title="Menú"
              route={ENDPOINTS.MENU.GET}
              optionValueKey="id"
              optionTextKey="nombre"
              placeholder="Seleccione un menú"
            />
          </Form.Column>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default Modelos;
