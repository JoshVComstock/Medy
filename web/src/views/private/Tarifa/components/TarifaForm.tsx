import { ENDPOINTS } from "@/types/enums/Endpoints";
import Form from "@/components/common/form/form";
import { TarifaRes } from "@/types/res/TarifaRes";
import { TarifaForm, tarifaSchema } from "../validations/tarifa";
import { useState } from "react";
import { TarifaDetalleRes } from "@/types/res/TarifaDetalleRes";
import { MonedaRes } from "@/types/res/MonedaRes";
import { EmpresaRes } from "@/types/res/EmpresaRes";
import TarifaDetalles from "../../TarifaDetalle";
interface Props {
  item: TarifaRes | null;
  onSuccessPost: (data: TarifaRes) => void;
  onSuccessPut: (data: TarifaRes) => void;
  onSuccessDelete: (data: TarifaRes) => void;
  canEdit: <T>(data: T) => T | undefined;
  canDelete: <T>(data: T) => T | undefined;
  disabled?: boolean;
}
const TarifaFormulario = ({
  item,
  onSuccessPost,
  onSuccessPut,
  onSuccessDelete,
  canEdit,
  canDelete,
  disabled = false,
}: Props) => {
  const [tarifaDetalle, setTarifaDetalle] = useState<TarifaDetalleRes[]>(
    item?.tarifaDetalle
      ? item.tarifaDetalle.map((e) => ({
          id: e.id,
          idMoneda: e.idMoneda,
          idProducto: e.idProducto,
          idProductoCategoria: e.idProductoCategoria,
          idProductoBase: e.idProductoBase,
          precioComputable: e.precioComputable,
          precioFijo: e.precioFijo,
          descuento: e.descuento,
          aplicadoEn: e.aplicadoEn,
          cantidadMin: e.cantidadMin,
          fechaInicio: e.fechaInicio,
          fechaFin: e.fechaFin,
        }))
      : []
  );
  return (
    <Form<TarifaRes, TarifaForm>
      item={item}
      initialValues={{
        idMoneda: item?.idMoneda || "",
        idEmpresa: item?.idEmpresa || "",
        nombre: item?.nombre || "",
        politicaDescuento: item?.politicaDescuento || "",
        secuencia: 1,
      }}
      validationSchema={tarifaSchema}
      post={{
        route: ENDPOINTS.TARIFA.POST,
        onSuccess: onSuccessPost,
        onBody: (body) => {
          return { ...body, tarifaDetalle };
        },
      }}
      disabled={disabled}
      debug
      put={canEdit({
        route: ENDPOINTS.TARIFA.PUT + item?.id,
        onBody: (body) => {
          return { ...body, tarifaDetalle };
        },
        onSuccess: onSuccessPut,
      })}
      del={canDelete({
        route: ENDPOINTS.TARIFA.DELETE + item?.id,
        onSuccess: onSuccessDelete,
      })}
    >
      <Form.Section title="Datos generales" row expandable>
        <Form.Column>
          <Form.Select<MonedaRes>
            name="idMoneda"
            optionTextKey="nombre"
            title="Moneda"
            route={ENDPOINTS.MONEDA.GET}
            optionValueKey="id"
            placeholder="Seleccione un moneda"
          />
          <Form.Select<EmpresaRes>
            name="idEmpresa"
            title="Empresa"
            optionTextKey="nombre"
            route={ENDPOINTS.EMPRESA.GET}
            optionValueKey="id"
            placeholder="Seleccione un empresa"
          />
          <Form.Input name="nombre" title="Nombre" />
          <Form.Input name="politicaDescuento" title="Policia de descuento" />
        </Form.Column>
      </Form.Section>
      <TarifaDetalles
        tarifaDetalle={tarifaDetalle}
        setTarifaDetalle={setTarifaDetalle}
      />
    </Form>
  );
};

export default TarifaFormulario;
