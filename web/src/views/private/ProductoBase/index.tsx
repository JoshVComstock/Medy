import TableContainer from "../../../components/common/table/tableContainer";
import { useGet } from "../../../components/hooks/useGet";
import { createColumns } from "../../../utils/createColumns";
import PageContainer from "../../../components/common/pageContainer";
import { useModal } from "../../../components/common/modal/useModal";
import { ENDPOINTS } from "../../../types/enums/Endpoints";
import { MODELOS } from "@/types/enums/Modelos";
import { useAcceso } from "@/components/hooks/useAcceso";
import { ProductoBaseRes } from "@/types/res/ProductoBaseRes";
import Floating from "@/components/common/floating/floating";
import ProductoBaseFormulario from "./components/productoBaseForm";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/types/enums/Routes";
import { useLang } from "@/context/lang";

const ProductoBase = () => {
  const {translate} = useLang()
  const { res, modifyData, filterData, getData } = useGet<ProductoBaseRes[]>(
    ENDPOINTS.PRODUCTOBASE.GET
  );
  const { state, openModal, closeModal } = useModal<ProductoBaseRes>(
    "Formulario de producto base"
  );
  const { canAdd, canDelete, canEdit, canView } = useAcceso(
    MODELOS.PRODUCTOS_BASE
  );
  const navigate = useNavigate();

  const columns = createColumns<ProductoBaseRes>([
    {
      header: translate("TABLE_PRODUCTOS_BASE_COL_NOMBRE"),
      accessorKey: "nombre",
    },
    {
      header: translate("TABLE_PRODUCTOS_BASE_COL_DESCRIPCION"),
      accessorKey: "descripcion",
    },
    {
      header: translate("TABLE_PRODUCTOS_BASE_COL_VARIANTES"),
      accessorKey: "cantidadVariantes",
    },
    {
      header: translate("TABLE_PRODUCTOS_BASE_COL_PRECIO_DE_COMPRA"),
      accessorKey: "precioCosto",
    },
    {
      header: translate("TABLE_PRODUCTOS_BASE_COL_PRECIO_DE_VENTA"),
      accessorKey: "precioVenta",
    },
    {
      header: translate("TABLE_PRODUCTOS_BASE_COL_VOLUMEN"),
      accessorKey: "volumen",
    },
  ]);

  return (
    <PageContainer title={translate("MODELOS_PRODUCTOS_BASE")}>
      <TableContainer
        name="productosBase"
        fixKey="id"
        columns={columns}
        data={res?.data}
        add={canAdd(() => openModal())}
        reports={canView}
        controls={[
          {
            label: "Ver producto",
            fn: (row) =>
              navigate(ROUTES.COMPRAS_PRODUCTOS_PRODUCTOS_DETALLES + row.id),
          },
        ]}
        reload={getData}
      />
      <Floating width="1100px" state={state}>
        <PageContainer title="Formulario de productos" backRoute={closeModal}>
          <ProductoBaseFormulario
            item={null}
            onSuccessPost={() => {
              getData();
              closeModal();
            }}
            onSuccessPut={(data) => {
              modifyData(data, (value) => value.id === data.id);
              closeModal();
            }}
            onSuccessDelete={(data) => {
              filterData((value) => value.id !== data.id);
              closeModal();
            }}
            canEdit={canEdit}
            canDelete={canDelete}
          />
        </PageContainer>
      </Floating>
    </PageContainer>
  );
};

export default ProductoBase;
