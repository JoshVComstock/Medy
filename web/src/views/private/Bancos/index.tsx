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
import { BancosRes } from "@/types/res/BancosRes";
import { BancosForm, bancosSchema } from "./validations/bancos";

interface Props {
  idCuenta?: number;
  close: () => void;
}

const Bancos = ({ idCuenta, close }: Props) => {
  const { res, pushData, modifyData, filterData, getData } = useGet<
    BancosRes[]
  >(ENDPOINTS.BANCOS.GETBYCUENTA + idCuenta);
  const { state, item, openModal, closeModal } = useModal<BancosRes>(
    "Formulario de cuenta de banco"
  );
  const { canAdd, canDelete, canEdit, canModify, canView } = useAcceso(
    MODELOS.BANCOS
  );

  const columns = createColumns<BancosRes>([
    {
      header: "Número de cuenta",
      accessorKey: "numeroCuenta",
    },
    {
      header: "Nombre",
      accessorKey: "nombre",
    },
    {
      header: "Cuenta",
      accessorFn: (row) => row.cuenta.moneda,
      meta: {
        isRelational: "cuenta",
      },
    },
  ]);

  return (
    <PageContainer
      title="Libro de banco"
      titleRequestRoute={ENDPOINTS.CUENTAS.FIND + idCuenta}
      titleRequestKey={"descripcion"}
      backRoute={close}
    >
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
        <Form<BancosRes, BancosForm>
          item={item}
          initialValues={{
            idCuenta,
            nombre: item?.nombre || "",
            numeroCuenta: item?.numeroCuenta || "",
          }}
          validationSchema={bancosSchema}
          post={{
            route: ENDPOINTS.BANCOS.POST,
            onBody: (value) => ({
              ...value,
              numeroCuenta: String(value.numeroCuenta),
            }),
            onSuccess: (data) => {
              pushData(data);
              closeModal();
            },
          }}
          put={canEdit({
            route: ENDPOINTS.BANCOS.PUT + item?.id,
            onBody: (value) => ({
              ...value,
              numeroCuenta: String(value.numeroCuenta),
            }),
            onSuccess: (data) => {
              modifyData(data, (value) => value.id === data.id);
              closeModal();
            },
          })}
          del={canDelete({
            route: ENDPOINTS.BANCOS.DELETE + item?.id,
            onSuccess: (data) => {
              filterData((value) => value.id !== data.id);
              closeModal();
            },
          })}
        >
          <Form.Column>
            <Form.Input
              type="number"
              name="numeroCuenta"
              title="Número de cuenta"
            />
            <Form.Input name="nombre" title="Nombre" />
          </Form.Column>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default Bancos;
