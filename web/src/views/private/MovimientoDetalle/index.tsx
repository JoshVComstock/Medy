import TableContainer from "../../../components/common/table/tableContainer";
import Modal from "../../../components/common/modal/modal";
import Form from "../../../components/common/form/form";
import { createColumns } from "../../../utils/createColumns";
import { useModal } from "../../../components/common/modal/useModal";
import {
  movimientoDetalleSchema,
  MovimientoDetalleForm,
} from "./validations/movimientoDetalle";
import { ENDPOINTS } from "../../../types/enums/Endpoints";
import { MovimientoDetalleRes } from "@/types/res/movimientoDetalleRes";
import React from "react";
import Button from "@/components/common/button/button";
import { EmpresaRes } from "@/types/res/EmpresaRes";
import { TipoMovimientoRes } from "@/types/res/TipoMovimientoRes";

interface Props {
  movimientoDetalle: MovimientoDetalleRes[];
  setMovimientoDetalle: React.Dispatch<
    React.SetStateAction<MovimientoDetalleRes[]>
  >;
}
const MovimientoDetalles = ({
  setMovimientoDetalle,
  movimientoDetalle,
}: Props) => {
  const { state, openModal, closeModal, item } =
    useModal<MovimientoDetalleRes>("Formulario movimiento");
  const handleAddToCart = (values: MovimientoDetalleForm) => {
    const id = movimientoDetalle.length + 1;
    const newValues = { ...values, id: id.toString() };
    setMovimientoDetalle([...movimientoDetalle, newValues]);
    closeModal();
  };
  const handleDeleteFromCart = (id: string) => {
    const updatedMovimientoDetalle = movimientoDetalle.filter(
      (detalle) => detalle.id !== id
    );
    setMovimientoDetalle(updatedMovimientoDetalle);
  };
  const columns = createColumns<MovimientoDetalleRes>([
   
    {
      header: "Empresa",
      accessorKey: "idEmpresa",
    },
    {
      header: "Fecha",
      accessorKey: "fecha",
    },
    {
      header: "Tipo efectivo",
      accessorKey: "idTipoEfectivo",
    },
    {
      header: "Cantidad",
      accessorKey: "cantidad",
    },
    {
      header: "Monto numerico",
      accessorKey: "montoNumerico",
    },
    {
      header: "Tipo movimiento",
      accessorKey: "idTipoMovimiento",
    },
    {
      header: "Ciclo",
      accessorKey: "ciclo",
    },
  ]);

  return (
    <Form.Section title="Detalle de movimiento">
      <TableContainer
        name="movimientoDetalle"
        columns={columns}
        data={movimientoDetalle}
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
        <Form<MovimientoDetalleRes, MovimientoDetalleForm>
          item={item}
          initialValues={{
            cantidad: item?.cantidad || "",
            ciclo: item?.ciclo || "",
            fecha: item?.fecha || "",
            idEmpresa: item?.idEmpresa || "",
            idTipoEfectivo: 1,
            idTipoMovimiento: item?.idTipoMovimiento || "",
            montoNumerico: item?.montoNumerico || "",
          }}
          validationSchema={movimientoDetalleSchema}
          post={handleAddToCart}
          button={(_, handleSubmit) => (
            <Button type="button" onClick={handleSubmit}>
              Agregar al carrito
            </Button>
          )}
        >
          <Form.Column>
            <Form.Select<EmpresaRes>
              name="idEmpresa"
              title="Empresa"
              optionTextKey="nombre"
              route={ENDPOINTS.EMPRESA.GET}
              optionValueKey="id"
              placeholder="Seleccione una empresa"
            />
            <Form.Select<TipoMovimientoRes>
              name="idTipoMovimiento"
              title="Tipo movimiento"
              optionTextKey="nombre"
              route={ENDPOINTS.TIPOMOVIMIENTO.GET}
              optionValueKey="id"
              placeholder="Seleccione un tipo movimiento"
            />
            <Form.Input type="date" name="fecha" title="Fecha" />
            <Form.Input type="number" name="cantidad" title="Cantidad" />
            <Form.Input
              type="number"
              name="montoNumerico"
              title="Monto numerico"
            />
            <Form.Input type="number" name="ciclo" title="Ciclo" />
           </Form.Column>
        </Form>
      </Modal>
    </Form.Section>
  );
};

export default MovimientoDetalles;
