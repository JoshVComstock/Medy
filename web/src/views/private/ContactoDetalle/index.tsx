import Loader from "@/components/common/loader/loader";
import PageContainer from "@/components/common/pageContainer";
import Tabs from "@/components/common/tabs/tabs";
import { ENDPOINTS } from "@/types/enums/Endpoints";
import { ROUTES } from "@/types/enums/Routes";
import { useNavigate, useParams } from "react-router-dom";
import { MODELOS } from "@/types/enums/Modelos";
import { useAcceso } from "@/components/hooks/useAcceso";
import { ContactoRes } from "@/types/res/ContactoRes";
import ContactosForm from "../Contacto/components/contactoForm";
import ContactoRelacionForm from "./components/contactoRelacionForm";

const ContactoDetalle = () => {
  const { id } = useParams();
  const { canDelete, canEdit } = useAcceso(MODELOS.CONTACTOS);
  const navigate = useNavigate();

  return (
    <PageContainer<ContactoRes>
      title="Contacto"
      titleRequestRoute={ENDPOINTS.CONTACTO.FIND + id}
      titleRequestKey="nombre"
      backRoute={ROUTES.CONTACTO}
      padding={false}
    >
      {({ res, setRes }) =>
        !res?.data ? (
          <Loader text="Cargando contacto..." />
        ) : (
          <Tabs pages={["Detalle contacto", "Contactos relacionados"]}>
            {{
              "Detalle contacto": (
                <ContactosForm
                  item={res?.data}
                  onSuccessPost={() => {}}
                  onSuccessPut={(values) => {
                    setRes({
                      data: values,
                      message: "",
                      status: 200,
                    });
                  }}
                  onSuccessDelete={() => navigate(ROUTES.CONTACTO)}
                  canEdit={canEdit}
                  canDelete={canDelete}
                  disabled={!canEdit(res.data) || !canDelete(res.data)}
                />
              ),
              "Contactos relacionados": res.data.esEmpresa ? (
                <ContactoRelacionForm data={res?.data} />
              ) : (
                <></>
              ),
            }}
          </Tabs>
        )
      }
    </PageContainer>
  );
};

export default ContactoDetalle;
