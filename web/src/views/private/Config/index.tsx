import TableContainer from "../../../components/common/table/tableContainer";
import { useGet } from "../../../components/hooks/useGet";
import { createColumns } from "../../../utils/createColumns";
import PageContainer from "../../../components/common/pageContainer";
import { useModal } from "../../../components/common/modal/useModal";
import Modal from "../../../components/common/modal/modal";
import Form from "../../../components/common/form/form";
import { ENDPOINTS } from "../../../types/enums/Endpoints";
import { MODELOS } from "@/types/enums/Modelos";
import { useAcceso } from "@/components/hooks/useAcceso";
import { configSchema, ConfigForm } from "./validations/config";
import { ConfigRes } from "@/types/res/ConfigRes";
import { EmpresaRes } from "@/types/res/EmpresaRes";

const Config = () => {
  const { res, pushData, modifyData, filterData, getData } = useGet<
    ConfigRes[]
  >(ENDPOINTS.PVCONFIG.GET);
  const { state, item, openModal, closeModal } = useModal<ConfigRes>(
    "Formulario de configuracion"
  );
  const { canAdd, canDelete, canEdit, canModify, canView } = useAcceso(
    MODELOS.PVCONFIG
  );

  const columns = createColumns<ConfigRes>([
    {
      header: "Nombre",
      accessorKey: "nombre",
    },
    {
      header: "Limite producto",
      accessorKey: "limiteProducto",
    },
    {
      header: "Limite contactos",
      accessorKey: "limiteContactos",
    },
    {
      header: "Empresa",
      accessorFn: (row) => row.empresa.nombre,
      meta: {
        isRelational: "empresa",
      },
    },
    {
      header: "Limite contactos",
      accessorKey: "idTipoTerminal",
    },
  ]);

  return (
    <PageContainer title="Configuracion">
      <TableContainer
        name="config"
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
        <Form<ConfigRes, ConfigForm>
          item={item}
          initialValues={{
            nombre: item?.nombre || "",
            limiteContactos: item?.limiteContactos || "",
            idEmpresa: item?.idEmpresa || "",
            idTipoTerminal: 1,
            limiteProducto: item?.limiteProducto || "",
          }}
          validationSchema={configSchema}
          post={{
            route: ENDPOINTS.PVCONFIG.POST,
            onBody: (value) => value,
            onSuccess: (data) => {
              pushData(data);
              closeModal();
            },
          }}
          put={canEdit({
            route: ENDPOINTS.PVCONFIG.PUT + item?.id,
            onBody: (value) => ({
              value,
            }),
            onSuccess: (data) => {
              modifyData(data, (value) => value.id === data.id);
              closeModal();
            },
          })}
          del={canDelete({
            route: ENDPOINTS.PVCONFIG.DELETE + item?.id,
            onSuccess: (data) => {
              filterData((value) => value.id !== data.id);
              closeModal();
            },
          })}
        >
          <Form.Column>
            <Form.Input name="nombre" title="Nombre" />
            <Form.Input name="limiteProducto" title="Limite producto" />
            <Form.Input name="limiteContactos" title="Limite Contactos " />
            <Form.Select<EmpresaRes>
              name="idEmpresa"
              title="Empresa"
              route={ENDPOINTS.EMPRESA.GET}
              optionTextKey="nombre"
              optionValueKey="id"
              placeholder="Seleccione una empresa"
            />
          </Form.Column>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default Config;
