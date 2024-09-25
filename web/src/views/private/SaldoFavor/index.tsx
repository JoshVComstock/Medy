import PageContainer from "../../../components/common/pageContainer";
import TableContainer from "../../../components/common/table/tableContainer";
import Modal from "../../../components/common/modal/modal";
import Form from "../../../components/common/form/form";
import { createColumns } from "../../../utils/createColumns";
import { useGet } from "../../../components/hooks/useGet";
import { useModal } from "../../../components/common/modal/useModal";
import { SaldoFavorForm, saldoFavorSchema } from "./validations/saldoFavor";
import { ENDPOINTS } from "../../../types/enums/Endpoints";
import { useAcceso } from "@/components/hooks/useAcceso";
import { MODELOS } from "@/types/enums/Modelos";
import saldoFavorRes from "./interfaces/saldoFavorRes";
import { VentaOrdenRes } from "@/types/res/VentaOrdenRes";
import { useState } from "react";
const SaldoFavor = () => {
  const { res, pushData, modifyData, filterData, getData } = useGet<
    saldoFavorRes[]
  >(ENDPOINTS.SALDOFAVOR.GET);
  const { state, item, openModal, closeModal } = useModal<saldoFavorRes>(
    "Formulario saldo a favor"
  );
  const [idVenta, setIdVenta] = useState(0);
  const { canAdd, canDelete, canEdit, canModify, canView } = useAcceso(
    MODELOS.SALDOFAVOR
  );
  const { res: Venta } = useGet<VentaOrdenRes>(
    ENDPOINTS.VENTAORDEN.FIND + idVenta
  );
  const columns = createColumns<saldoFavorRes>([
    {
      header: "Nro de venta",
      accessorKey: "idVenta",
    },
    {
      header: "Descripcion",
      accessorKey: "descripcion",
    },
    {
      header: "Total a Favor",
      accessorKey: "totalFavor",
    },
  ]);

  return (
    <PageContainer title="Saldo a favor">
      <TableContainer
        name="Saldo a favor"
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
        <Form<saldoFavorRes, SaldoFavorForm>
          item={item}
          initialValues={{
            descripcion: item?.Descripcion,
            idVenta: item?.IdVenta,
            totalFavor: item?.TotalFavor,
          }}
          validationSchema={saldoFavorSchema}
          post={{
            route: ENDPOINTS.SALDOFAVOR.POST,
            onBody: (value) => value,
            onSuccess: (data) => {
              pushData(data);
              closeModal();
            },
          }}
          put={canEdit({
            route: ENDPOINTS.SALDOFAVOR.PUT + item?.id,
            onBody: (value) => value,
            onSuccess: (data) => {
              modifyData(data, (value) => value.id === data.id);
              closeModal();
            },
          })}
          del={canDelete({
            route: ENDPOINTS.SALDOFAVOR.DELETE + item?.id,
            onSuccess: (data) => {
              filterData((value) => value.id !== data.id);
              closeModal();
            },
          })}
        >
          <Form.Column>
            <Form.Input name="totalFavor" title="Total a favor" />
            <Form.Input name="descripcion" title="Observacion" />
            <Form.Select<VentaOrdenRes>
              name="idVenta"
              title="Nro de venta"
              optionTextKey="codigoOrden"
              route={ENDPOINTS.VENTAORDEN.GET}
              optionValueKey="id"
              placeholder="Seleccione un venta"
            />
            <Form.Detail>
              {(values) => {
                setIdVenta(values.idVenta);
                var data=Venta;
                console.log(data);
                console.log(values.idVenta);
                console.log(Venta);
                return <div>
                 <label htmlFor="">{data?.data.montoTotal}</label>
                </div>;
              }}
            </Form.Detail>
            <label className="text-sm ml-2 font-semibold text-gray-700 dark:text-white">
              Monto total :{Venta?.data.montoTotal}
            </label>
            <br />
            <label className="text-sm ml-2 font-semibold text-gray-700 dark:text-white">
              Descuento :{Venta?.data.montoSinImpuesto}
            </label>
          </Form.Column>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default SaldoFavor;
