import TableContainer from "../../../components/common/table/tableContainer";
import { useGet } from "../../../components/hooks/useGet";
import { createColumns } from "../../../utils/createColumns";
import PageContainer from "../../../components/common/pageContainer";
import { ENDPOINTS } from "../../../types/enums/Endpoints";
import { MODELOS } from "@/types/enums/Modelos";
import { useAcceso } from "@/components/hooks/useAcceso";
import { ProvinciaCartillaRes } from "@/types/res/ProvinciaCartilla";
import { useModal } from "@/components/common/modal/useModal";
import Modal from "@/components/common/modal/modal";
import Form from "../../../components/common/form/form";
import {
  ProvinciaCartillaForm,
  provinciaCartillaSchema,
} from "../ProvinciaCartilla/validations/provinciaCartilla";

const Faltantes = () => {
  const { res, getData, modifyData, pushData } = useGet<ProvinciaCartillaRes[]>(
    ENDPOINTS.MANEJOCARTILLA.GETFALTANTE
  );
  const { canView, canModify, canEdit } = useAcceso(MODELOS.PROVINCIACARTILLA);
  const { state, item, openModal, closeModal } = useModal<ProvinciaCartillaRes>(
    "Formulario de provincia hospital"
  );
  const columns = createColumns<ProvinciaCartillaRes>([
    {
      header: "Manejo",
      accessorKey: "tipoManejo",
    },
    {
      header: "Centro",
      accessorKey: "centro",
    },
    {
      header: "Entregada",
      accessorKey: "cantidadEntrega",
    },
    {
      header: "Recibida",
      accessorKey: "cantidadRecivida",
    },
    {
      header: "Codigo inicio",
      accessorKey: "codigoTarjetaInicio",
    },
    {
      header: "Codigo final",
      accessorKey: "codigoTarjetaFinal",
    },
    {
      header: "Entregado por",
      accessorKey: "entregadoPor",
    },
    {
      header: "Recibido por",
      accessorKey: "recibidoPor",
    },
    {
      header: "Telefono",
      accessorKey: "telefono",
    },
  ]);

  return (
    <PageContainer title="Faltantes">
      <TableContainer
        name="faltantes"
        fixKey="id"
        columns={columns}
        data={res?.data}
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
        <Form<ProvinciaCartillaRes, ProvinciaCartillaForm>
          item={item}
          initialValues={{
            cantidadEntrega: item?.cantidadEntrega || "",
            cantidadRecivida: item?.cantidadRecivida || 0,
            codigoTarjetaFinal: item?.codigoTarjetaFinal || "",
            codigoTarjetaInicio: item?.codigoTarjetaInicio || "",
            entregadoPor: item?.entregadoPor || "",
            idCentro: item?.idCentro || "",
            recibidoPor: item?.recibidoPor || "",
            telefono: item?.telefono || "",
            tipoManejo: "Provincia",
          }}
          validationSchema={provinciaCartillaSchema}
          put={canEdit({
            route: ENDPOINTS.MANEJOCARTILLA.PUT + item?.id,
            onBody: (value) => ({
              ...value,
            }),
            onSuccess: (data) => {
              modifyData(data, (value) => value.id === data.id);
              getData();
              closeModal();
            },
          })}
        >
          <Form.Column>
            <Form.Input
              name="cantidadEntrega"
              title="Cantidad Entregada"
              type="number"
              disabled
            />
            <Form.Input
              name="cantidadRecivida"
              title="Cantidad recibida"
              type="number"
            />
            <Form.Input
              name="codigoTarjetaFinal"
              title="Codigo de tarjeta final"
              type="number"
              disabled
            />
            <Form.Input
              name="codigoTarjetaInicio"
              title="Codigo de tarjeta inicio"
              type="number"
              disabled
            />
          </Form.Column>
          <Form.Column>
            <Form.Input name="entregadoPor" title="Entregado por" disabled />
            <Form.Input name="recibidoPor" title="Recibido por" />
            <Form.Input name="telefono" title="Telefono" />
          </Form.Column>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default Faltantes;
