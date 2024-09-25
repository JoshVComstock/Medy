import PageContainer from "../../../components/common/pageContainer";
import TableContainer from "../../../components/common/table/tableContainer";
import { createColumns } from "../../../utils/createColumns";
import { useGet } from "../../../components/hooks/useGet";
import { useModal } from "../../../components/common/modal/useModal";
import { ENDPOINTS } from "../../../types/enums/Endpoints";
import { CompraOrdenRes } from "@/types/res/CompraOrden";
import Floating from "@/components/common/floating/floating";
import CompraOrdenFormulario from "./components/CompraOrdenForm";
const CompraOrden = () => {
  const { res, getData } = useGet<CompraOrdenRes[]>(ENDPOINTS.COMPRAORDEN.GET);
  const { state, openModal, closeModal } =
    useModal<CompraOrdenRes>("Formulario compra");
  const columns = createColumns<CompraOrdenRes>([
    {
      header: "Código de Orden",
      accessorKey: "codOrden",
    },
    {
      header: "Moneda",
      accessorFn: (row) => row.moneda.nombre,
      meta: {
        isRelational: "moneda",
      },
    },
    {
      header: "Proveedor",
      accessorFn: (row) => row.proveedor.nombre,
      meta: {
        isRelational: "proveedor",
      },
    },
    {
      header: "Empresa",
      accessorFn: (row) => row.empresa.nombre,
      meta: {
        isRelational: "empresa",
      },
    },
    {
      header: "Estado de Compra",
      accessorKey: "estadoCompra",
    },
    {
      header: "Prioridad",
      accessorKey: "prioridad",
    },
    {
      header: "Nota",
      accessorKey: "nota",
    },
    {
      header: "Id Usuario Comprador",
      accessorKey: "idUsrComprador",
    },
    {
      header: "Monto Sin Impuesto",
      accessorKey: "montoSinImpuesto",
    },
    {
      header: "Monto de Impuesto",
      accessorKey: "montoImpuesto",
    },
    {
      header: "Monto Total",
      accessorKey: "montoTotal",
    },
    {
      header: "Fecha Límite de Pedido",
      accessorKey: "fechaLimitePedido",
    },
    {
      header: "Fecha de Confirmación",
      accessorKey: "fechaConfirmacion",
    },
    {
      header: "Fecha de Entrega Planificada",
      accessorKey: "fechaEntregaPlani",
    }
  ]);

  return (
    <PageContainer title="Compra">
      <TableContainer
        name="compra"
        columns={columns}
        fixKey="id"
        data={res?.data}
        add={() => openModal()}
        controls={[
          {
            label: "Modificar",
            fn: (row) => openModal(row),
          },
        ]}
        reload={getData}
      />
      <Floating width="1200px" state={state}>
        <PageContainer title="Formulario de compras" backRoute={closeModal}>
          <CompraOrdenFormulario
            item={null}
            onSuccessPost={() => {
              getData();
              closeModal();
            }}
          />
        </PageContainer>
      </Floating>
    </PageContainer>
  );
};

export default CompraOrden;
