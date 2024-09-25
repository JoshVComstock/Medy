import Floating from "@/components/common/floating/floating";
import { useModal } from "@/components/common/modal/useModal";
import PageContainer from "@/components/common/pageContainer";
import TableContainer from "@/components/common/table/tableContainer";
import { useAcceso } from "@/components/hooks/useAcceso";
import { MODELOS } from "@/types/enums/Modelos";
import { createColumns } from "@/utils/createColumns";
import CuentaActivos from "../CuentasActivos";
import { useGet } from "@/components/hooks/useGet";
import { InventarioContabilidadRes } from "@/types/res/InventarioContabilidad";
import { ENDPOINTS } from "@/types/enums/Endpoints";
import Modal from "@/components/common/modal/modal";
import Form from "@/components/common/form/form";
import {
  InventarioContabilidadForm,
  InventarioContabilidadSchema,
} from "./validations/inventarioContabilidad";
import { CuentasRes } from "@/types/res/CuentasRes";
import FormInput from "@/components/common/form/input/formInput";
import IconAccounting from "@assets/icons/iconAccounting";

interface Props {}

const InventarioContabilidad = ({}: Props) => {
  const { state, openModal, closeModal } = useModal<any>("Cuentas de activos");
  const {
    state: contabilidadState,
    openModal: contabilidadOpen,
    closeModal: contabilidaClose,
    item: contabilidadItem,
  } = useModal<InventarioContabilidadRes>("Inventario contabilidad");
  const { canAdd, canDelete, canEdit, canView } = useAcceso(
    MODELOS.INVENTARIO_CONTABILIDAD
  );
  const { res, pushData, modifyData, filterData, getData } = useGet<
    InventarioContabilidadRes[]
  >(ENDPOINTS.INVENTRIOCONTABILIDAD.GET);

  const columns = createColumns<InventarioContabilidadRes>([
    {
      header: "Cuenta",
      accessorFn: (row) => row.contableCuenta.codigo,
    },
    {
      header: "Descripcion cuenta",
      accessorFn: (row) => row.contableCuenta.descripcion,
    },
    {
      header: "Descripción",
      accessorKey: "descripcion",
    },
    {
      header: "Precio compra",
      accessorKey: "precioCompra",
    },
    {
      header: "Feche compra",
      accessorKey: "fechaCompra",
    },
    {
      header: "Fecha inicio deprecioación",
      accessorKey: "fechaIniDepreciacion",
    },
    {
      header: "Valor total depreciación",
      accessorKey: "valTotDeprec",
    },
  ]);

  return (
    <PageContainer title="Inventario">
      <TableContainer
        name="inventarioContabilidad"
        fixKey="id"
        columns={columns}
        data={res?.data}
        reports={canView}
        add={canAdd(() => contabilidadOpen())}
        reload={getData}
        controls={[{ label: "Modificar", fn: (row) => contabilidadOpen(row) }]}
        buttons={[
          {
            title: "Cuentas de activos",
            fn: openModal,
            icon: <IconAccounting />,
          },
        ]}
      />
      <Floating width="60%" state={state}>
        <CuentaActivos closeModalBack={closeModal} />
      </Floating>
      <Modal state={contabilidadState}>
        <Form<InventarioContabilidadRes, InventarioContabilidadForm>
          item={contabilidadItem}
          initialValues={{
            descripcion: contabilidadItem?.descripcion || "",
            fechaCompra: contabilidadItem?.fechaCompra || "",
            fechaIniDepreciacion: contabilidadItem?.fechaIniDepreciacion || "",
            idContableCuenta: contabilidadItem?.idContableCuenta || "",
            precioCompra: contabilidadItem?.precioCompra || "",
          }}
          validationSchema={InventarioContabilidadSchema}
          post={{
            route: ENDPOINTS.INVENTRIOCONTABILIDAD.POST,
            onBody: (value) => value,
            onSuccess: (data) => {
              pushData(data);
              contabilidaClose();
            },
          }}
          put={
            contabilidadItem
              ? canEdit({
                  route:
                    ENDPOINTS.INVENTRIOCONTABILIDAD.PUT + contabilidadItem?.id,
                  onBody: (value) => value,
                  onSuccess: (data) => {
                    modifyData(data, (value) => value.id === data.id);
                    contabilidaClose();
                  },
                })
              : undefined
          }
          del={
            contabilidadItem
              ? canDelete({
                  route:
                    ENDPOINTS.INVENTRIOCONTABILIDAD.DELETE +
                    contabilidadItem.id,
                  onSuccess: (data) => {
                    filterData((value) => value.id !== data.id);
                    contabilidaClose();
                  },
                })
              : undefined
          }
          debug
        >
          <Form.Column>
            <Form.Select<CuentasRes>
              name="idContableCuenta"
              title="Cuenta"
              route={ENDPOINTS.CUENTAS.GETCUENTASACTIVOS}
              optionValueKey="id"
              optionTextFn={(item) => `${item.codigo} - ${item.descripcion}`}
              placeholder="Seleccione una cuenta"
              searchable
            />
            <FormInput name="descripcion" title="Descripcion" />
            <FormInput
              name="precioCompra"
              title="Precio de compra"
              type="number"
            />
            <FormInput name="fechaCompra" title="Fecha de compra" type="date" />
            <FormInput
              name="fechaIniDepreciacion"
              title="Fecha inicio depreciaón"
              type="date"
            />
          </Form.Column>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default InventarioContabilidad;
