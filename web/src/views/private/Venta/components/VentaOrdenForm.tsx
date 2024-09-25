import { ENDPOINTS } from "@/types/enums/Endpoints";
import Form from "@/components/common/form/form";
import { VentaOrdenRes } from "@/types/res/VentaOrdenRes";
import { VentaOrdenForm, ventaOrdenSchema } from "../validations/venta";
import { useState } from "react";
import VentaOrdenDetalle from "../../VentaOrdenDetalle";
import { VentaOrdenDetalleRes } from "@/types/res/VentaOrdenDetalleRes";
import { EmpresaRes } from "@/types/res/EmpresaRes";
import { MonedaRes } from "@/types/res/MonedaRes";
interface Props {
  item: VentaOrdenRes | null;
  onSuccessPost: (data: VentaOrdenRes) => void;
  disabled?: boolean;
}
const VentaOrdenFormulario = ({
  item,
  onSuccessPost,
  disabled = false,
}: Props) => {
  const [ventaOrdenDetalle, setVentaOrdenDetalle] = useState<
    VentaOrdenDetalleRes[]
  >([]);

  return (
    <Form<VentaOrdenRes, VentaOrdenForm>
      item={item}
      initialValues={{
        idMoneda: item?.idMoneda || "",
        idEmpresa: item?.idEmpresa || "",
        nota: item?.nota || "",
        montoSinImpuesto: item?.montoSinImpuesto || "",
        montoImpuesto: item?.montoImpuesto || "",
        montoTotal: item?.montoTotal || "",
        codigoOrden: item?.codigoOrden || "",
        estadoFacturacion: item?.estadoFacturacion || "",
        estadoOrden: item?.estadoOrden || "",
        fechaValidez: item?.fechaValidez || "",
        idAlmacen: 1,
        idCliente: 1,
        idEquipo: 1,
        idPrecio: 1,
        idTerminosPago: 1,
        idVendedor: 1,
        montoImpago: item?.montoImpago || "",
        tc: item?.tc || "",
        toker: item?.toker || "",
      }}
      validationSchema={ventaOrdenSchema}
      post={{
        route: ENDPOINTS.VENTAORDEN.POST,
        onSuccess: onSuccessPost,
        onBody: (body) => {
          return { ...body, ventaOrdenDetalle };
        },
      }}
      disabled={disabled}
      debug
    >
      <Form.Section title="Datos generales" row expandable>
        <Form.Column>
          <Form.Input name="nota" title="Nota" />
          <Form.Input name="montoSinImpuesto" title="Monto sin Impuesto" />
          <Form.Input name="montoImpuesto" title="Monto Impuesto" />
          <Form.Input name="montoTotal" title="Monto Total" />
          <Form.Input name="codigoOrden" title="Código de Orden" />
          <Form.Select<EmpresaRes>
            name="idEmpresa"
            title="Empresa"
            optionTextKey="nombre"
            route={ENDPOINTS.EMPRESA.GET}
            optionValueKey="id"
            placeholder="Seleccione un empresa"
          />
        </Form.Column>
        <Form.Column>
        <Form.Select<MonedaRes>
            name="idMoneda"
            title="Moneda"
            optionTextKey="nombre"
            route={ENDPOINTS.MONEDA.GET}
            optionValueKey="id"
            placeholder="Seleccione un moneda"
          />
          <Form.Input name="estadoFacturacion" title="Estado de Facturación" />
          <Form.Input name="estadoOrden" title="Estado de Orden" />
          <Form.Input
            name="fechaValidez"
            title="Fecha de Validez"
            type="date"
          />
          <Form.Input name="montoImpago" title="Monto Impago" />
          <Form.Input name="tc" title="TC" />
          <Form.Input name="toker" title="Toker" />
          
        </Form.Column>
      </Form.Section>
      <VentaOrdenDetalle
        ventaOrdenDetalle={ventaOrdenDetalle}
        setventaOrdenDetalle={setVentaOrdenDetalle}
      />
    </Form>
  );
};

export default VentaOrdenFormulario;
