import PageContainer from "../../../components/common/pageContainer";
import TableContainer from "../../../components/common/table/tableContainer";
import Modal from "../../../components/common/modal/modal";
import Form from "../../../components/common/form/form";
import { createColumns } from "../../../utils/createColumns";
import { useGet } from "../../../components/hooks/useGet";
import { useModal } from "../../../components/common/modal/useModal";
import {
  unidadMedidaForm,
  unidadMedidaSchema,
} from "./validations/UnidadMedida";
import { ENDPOINTS } from "../../../types/enums/Endpoints";
import { useAcceso } from "@/components/hooks/useAcceso";
import { MODELOS } from "@/types/enums/Modelos";
import UnidadMedidaRes from "../../../types/res/UnidadMedida";
import RmCategoriaRes from "@/types/res/RmCategoriaRes";
import { useLang } from "@/context/lang";

interface Props {
  rmCategoria?: RmCategoriaRes;
  close: () => void;
}
const UnidadMedida = ({ rmCategoria, close }: Props) => {
  const { translate } = useLang();
  const { res, pushData, modifyData, filterData, getData } = useGet<
    UnidadMedidaRes[]
  >(ENDPOINTS.RMUNIDADMEDIDA.GETBYCATEGORIA + rmCategoria?.id);
  const { state, item, openModal, closeModal } = useModal<UnidadMedidaRes>(
    translate("FORM_UM_UNIDAD_MEDIDA_FORM_TITULO")
  );
  const { canAdd, canDelete, canEdit, canModify, canView } = useAcceso(
    MODELOS.RMUNIDADMEDIDA
  );
  const columns = createColumns<UnidadMedidaRes>([
    {
      header: translate("FORM_UM_UNIDAD_MEDIDA_NOMBRE"),
      accessorKey: "nombre",
    },
    {
      header: translate("FORM_UM_UNIDAD_MEDIDA_TIPO"),
      accessorKey: "tipo",
    },
    {
      header: "Categoria",
      accessorFn: (row) => row.categoria.nombre,
      meta: {
        isRelational: "categoria",
      },
    },
    {
      header: translate("FORM_UM_UNIDAD_MEDIDA_RATIO"),
      accessorKey: "ratio",
    },
  ]);

  return (
    <PageContainer
      title={translate("FORM_UM_UNIDAD_MEDIDA_TITULO")}
      backRoute={close}
    >
      <div className="grid grid-cols-6 gap-4 pl-5 w-2/3 dark:text-white">
        <div className="flex text-justify items-center col-start-1 col-end-3 p-2 font-bold">
          {translate("FORM_UM_UNIDAD_MEDIDA_TITULO_NOMBRE")}
        </div>
        <div className="flex justify-center items-center col-start-3 col-end-3 p-2">
          {rmCategoria?.nombre}
        </div>
        <div className="flex text-justify items-center col-start-1 col-end-3 p-2 font-bold">
          {translate("FORM_UM_UNIDAD_MEDIDA_TITULO_AGRUPABLE")}
        </div>
        <div className="flex justify-center items-center col-start-3 col-end-3 p-2">
          <input
            type="checkbox"
            disabled={true}
            checked={rmCategoria?.agrupable}
            className="dark:text-white"
          ></input>
        </div>
      </div>

      <TableContainer
        name="unidad de medida"
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
        <Form<UnidadMedidaRes, unidadMedidaForm>
          item={item}
          initialValues={{
            idCategoria: rmCategoria?.id,
            nombre: item?.nombre || "",
            tipo: item?.tipo || "",
            ratio: item?.ratio || 0,
            redondeo: item?.redondeo || 0,
          }}
          validationSchema={unidadMedidaSchema}
          post={{
            route: ENDPOINTS.RMUNIDADMEDIDA.POST,
            onBody: (value) => value,
            onSuccess: (data) => {
              pushData(data);
              closeModal();
            },
          }}
          put={canEdit({
            route: ENDPOINTS.RMUNIDADMEDIDA.PUT + item?.id,
            onBody: (value) => value,
            onSuccess: (data) => {
              modifyData(data, (value) => value.id === data.id);
              closeModal();
            },
          })}
          del={canDelete({
            route: ENDPOINTS.RMUNIDADMEDIDA.DELETE + item?.id,
            onSuccess: (data) => {
              filterData((value) => value.id !== data.id);
              closeModal();
            },
          })}
        >
          <Form.Column>
            <Form.Input
              name="nombre"
              title={translate("FORM_UM_UNIDAD_MEDIDA_NOMBRE")}
            />
            <Form.Input
              name="tipo"
              title={translate("FORM_UM_UNIDAD_MEDIDA_TIPO")}
            />
            <Form.Input
              type="number"
              name="ratio"
              title={translate("FORM_UM_UNIDAD_MEDIDA_RATIO")}
            />
            <Form.Input
              type="number"
              name="redondeo"
              title={translate("FORM_UM_UNIDAD_MEDIDA_REDONDEO")}
            />
          </Form.Column>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default UnidadMedida;
