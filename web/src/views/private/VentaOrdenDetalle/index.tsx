import TableContainer from "../../../components/common/table/tableContainer";
import Modal from "../../../components/common/modal/modal";
import Form from "../../../components/common/form/form";
import { createColumns } from "../../../utils/createColumns";
import { useModal } from "../../../components/common/modal/useModal";
import {
  VentaOrdenDetalleForm,
  ventaOrdenDetalleSchema,
} from "./validations/ventaOrdeDetalle";
import { ENDPOINTS } from "../../../types/enums/Endpoints";
import { VentaOrdenDetalleRes } from "@/types/res/VentaOrdenDetalleRes";
import { ProductoRes } from "@/types/res/ProductoRes";
import React from "react";
import Button from "@/components/common/button/button";
import { MonedaRes } from "@/types/res/MonedaRes";
import UnidadMedidaRes from "@/types/res/UnidadMedida";

interface Props {
  ventaOrdenDetalle: VentaOrdenDetalleRes[];
  setventaOrdenDetalle: React.Dispatch<
    React.SetStateAction<VentaOrdenDetalleRes[]>
  >;
}
const ventaOrdenDetalle = ({
  setventaOrdenDetalle,
  ventaOrdenDetalle,
}: Props) => {
  const { state, item, openModal, closeModal } = useModal<VentaOrdenDetalleRes>(
    "Formulario producto"
  );
  const handleAddToCart = (values: VentaOrdenDetalleForm) => {
    setventaOrdenDetalle([...ventaOrdenDetalle, values]);
    closeModal();
  };

  const columns = createColumns<VentaOrdenDetalleRes>([
    {
      header: "ID de Producto",
      accessorKey: "idProducto",
    },
    {
      header: "Nombre",
      accessorKey: "nombre",
    },
    {
      header: "Estado orden",
      accessorKey: "estadoOrden",
    },
    {
      header: "Estado factura",
      accessorKey: "estadoFacturacion",
    },
    {
      header: "Codigo interno",
      accessorKey: "codigoInterno",
    },
    {
      header: "Cantidad",
      accessorKey: "cantidad",
    },
    {
      header: "Precio unitario",
      accessorKey: "precioUnitario",
    },
    {
      header: "Descuento",
      accessorKey: "descuento",
    },
    {
      header: "Precio reducido",
      accessorKey: "precioReducido",
    },
    {
      header: "Precio impuesto",
      accessorKey: "precioImpuesto",
    },
    {
      header: "Precio con impuesto",
      accessorKey: "precioUnitConImpuesto",
    },
    {
      header: "Precio sin impuesto",
      accessorKey: "precioUnitSinImpuesto",
    },{
      header: "Total con impuesto",
      accessorKey: "subtotalConImpuesto",
    },{
      header: "Total Con impuesto",
      accessorKey: "subtotalSinImpuesto",
    },{
      header: "Cantidad enviada",
      accessorKey: "cantidadEnviada",
    },{
      header: "Tiempo de espera",
      accessorKey: "tiempoEspera",
    },
  ]);

  return (
    <Form.Section title="Detalles de la venta">
      <TableContainer
        name="ventaOrdenDetalle"
        columns={columns}
        data={ventaOrdenDetalle}
        add={() => openModal()}
        reports={false}
      />
      <Modal state={state}>
        <Form<VentaOrdenDetalleRes, VentaOrdenDetalleForm>
          item={item}
          initialValues={{
            idProducto: item?.idProducto || "",
            idUnidadMedida: item?.idUnidadMedida,
            idMoneda: item?.idMoneda || "",
            idEmpaquetado: 1,
            nombre: item?.nombre || "",
            cantidad: item?.cantidad || "",
            precioUnitario: item?.precioUnitario || "",
            cantidadEnviada: item?.cantidadEnviada || "",
            codigoInterno: item?.codigoInterno || "",
            descuento: item?.descuento || "",
            estadoFacturacion: item?.estadoFacturacion || "",
            estadoOrden: item?.estadoOrden || "",
            precioImpuesto: item?.precioImpuesto || "",
            precioReducido: item?.precioReducido || "",
            precioUnitConImpuesto: item?.precioUnitConImpuesto || "",
            precioUnitSinImpuesto: item?.precioUnitSinImpuesto || "",
            secuencia: 1,
            subtotalConImpuesto: item?.subtotalConImpuesto || "",
            subtotalSinImpuesto: item?.subtotalSinImpuesto || "",
            tiempoEspera: item?.tiempoEspera || "",
          }}
          validationSchema={ventaOrdenDetalleSchema}
          post={handleAddToCart}
          button={(_, handleSubmit) => (
            <Button type="button" onClick={handleSubmit}>
              Agregar al carrito
            </Button>
          )}
        >
          <Form.Column>
            <Form.Input name="nombre" title="Nombre" />
            <Form.Select<ProductoRes>
              name="idProducto"
              title="Producto"
              route={ENDPOINTS.PRODUCTO.GET}
              optionTextFn={(row) =>
                row.nombre +
                (row.atributos.length
                  ? ": " + row.atributos.map((x) => x.nombre).join(", ")
                  : "")
              }
              optionValueKey="id"
              placeholder="Seleccione un producto"
            />
            <Form.Select<MonedaRes>
            name="idMoneda"
            title="Moneda"
            optionTextKey="nombre"
            route={ENDPOINTS.MONEDA.GET}
            optionValueKey="id"
            placeholder="Seleccione un moneda"
          />
          <Form.Select<UnidadMedidaRes>
            name="idUnidadMedida"
            title="Unidad medida"
            optionTextKey="nombre"
            route={ENDPOINTS.RMUNIDADMEDIDA.GET}
            optionValueKey="id"
            placeholder="Seleccione un medida"
          />
            <Form.Input name="cantidad" title="Cantidad" />
            <Form.Input name="precioUnitario" title="Precio Unitario" />
            <Form.Input name="cantidadEnviada" title="Cantidad enviada" />
            <Form.Input name="codigoInterno" title="Codigo interno" />
            <Form.Input name="descuento" title="Descuento" />
            <Form.Input name="estadoFacturacion" title="Estado facturacion" />
            <Form.Input name="estadoOrden" title="Estado orden" />
            <Form.Input name="precioImpuesto" title="Precio impuesto" />
            <Form.Input name="precioReducido" title="Precio reducido" />
            <Form.Input
              name="precioUnitConImpuesto"
              title="Precio con impuesto"
            />
            <Form.Input
              name="precioUnitSinImpuesto"
              title="Precio sin impuesto"
            />
            <Form.Input name="subtotalConImpuesto" title="Total con impuesto" />
            <Form.Input name="subtotalSinImpuesto" title="Total sin impuesto" />
            <Form.Input name="tiempoEspera" title="Tiempo espera" />
          </Form.Column>
        </Form>
      </Modal>
    </Form.Section>
  );
};

export default ventaOrdenDetalle;
