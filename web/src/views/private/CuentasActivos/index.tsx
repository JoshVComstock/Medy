import Form from "@/components/common/form/form";
import Modal from "@/components/common/modal/modal";
import { useModal } from "@/components/common/modal/useModal";
import PageContainer from "@/components/common/pageContainer";
import TableContainer from "@/components/common/table/tableContainer";
import { useGet } from "@/components/hooks/useGet";
import { ENDPOINTS } from "@/types/enums/Endpoints";
import { CuentasActivosRes } from "@/types/res/CuentaActivos";
import { CuentasRes } from "@/types/res/CuentasRes";
import { createColumns } from "@/utils/createColumns";
import {
  CuentasAcitvosSchema,
  CuentasActivosForm,
} from "./validations/cuentasActivos";
import { useAcceso } from "@/components/hooks/useAcceso";
import { MODELOS } from "@/types/enums/Modelos";

interface Props {
  closeModalBack: () => void;
}

const CuentaActivos = ({ closeModalBack }: Props) => {
  const { state, item, openModal, closeModal } = useModal<CuentasActivosRes>(
    "Formulario de cuenta de activos"
  );
  const { canAdd, canDelete, canEdit, canView } = useAcceso(
    MODELOS.CUENTAS_ACTIVOS
  );

  const { res, pushData, modifyData, filterData, getData } = useGet<
    CuentasActivosRes[]
  >(ENDPOINTS.CUENTASACTIVOS.GET);

  const columns = createColumns<CuentasActivosRes>([
    {
      header: "Cuenta",
      accessorFn: (row) => row.contableCuenta.codigo,
    },
    {
      header: "Descripción",
      accessorFn: (row) => row.contableCuenta.descripcion,
    },
    {
      header: "Tiempo meses",
      accessorKey: "tiempo",
    },
    {
      header: "Porcentaje",
      accessorFn: (row) => `${row.montoDepreciado}%`,
    },
  ]);

  return (
    <PageContainer title="Cuentas de activos" backRoute={closeModalBack}>
      <TableContainer
        name="cuentasActivos"
        fixKey="id"
        columns={columns}
        data={res?.data}
        add={canAdd(() => openModal())}
        reports={canView}
        reload={getData}
        controls={[{ label: "Modificar", fn: (row) => openModal(row) }]}
      />
      <Modal state={state}>
        <Form<CuentasActivosRes, CuentasActivosForm>
          item={item}
          initialValues={{
            idContableCuenta: item?.idContableCuenta || "",
            montoDepreciado: item?.montoDepreciado || "",
            tiempo: item?.tiempo || "",
          }}
          validationSchema={CuentasAcitvosSchema}
          post={{
            route: ENDPOINTS.CUENTASACTIVOS.POST,
            onBody: (value) => value,
            onSuccess: (data) => {
              pushData(data);
              closeModal();
            },
          }}
          put={
            item
              ? canEdit({
                  route: ENDPOINTS.CUENTASACTIVOS.PUT + item?.id,
                  onBody: (value) => value,
                  onSuccess: (data) => {
                    modifyData(data, (value) => value.id === data.id);
                    closeModal();
                  },
                })
              : undefined
          }
          del={
            item
              ? canDelete({
                  route: ENDPOINTS.CUENTASACTIVOS.DELETE + item?.id,
                  onSuccess: (data) => {
                    filterData((value) => value.id !== data.id);
                    closeModal();
                  },
                })
              : undefined
          }
        >
          <Form.Column>
            <Form.Select<CuentasRes>
              name="idContableCuenta"
              title="Cuenta"
              route={ENDPOINTS.CUENTAS.GETMAYOR}
              optionValueKey="id"
              optionTextFn={(item) => `${item.codigo} - ${item.descripcion}`}
              placeholder="Seleccione una cuenta"
              searchable
            />
            <Form.Input name="tiempo" title="Tiempo meses" type="number" />
            <Form.Input
              name="montoDepreciado"
              title="Monto depreciado %"
              type="number"
            />
          </Form.Column>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default CuentaActivos;
