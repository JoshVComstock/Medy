import Form from "@/components/common/form/form";
import PageContainer from "@/components/common/pageContainer";
import TableContainer from "@/components/common/table/tableContainer";
import { useGet } from "@/components/hooks/useGet";
import { ENDPOINTS } from "@/types/enums/Endpoints";
import { ProductoCategoriaRes } from "@/types/res/ProductoCategoriaRes";
import { createColumns } from "@/utils/createColumns";
import {
  productoCategoriaSchema,
  ProductoCategoriaForm,
} from "./validations/productoCategoria";
import { useModal } from "@/components/common/modal/useModal";
import { MODELOS } from "@/types/enums/Modelos";
import { useAcceso } from "@/components/hooks/useAcceso";
import Modal from "@/components/common/modal/modal";

const ProductoCategoria = () => {
  const { res, pushData, modifyData, filterData, getData } = useGet<
    ProductoCategoriaRes[]
  >(ENDPOINTS.PRODUCTOCATEGORIA.GET);
  const { state, item, openModal, closeModal } = useModal<ProductoCategoriaRes>(
    "Formulario de categoria"
  );
  const { canAdd, canDelete, canEdit, canModify, canView } = useAcceso(
    MODELOS.PRODUCTO_CATEGORIA
  );
  const columns = createColumns<ProductoCategoriaRes>([
    {
      header: "Nombre",
      accessorKey: "nombre",
    },
    {
      header: "Nombre completo",
      accessorKey: "nombreCompleto",
    },
    {
      header: "Path padre",
      accessorKey: "pathPadre",
    },
    {
      header: "Estrategia eliminacion",
      accessorKey: "idEstrategiaEliminacion",
    },
    {
      header: "Metodo embalaje",
      accessorKey: "metodoEmbalaje",
    },
    {
      header: "Padre",
      accessorKey: "idPadre",
    },
  ]);

  return (
    <PageContainer title="Categoria">
      <TableContainer
        name="productoCategoria"
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
        <Form<ProductoCategoriaRes, ProductoCategoriaForm>
          item={item}
          initialValues={{
            nombre: item?.nombre || "",
            nombreCompleto: item?.nombreCompleto || "",
            idPadre: 1,
            idEstrategiaEliminacion: item?.idEstrategiaEliminacion || "",
            metodoEmbalaje: item?.metodoEmbalaje || "",
            pathPadre: item?.pathPadre || "",
          }}
          validationSchema={productoCategoriaSchema}
          post={{
            route: ENDPOINTS.PRODUCTOCATEGORIA.POST,
            onBody: (value) => ({
              ...value,
            }),
            onSuccess: (data) => {
              pushData(data);
              closeModal();
            },
          }}
          put={canEdit({
            route: ENDPOINTS.PRODUCTOCATEGORIA.PUT + item?.id,
            onBody: (value) => ({
              ...value,
            }),
            onSuccess: (data) => {
              modifyData(data, (value) => value.id === data.id);
              closeModal();
            },
          })}
          del={canDelete({
            route: ENDPOINTS.PRODUCTOCATEGORIA.DELETE + item?.id,
            onSuccess: (data) => {
              filterData((value) => value.id !== data.id);
              closeModal();
            },
          })}
        >
          <Form.Column>
            <Form.Input name="nombre" title="Nombre" />
            <Form.Input name="nombreCompleto" title="Nombre completo" />
            <Form.Input name="idEstrategiaEliminacion" title="Estrategia" />
            <Form.Input name="metodoEmbalaje" title="Metodo embalaje" />
            <Form.Input name="pathPadre" title="Path padre" />
          </Form.Column>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default ProductoCategoria;
