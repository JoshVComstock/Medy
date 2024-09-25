import Form from "@/components/common/form/form";
import { useModal } from "@/components/common/modal/useModal";
import PageContainer from "@/components/common/pageContainer";
import TableContainer from "@/components/common/table/tableContainer";
import { useAcceso } from "@/components/hooks/useAcceso";
import { useGet } from "@/components/hooks/useGet";
import { ENDPOINTS } from "@/types/enums/Endpoints";
import { MODELOS } from "@/types/enums/Modelos";
import { RegistroGastosRes } from "@/types/res/registroGastos";
import { createColumns } from "@/utils/createColumns";
import {
  RegistroGastosForm,
  RegistroGastosSchema,
} from "./validations/registroGastos";
import Floating from "@/components/common/floating/floating";
import { formatDate } from "@/utils/date";
import { ModelMonedas } from "@/types/enums/Monedsa";

const RegistroGastos = () => {
  const { state, item, openModal, closeModal } = useModal<RegistroGastosRes>(
    "Formulario de registro de gastos"
  );
  const { canAdd, canDelete, canEdit, canView } = useAcceso(
    MODELOS.REGISTRO_DE_GASTOS
  );
  const { res, pushData, modifyData, filterData, getData } = useGet<
    RegistroGastosRes[]
  >(ENDPOINTS.REGISTROGASTOS.GET);

  const columns = createColumns<RegistroGastosRes>([
    {
      header: "Fecha",
      accessorFn: (row) => formatDate(row.fechaCreacion),
      meta: {
        filterType: "date",
      },
    },
    {
      header: "Cajero",
      accessorFn: (row) => row.usuario.login,
    },
    {
      header: "Descripcion",
      accessorKey: "descripcion",
    },
    {
      header: "Autorizado por",
      accessorKey: "autorizado",
    },
    {
      header: "Recibo",
      accessorKey: "recibo",
    },
    {
      header: "Nro. Factura",
      accessorKey: "factura",
    },
    {
      header: "Monto Bs",
      accessorKey: "montoBs",
    },
    {
      header: "Monto Sus",
      accessorKey: "montoSus",
    },
  ]);

  return (
    <PageContainer title="Registro de cuentas">
      <TableContainer
        name="registroCuentas"
        fixKey="id"
        columns={columns}
        data={res?.data}
        add={canAdd(() => openModal())}
        reports={canView}
        reload={getData}
        controls={[{ label: "Modificar", fn: (row) => openModal(row) }]}
      />
      <Floating width="55%" state={state}>
        <PageContainer
          title="Formulario registro de gastos"
          backRoute={closeModal}
        >
          <Form<RegistroGastosRes, RegistroGastosForm>
            item={item}
            initialValues={{
              autorizado: item?.autorizado || "",
              descripcion: item?.descripcion || "",
              factura: item?.factura || "",
              recibo: item?.recibo || "",
              montoBs: item?.montoBs || "",
              montoSus: item?.montoSus || "",
              moneda: item?.moneda || ModelMonedas.BS,
            }}
            validationSchema={RegistroGastosSchema}
            post={{
              route: ENDPOINTS.REGISTROGASTOS.POST,
              onBody: (value) => {
                if (value.moneda == ModelMonedas.BS) {
                  return { ...value, montoSus: null };
                }
                return { ...value, montoBs: null };
              },
              onSuccess: (data) => {
                pushData(data);
                closeModal();
              },
            }}
            put={
              item
                ? canEdit({
                    route: ENDPOINTS.REGISTROGASTOS.PUT + item?.id,
                    onBody: (value) => {
                      if (value.moneda == ModelMonedas.BS) {
                        return { ...value, montoSus: null };
                      }
                      return { ...value, montoBs: null };
                    },
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
                    route: ENDPOINTS.REGISTROGASTOS.DELETE + item?.id,
                    onSuccess: (data) => {
                      filterData((value) => value.id !== data.id);
                      closeModal();
                    },
                  })
                : undefined
            }
          >
            <Form.Column>
              <Form.Input name="descripcion" title="Descripcion" />
              <Form.Input name="autorizado" title="Autorizado por" />
              <Form.Input name="recibo" title="Recibo" />
              <Form.Input name="factura" title="Factura" />
              <Form.Select
                name="moneda"
                title="Moneda"
              >
                <Form.Option value={ModelMonedas.BS}>Bolivianos</Form.Option>
                <Form.Option value={ModelMonedas.US}>Dolares</Form.Option>
              </Form.Select>
              <Form.Detail>
                {(values) => {
                  if (values.moneda == ModelMonedas.BS) {
                    return <Form.Input name="montoBs" title="Monto Bs" />;
                  }
                  if (values.moneda == ModelMonedas.US) {
                    return <Form.Input name="montoSus" title="Monto $" />;
                  }
                }}
              </Form.Detail>
            </Form.Column>
          </Form>
        </PageContainer>
      </Floating>
    </PageContainer>
  );
};

export default RegistroGastos;
