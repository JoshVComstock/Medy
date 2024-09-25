import TableContainer from "../../../components/common/table/tableContainer";
import Modal from "../../../components/common/modal/modal";
import Form from "../../../components/common/form/form";
import { createColumns } from "../../../utils/createColumns";
import { useModal } from "../../../components/common/modal/useModal";
import {
  tarifaDetalleSchema,
  TarifaDetalleForm,
} from "./validations/tarifaDetalle";
import { ENDPOINTS } from "../../../types/enums/Endpoints";
import { TarifaDetalleRes } from "@/types/res/TarifaDetalleRes";
import { ProductoRes } from "@/types/res/ProductoRes";
import React from "react";
import Button from "@/components/common/button/button";
import { MonedaRes } from "@/types/res/MonedaRes";
import { ProductoBaseRes } from "@/types/res/ProductoBaseRes";
import { ProductoCategoriaRes } from "@/types/res/ProductoCategoriaRes";

interface Props {
  tarifaDetalle: TarifaDetalleRes[];
  setTarifaDetalle: React.Dispatch<React.SetStateAction<TarifaDetalleRes[]>>;
}
const TarifaDetalles = ({ setTarifaDetalle, tarifaDetalle }: Props) => {
  const { state, openModal, closeModal, item } =
    useModal<TarifaDetalleRes>("Formulario tarifa");
  const handleAddToCart = (values: TarifaDetalleForm) => {
    const id = tarifaDetalle.length + 1;
    const newValues = { ...values, id: id.toString() };
    setTarifaDetalle([...tarifaDetalle, newValues]);
    closeModal();
  };
  const handleDeleteFromCart = (id: string) => {
    const updatedTarifaDetalle = tarifaDetalle.filter(
      (detalle) => detalle.id !== id
    );
    setTarifaDetalle(updatedTarifaDetalle);
  };
  const columns = createColumns<TarifaDetalleRes>([
    {
      header: "Moneda",
      accessorKey: "moneda",
    },
    {
      header: "Categoria",
      accessorKey: "categoria",
    },
    {
      header: "Producto base",
      accessorKey: "productoBase",
    },
    {
      header: "Producto",
      accessorKey: "producto",
    },
    {
      header: "Precio computable",
      accessorKey: "precioComputable",
    },
    {
      header: "Precio fijo",
      accessorKey: "precioFijo",
    },
    {
      header: "Descuento",
      accessorKey: "descuento",
    },
    {
      header: "Aplicado",
      accessorKey: "aplicadoEn",
    },
    {
      header: "Cantidad minima",
      accessorKey: "cantidadMin",
    },
    {
      header: "Fecha inicio",
      accessorKey: "fechaInicio",
    },
    {
      header: "Fecha final",
      accessorKey: "fechaFin",
    },
  ]);

  return (
    <Form.Section title="Detalles de tarifa">
      <TableContainer
        name="tarifaDetalle"
        columns={columns}
        data={tarifaDetalle}
        add={() => openModal()}
        reports={false}
        controls={[
          {
            label: "Eliminar",
            fn: (row) => handleDeleteFromCart(row.id),
          },
        ]}
      />
      <Modal state={state}>
        <Form<TarifaDetalleRes, TarifaDetalleForm>
          item={item}
          initialValues={{
            idProducto: item?.idProducto || "",
            idMoneda: item?.idMoneda || "",
            idProductoBase: item?.idProductoBase || "",
            idProductoCategoria: item?.idProductoCategoria || "",
            descuento: item?.descuento || "",
            aplicadoEn: item?.aplicadoEn || "",
            cantidadMin: item?.cantidadMin || "",
            fechaFin: item?.fechaFin || "",
            fechaInicio: item?.fechaInicio || "",
            precioComputable: item?.precioComputable || "",
            precioFijo: item?.precioFijo || "",
          }}
          validationSchema={tarifaDetalleSchema}
          post={handleAddToCart}
          button={(_, handleSubmit) => (
            <Button type="button" onClick={handleSubmit}>
              Agregar al carrito
            </Button>
          )}
        >
          <Form.Column>
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
            <Form.Select<ProductoBaseRes>
              name="idProductoBase"
              title="Producto Base"
              optionTextKey="nombre"
              route={ENDPOINTS.PRODUCTOBASE.GET}
              optionValueKey="id"
              placeholder="Seleccione un producto"
            />
            <Form.Select<ProductoCategoriaRes>
              name="idProductoCategoria"
              title="Producto categoria"
              optionTextKey="nombre"
              route={ENDPOINTS.PRODUCTOCATEGORIA.GET}
              optionValueKey="id"
              placeholder="Seleccione un categoria"
            />
            <Form.Input name="precioComputable" title="Precio computable" />
            <Form.Input type="number" name="precioFijo" title="Precio fijo" />
            <Form.Input name="descuento" title="Descuento" />
            <Form.Input name="aplicadoEn" title="Aplicado" />
            <Form.Input
              type="number"
              name="cantidadMin"
              title="Cantidad minima"
            />
            <Form.Input type="date" name="fechaInicio" title="Fecha inicio" />
            <Form.Input type="date" name="fechaFin" title="Fecha fin" />
          </Form.Column>
        </Form>
      </Modal>
    </Form.Section>
  );
};

export default TarifaDetalles;
