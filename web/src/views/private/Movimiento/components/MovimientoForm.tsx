import { ENDPOINTS } from "@/types/enums/Endpoints";
import Form from "@/components/common/form/form";
import { movimientoSchema, MovimientoForm } from "../validations/movimiento";
import { useState } from "react";
import { EmpresaRes } from "@/types/res/EmpresaRes";
import { MovimientoRes } from "@/types/res/movimientoRes";
import { MovimientoDetalleRes } from "@/types/res/movimientoDetalleRes";
import MovimientoDetalles from "../../MovimientoDetalle";
import { TipoMovimientoRes } from "@/types/res/TipoMovimientoRes";
interface Props {
  item: MovimientoRes | null;
  onSuccessPost: (data: MovimientoRes) => void;
  onSuccessPut: (data: MovimientoRes) => void;
  onSuccessDelete: (data: MovimientoRes) => void;
  canEdit: <T>(data: T) => T | undefined;
  canDelete: <T>(data: T) => T | undefined;
  disabled?: boolean;
}
const MovimientoFormulario = ({
  item,
  onSuccessPost,
  onSuccessPut,
  onSuccessDelete,
  canEdit,
  canDelete,
  disabled = false,
}: Props) => {
  const [movimientoDetalle, setMovimientoDetalle] = useState<
    MovimientoDetalleRes[]
  >(
    item?.movimientoDetalle
      ? item.movimientoDetalle.map((e) => ({
          id: e.id,
          cantidad: e.cantidad,
          ciclo: e.ciclo,
          fecha: e.fecha,
          idEmpresa: e.idEmpresa,
          idTipoEfectivo: e.idTipoEfectivo,
          idTipoMovimiento: e.idTipoMovimiento,
          montoNumerico: e.montoNumerico
        }))
      : []
  );
  return (
    <Form<MovimientoRes, MovimientoForm>
      item={item}
      initialValues={{
        idEmpresa: item?.idEmpresa || "",
        idTipoMovimiento: item?.idTipoMovimiento || "",
        descripcion: item?.descripcion || "",
        monto: item?.monto || "",
      }}
      validationSchema={movimientoSchema}
      post={{
        route: ENDPOINTS.MOVIMIENTO.POST,
        onSuccess: onSuccessPost,
        onBody: (body) => {
          return { ...body, movimientoDetalle };
        },
      }}
      disabled={disabled}
      debug
      put={canEdit({
        route: ENDPOINTS.MOVIMIENTO.PUT + item?.id,
        onBody: (body) => {
          return { ...body, movimientoDetalle };
        },
        onSuccess: onSuccessPut,
      })}
      del={canDelete({
        route: ENDPOINTS.MOVIMIENTO.DELETE + item?.id,
        onSuccess: onSuccessDelete,
      })}
    >
      <Form.Section title="Datos generales" row expandable>
        <Form.Column>
          <Form.Select<TipoMovimientoRes>
            name="idTipoMovimiento"
            optionTextKey="nombre"
            title="Tipo movimiento"
            route={ENDPOINTS.TIPOMOVIMIENTO.GET}
            optionValueKey="id"
            placeholder="Seleccione un tipo movimiento"
          />
          <Form.Select<EmpresaRes>
            name="idEmpresa"
            title="Empresa"
            optionTextKey="nombre"
            route={ENDPOINTS.EMPRESA.GET}
            optionValueKey="id"
            placeholder="Seleccione un empresa"
          />
          <Form.Input name="descripcion" title="Descripcion" />
          <Form.Input name="monto" title="Monto" />
        </Form.Column>
      </Form.Section>
      <MovimientoDetalles
        movimientoDetalle={movimientoDetalle}
        setMovimientoDetalle={setMovimientoDetalle}
      />
    </Form>
  );
};

export default MovimientoFormulario;
