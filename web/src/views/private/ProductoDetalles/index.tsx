import Loader from "@/components/common/loader/loader";
import PageContainer from "@/components/common/pageContainer";
import Tabs from "@/components/common/tabs/tabs";
import { ENDPOINTS } from "@/types/enums/Endpoints";
import { ROUTES } from "@/types/enums/Routes";
import { ProductoBaseRes } from "@/types/res/ProductoBaseRes";
import { useNavigate, useParams } from "react-router-dom";
import ProductoBaseForm from "../ProductoBase/components/productoBaseForm";
import { MODELOS } from "@/types/enums/Modelos";
import { useAcceso } from "@/components/hooks/useAcceso";
import AtributosForm from "./components/atributosForm";

const ProductoDetalles = () => {
  const { id } = useParams();
  const { canDelete, canEdit } = useAcceso(MODELOS.PRODUCTOS_BASE);
  const navigate = useNavigate();

  return (
    <PageContainer<ProductoBaseRes>
      title="Producto"
      titleRequestRoute={ENDPOINTS.PRODUCTOBASE.FIND + id}
      titleRequestKey="nombre"
      backRoute={ROUTES.COMPRAS_PRODUCTOS_PRODUCTOS}
      padding={false}
    >
      {({ res, setRes }) =>
        !res?.data ? (
          <Loader text="Cargando producto..." />
        ) : (
          <Tabs pages={["Detalles generales", "Atributos y variantes"]}>
            {{
              "Detalles generales": (
                <ProductoBaseForm
                  item={res.data}
                  onSuccessPost={() => {}}
                  onSuccessPut={(values) => {
                    setRes({
                      data: values,
                      message: "",
                      status: 200,
                    });
                  }}
                  onSuccessDelete={() =>
                    navigate(ROUTES.COMPRAS_PRODUCTOS_PRODUCTOS)
                  }
                  canEdit={canEdit}
                  canDelete={canDelete}
                  disabled={!canEdit(res.data) || !canDelete(res.data)}
                />
              ),
              "Atributos y variantes": (
                <AtributosForm productoBase={res.data} setRes={setRes} />
              ),
            }}
          </Tabs>
        )
      }
    </PageContainer>
  );
};

export default ProductoDetalles;
