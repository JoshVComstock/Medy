import PageContainer from "../../../components/common/pageContainer";
import TableContainer from "../../../components/common/table/tableContainer";
import { createColumns } from "../../../utils/createColumns";
import { ContactoRes } from "../../../types/res/ContactoRes";
import { useGet } from "../../../components/hooks/useGet";
import { useModal } from "../../../components/common/modal/useModal";
import { ENDPOINTS } from "../../../types/enums/Endpoints";
import { useAcceso } from "@/components/hooks/useAcceso";
import { MODELOS } from "@/types/enums/Modelos";
import { useLang } from "@/context/lang";
import Floating from "@/components/common/floating/floating";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/types/enums/Routes";
import ContactosForm from "./components/contactoForm";
import Empresa from "@/assets/images/Empresa.png";
import Usuario from "@/assets/images/individual.png";

const Contacto = () => {
  const { translate } = useLang();
  const { res, modifyData, filterData, getData } = useGet<ContactoRes[]>(
    ENDPOINTS.CONTACTO.ITCOMPANY
  );
  const { state, openModal, closeModal } = useModal<ContactoRes>(
    "Formulario contacto"
  );
  const navigate = useNavigate();
  const { canAdd, canDelete, canEdit, canView } = useAcceso(MODELOS.CONTACTOS);
  const columns = createColumns<ContactoRes>([
    {
      header: translate("TABLE_CONTACTOS_COL_NOMBRE"),
      accessorKey: "nombre",
    },
    {
      header: translate("TABLE_CONTACTOS_COL_PROFESION"),
      accessorKey: "profesion",
    },
    {
      header: translate("TABLE_CONTACTOS_COL_ES_EMPRESA"),
      cell: (row) => (
        <div className="w-full flex justify-center gap-4 items-center">
          <label htmlFor="">
            {row.row.original.esEmpresa ? "Empresa" : "Individual"}
          </label>
          <img
            className="w-[35px] h-[35px] "
            src={row.row.original.esEmpresa ? Empresa : Usuario}
            alt="Imagen"
          />
        </div>
      ),
    },
    {
      header: translate("TABLE_CONTACTOS_COL_TELEFONO_FIJO"),
      accessorKey: "telefonoFijo",
    },
    {
      header: translate("TABLE_CONTACTOS_COL_PUESTO_DE_TRABAJO"),
      accessorKey: "puestoTrabajo",
    },
    {
      header: translate("TABLE_CONTACTOS_COL_CORREO_ELECTRONICO"),
      accessorKey: "email",
    },
  ]);
  return (
    <PageContainer title={translate("MODELOS_CONTACTOS")}>
      <TableContainer
        name="contactos"
        fixKey="id"
        columns={columns}
        data={res?.data}
        add={canAdd(() => openModal())}
        reports={canView}
        controls={[
          {
            label: "Ver contacto",
            fn: (row) => navigate(ROUTES.CONTACTO_DETALLE + row.id),
          },
        ]}
        reload={getData}
      />
      <Floating width="1200px" state={state}>
        <PageContainer title="Formulario de contactos" backRoute={closeModal}>
          <ContactosForm
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

export default Contacto;
