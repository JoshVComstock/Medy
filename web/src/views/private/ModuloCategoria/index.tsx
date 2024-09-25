import TableContainer from "../../../components/common/table/tableContainer";
import { useGet } from "../../../components/hooks/useGet";
import { createColumns } from "../../../utils/createColumns";
import PageContainer from "../../../components/common/pageContainer";
import { useModal } from "../../../components/common/modal/useModal";
import Modal from "../../../components/common/modal/modal";
import Form from "../../../components/common/form/form";
import {
  ModuloCategoriaForm,
  moduloCategoriaSchema,
} from "./validations/moduloCategoria";
import { ModuloCategoriaRes } from "../../../types/res/ModuloCategoriaRes";
import { ENDPOINTS } from "../../../types/enums/Endpoints";

const ModuloCategoria = () => {
  const { res, pushData, modifyData, filterData, getData } = useGet<
    ModuloCategoriaRes[]
  >(ENDPOINTS.MODULOCATEGORIA.GET);
  const { state, item, openModal, closeModal } = useModal<ModuloCategoriaRes>(
    "Formulario de tipo comprobante"
  );

  const columns = createColumns<ModuloCategoriaRes>([
    {
      header: "Usuario creado",
      accessorKey: "idUsrCreacion",
    },
    {
      header: "Modificación de Usuario",
      accessorKey: "idUsrModificacion",
    },
    {
      header: "Id del Padre",
      accessorKey: "idPadre",
    },
    {
      header: "Nombre",
      accessorKey: "nombre",
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
      header: "Visible",
      accessorKey: "visible",
    },
    {
      header: "Exclusivo",
      accessorKey: "exclusivo",
    },
    {
      header: "Estado",
      accessorKey: "estado",
    },
  ]);

  return (
    <PageContainer title="Modulo categoria">
      <TableContainer
        name="modulocategorias"
        fixKey="id"
        columns={columns}
        data={res?.data}
        add={() => openModal()}
        controls={[
          {
            label: "Modificar",
            fn: (row) => openModal(row),
          },
        ]}
        reload={getData}
      />
      <Modal state={state}>
        <Form<ModuloCategoriaRes, ModuloCategoriaForm>
          item={item}
          initialValues={{
            nombre: item?.nombre || "",
            descripcion: item?.descripcion || "",
            exclusivo: item?.exclusivo || false,
            secuencia: item?.secuencia || 1,
            visible: item?.visible || false,
            idPadre: 1,
          }}
          validationSchema={moduloCategoriaSchema}
          post={{
            route: ENDPOINTS.MODULOCATEGORIA.POST,
            onBody: (value) => value,
            onSuccess: (data) => {
              pushData(data);
              closeModal();
            },
          }}
          put={{
            route: ENDPOINTS.MODULOCATEGORIA.PUT + item?.id,
            onBody: (value) => value,
            onSuccess: (data) => {
              modifyData(data, (value) => value.id === data.id);
              closeModal();
            },
          }}
          del={{
            route: ENDPOINTS.MODULOCATEGORIA.DELETE + item?.id,
            onSuccess: (data) => {
              filterData((value) => value.id !== data.id);
              closeModal();
            },
          }}
        >
          <Form.Column>
            <Form.Input name="nombre" title="Nombre" />
            <Form.Input name="descripcion" title="Descripcion" />
            <Form.Input name="secuencia" title="Secuencia" />
            <Form.Checkbox name="exclusivo" title="Exclusivo" />
            <Form.Checkbox name="visible" title="Visible" />
          </Form.Column>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default ModuloCategoria;
