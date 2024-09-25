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
import { BancoRes } from "@/types/res/BancoRes";
import { BancoForm, bancoSchema } from "./validations/banco";

const Banco = () => {
  const { res, pushData, modifyData, filterData, getData } = useGet<BancoRes[]>(
    ENDPOINTS.BANCO.GET
  );
  const { state, item, openModal, closeModal } = useModal<BancoRes>(
    "Formulario de banco"
  );
  const { canAdd, canDelete, canEdit, canModify, canView } = useAcceso(
    MODELOS.BANCO
  );

  const columns = createColumns<BancoRes>([
    {
      header: "Nombre",
      accessorKey: "nombre",
    },
    {
      header: "Direccion",
      accessorKey: "direccion",
    },
    {
      header: "Segunda direccion",
      accessorKey: "direccion2",
    },
    {
      header: "Codigo postal",
      accessorKey: "codigoPostal",
    },
    {
      header: "Ciudad",
      accessorKey: "ciudad",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Telefono",
      accessorKey: "telefono",
    },
  ]);

  return (
    <PageContainer title="Banco">
      <TableContainer
        name="banco"
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
        <Form<BancoRes, BancoForm>
          item={item}
          initialValues={{
            nombre: item?.nombre || "",
            ciudad: item?.ciudad || "",
            email: item?.email || "",
            codigoPostal: item?.codigoPostal || "",
            direccion: item?.direccion || "",
            direccion2: item?.direccion2 || "",
            telefono: item?.telefono || "",
          }}
          validationSchema={bancoSchema}
          post={{
            route: ENDPOINTS.BANCO.POST,
            onBody: (value) => ({
              ...value,
            }),
            onSuccess: (data) => {
              pushData(data);
              closeModal();
            },
          }}
          put={canEdit({
            route: ENDPOINTS.BANCO.PUT + item?.id,
            onBody: (value) => ({
              ...value,
            }),
            onSuccess: (data) => {
              modifyData(data, (value) => value.id === data.id);
              closeModal();
            },
          })}
          del={canDelete({
            route: ENDPOINTS.BANCO.DELETE + item?.id,
            onSuccess: (data) => {
              filterData((value) => value.id !== data.id);
              closeModal();
            },
          })}
        >
          <Form.Column>
            <Form.Input name="nombre" title="Nombre" />
            <Form.Input name="direccion" title="Direccion" />
            <Form.Input name="direccion2" title="Segunda direccion" />
            <Form.Input name="codigoPostal" title="Codigo postal" />
            <Form.Input name="ciudad" title="Ciudad" />
            <Form.Input name="email" title="Email" />
            <Form.Input name="telefono" title="Telefono" />
          </Form.Column>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default Banco;
