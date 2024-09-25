import TableContainer from "../../../components/common/table/tableContainer";
import Modal from "../../../components/common/modal/modal";
import Form from "../../../components/common/form/form";
import { createColumns } from "../../../utils/createColumns";
import { useModal } from "../../../components/common/modal/useModal";
import {
  CompraOrdenDetalleForm,
  compraOrdenDetalleSchema,
} from "./validations/compraOrdeDetalle";
import { ENDPOINTS } from "../../../types/enums/Endpoints";
import { CompraOrdenDetalleInfoRes, CompraOrdenDetalleRes } from "@/types/res/CompraOrden";
import { ProductoRes } from "@/types/res/ProductoRes";
import React from "react";
import Button from "@/components/common/button/button";
import { MonedaRes } from "@/types/res/MonedaRes";
import UnidadMedidaRes from "@/types/res/UnidadMedida";

interface Props {
  compraOrdenDetalle: CompraOrdenDetalleRes[];
  setCompraOrdenDetalle: React.Dispatch<
    React.SetStateAction<CompraOrdenDetalleRes[]>
  >;
}
const CompraOrdenDetalle = ({
  setCompraOrdenDetalle,
  compraOrdenDetalle,
}: Props) => {
  const { state, item, openModal, closeModal } =
    useModal<CompraOrdenDetalleRes>("Formulario productos");
  const handleAddToCart = (values: CompraOrdenDetalleForm) => {
    setCompraOrdenDetalle([...compraOrdenDetalle, values]);
    closeModal();
  };

  const columns = createColumns<CompraOrdenDetalleInfoRes>([
    {
      header: "Producto",
      accessorKey: "producto",
      
    },
    {
      header: "Nombre",
      accessorKey: "nombre",
    },
    {
      header: "Moneda",
      accessorKey:"moneda"
    },
    {
      header: "Unidad de medida",
      accessorKey: "unidadMedida",
      
    },
    {
      header: "Cantidad",
      accessorKey: "cantidad",
    },
    {
      header: "Precio Unitario",
      accessorKey: "precioUnitario",
    },
    {
      header: "Precio Subtotal",
      accessorKey: "precioSubtotal",
    },
    {
      header: "Precio Total",
      accessorKey: "precioTotal",
    },
    {
      header: "Precio de Impuesto",
      accessorKey: "precioImpuesto",
    },
    {
      header: "Cantidad Solicitada",
      accessorKey: "cantidadSolicitada",
    },
    {
      header: "Cantidad Recibida",
      accessorKey: "cantidadRecibida",
    },
    {
      header: "Cantidad de Paquete",
      accessorKey: "cantidadPaquete",
    },
    {
      header: "Fecha Esperada",
      accessorKey: "fechaEsperada",
    },
  ]);

  return (
    <Form.Section title="Detalles de la compra">
      <TableContainer
        name="compraOrdenDetalle"
        columns={columns}
        data={compraOrdenDetalle}
        add={() => openModal()}
        reports={false}
      />
      <Modal state={state}>
        <Form<CompraOrdenDetalleRes, CompraOrdenDetalleForm>
          item={item}
          initialValues={{
            idProducto: item?.idProducto || "",
            idUnidadMedida: item?.idUnidadMedida || "",
            idMoneda: item?.idMoneda || "",
            idEmpaquetado: item?.idEmpaquetado || "",
            nombre: item?.nombre || "",
            cantidad: item?.cantidad || "",
            precioUnitario: item?.precioUnitario || "",
            precioSubtotal: item?.precioSubtotal || "",
            precioTotal: item?.precioTotal || "",
            precioImpuesto: item?.precioImpuesto || "",
            cantidadSolicitada: item?.cantidadSolicitada || "",
            cantidadRecibida: item?.cantidadRecibida || "",
            cantidadPaquete: item?.cantidadPaquete || "",
            fechaEsperada: item?.fechaEsperada || "",
          }}
          validationSchema={compraOrdenDetalleSchema}
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
            <Form.Select<UnidadMedidaRes>
              name="idUnidadMedida"
              title="Unidad de medida"
              route={ENDPOINTS.RMUNIDADMEDIDA.GET}
              optionTextKey="nombre"
              optionValueKey="id"
              placeholder="Seleccione una medida"
            />
            <Form.Select<MonedaRes>
              name="idMoneda"
              title="Moneda"
              route={ENDPOINTS.MONEDA.GET}
              optionTextKey="nombre"
              optionValueKey="id"
              placeholder="Seleccione una moneda"
            />
            <Form.Input name="idEmpaquetado" title="Empaquetado" />
            <Form.Input name="cantidad" title="Cantidad" />
            <Form.Input name="precioUnitario" title="Precio Unitario" />
            <Form.Input name="precioSubtotal" title="Precio Subtotal" />
            <Form.Input name="precioTotal" title="Precio Total" />
            <Form.Input name="precioImpuesto" title="Precio de Impuesto" />
            <Form.Input name="cantidadSolicitada" title="Cantidad Solicitada" />
            <Form.Input name="cantidadRecibida" title="Cantidad Recibida" />
            <Form.Input name="cantidadPaquete" title="Cantidad de Paquete" />
            <Form.Input
              type="date"
              name="fechaEsperada"
              title="Fecha Esperada"
            />
          </Form.Column>
        </Form>
      </Modal>
    </Form.Section>
  );
};

export default CompraOrdenDetalle;
