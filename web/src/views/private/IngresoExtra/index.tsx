import PageContainer from "../../../components/common/pageContainer";
import TableContainer from "../../../components/common/table/tableContainer";
import Modal from "../../../components/common/modal/modal";
import Form from "../../../components/common/form/form";
import { createColumns } from "../../../utils/createColumns";
import { useGet } from "../../../components/hooks/useGet";
import { useModal } from "../../../components/common/modal/useModal";

import {
  IngresoExtraForm,
  ingresoExtraSchema,
} from "./validations/ingresoExtra";

import { ENDPOINTS } from "../../../types/enums/Endpoints";
import { useAcceso } from "@/components/hooks/useAcceso";
import { MODELOS } from "@/types/enums/Modelos";
import ingresoExtraRes from "./interfaces/ingresoExtraRes";
const IngresoExtra = () => {
  const { res, pushData, modifyData, filterData, getData } = useGet<
    ingresoExtraRes[]
  >(ENDPOINTS.INGRESOEXTRA.GET);
  const { state, item, openModal, closeModal } = useModal<ingresoExtraRes>(
    "Formulario ingreso extra"
  );
  const { canAdd, canDelete, canEdit, canModify, canView } = useAcceso(
    MODELOS.EFECTIVO
  );
  const columns = createColumns<ingresoExtraRes>([
    {
      header: "Nro de Venta",
      accessorKey: "nroDeVenta",
    },
    {
      header: "Cajero",
      accessorKey: "cajera",
    },
    {
      header: "Descripcion",
      accessorKey: "descripcion",
    },
    {
      header: "Recibo",
      accessorKey: "recibo",
    },
    {
      header: "Factura",
      accessorKey: "factura",
    },
    {
      header: "Tipo ingreso",
      accessorKey: "tipoIngreso",
    },
    {
      header: "Monto",
      accessorKey: "monto",
    },
  ]);

  return (
    <PageContainer title="Ingreso extra" >
      <TableContainer
        name="Ingreso extra"
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
        <Form<ingresoExtraRes, IngresoExtraForm>
          item={item}
          initialValues={{
            nroDeVenta: item?.nroDeVenta || "",
            descripcion: item?.descripcion || "",
            recibo: item?.recibo || "",
            factura: item?.factura || "",
            tipoIngreso: item?.tipoIngreso || "",
            monto: item?.monto || "",
          }}
          validationSchema={ingresoExtraSchema}
          post={{
            route: ENDPOINTS.INGRESOEXTRA.POST,
            onBody: (value) => value,
            onSuccess: (data) => {
              pushData(data);
              closeModal();
            },
          }}
          put={canEdit({
            route: ENDPOINTS.INGRESOEXTRA.PUT + item?.id,
            onBody: (value) => value,
            onSuccess: (data) => {
              modifyData(data, (value) => value.id === data.id);
              closeModal();
            },
          })}
          del={canDelete({
            route: ENDPOINTS.INGRESOEXTRA.DELETE + item?.id,
            onSuccess: (data) => {
              filterData((value) => value.id !== data.id);
              closeModal();
            },
          })}
        >
          <Form.Column>
            <Form.Input name="nroDeVenta" title="Numero de venta" />
            <Form.Input name="descripcion" title="Descripción" />
            <Form.Input name="recibo" title="Recibo" />
            <Form.Input name="factura" title="Factura" />
            <Form.Select
              name="tipoIngreso"
              title="Tipo Ingreso"
              placeholder="Seleccione el tipo ingreso"
            >
              <Form.Option value="QR">QR</Form.Option>
              <Form.Option value="Efectivo">Efectivo</Form.Option>
              <Form.Option value="Deposito">Deposito </Form.Option>
            </Form.Select>
            <Form.Input name="monto" title="Monto" />
          </Form.Column>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default IngresoExtra;
