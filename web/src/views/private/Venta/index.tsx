import PageContainer from "../../../components/common/pageContainer";
import TableContainer from "../../../components/common/table/tableContainer";
import { createColumns } from "../../../utils/createColumns";
import { useGet } from "../../../components/hooks/useGet";
import { useModal } from "../../../components/common/modal/useModal";
import { ENDPOINTS } from "../../../types/enums/Endpoints";
import { VentaOrdenRes } from "@/types/res/VentaOrdenRes";
import Floating from "@/components/common/floating/floating";
import VentaOrdenFormulario from "./components/VentaOrdenForm";
const VentaOrden = () => {
  const { res, getData } = useGet<
    VentaOrdenRes[]
  >(ENDPOINTS.VENTAORDEN.GET);
  const { state, openModal, closeModal } =
    useModal<VentaOrdenRes>("Formulario venta");
    
    const columns = createColumns<VentaOrdenRes>([
      {
        header: "Código de Orden",
        accessorKey: "codigoOrden",
      },
      {
        header: "Estado de orden",
        accessorKey: "estadoOrden",
      },
      {
        header: "Nota",
        accessorKey: "nota",
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
        header: "Almacén",
        accessorKey: "idAlmacen",
      },
      {
        header: "Cliente",
        accessorKey: "idCliente",
      },
      {
        header: "Precio",
        accessorKey: "idPrecio",
      },
      {
        header: "Términos de Pago",
        accessorKey: "idTerminosPago",
      },
      {
        header: "Monto Impago",
        accessorKey: "montoImpago",
      },
      {
        header: "TC",
        accessorKey: "tc",
      },
      {
        header: "Fecha validez",
        accessorKey: "fechaValidez",
      },
      {
        header: "Toker",
        accessorKey: "toker",
      },
    ]);
    

  return (
    <PageContainer title="Venta">
      <TableContainer
        name="venta"
        columns={columns}
        fixKey="id"
        data={res?.data}
        add={() => openModal()}
        reload={getData}
      />
     <Floating width="1200px" state={state}>
        <PageContainer title="Formulario de ventas" backRoute={closeModal}>
          <VentaOrdenFormulario
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

export default VentaOrden;
