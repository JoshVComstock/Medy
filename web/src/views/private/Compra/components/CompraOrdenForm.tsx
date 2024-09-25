import { ENDPOINTS } from "@/types/enums/Endpoints";
import Form from "@/components/common/form/form";
import { CompraOrdenDetalleRes, CompraOrdenRes } from "@/types/res/CompraOrden";
import { CompraOrdenForm, compraOrdenSchema } from "../validations/compra";
import { ContactoRes } from "@/types/res/ContactoRes";
import { useState } from "react";
import CompraOrdenDetalle from "../../CompraOrdenDetalle";
import { MonedaRes } from "@/types/res/MonedaRes";
import { EmpresaRes } from "@/types/res/EmpresaRes";
interface Props {
  item: CompraOrdenRes | null;
  onSuccessPost: (data: CompraOrdenRes) => void;
  disabled?: boolean;
}
const CompraOrdenFormulario = ({
  item,
  onSuccessPost,
  disabled = false,
}: Props) => {
  const [compraOrdenDetalle, setCompraOrdenDetalle] = useState<
    CompraOrdenDetalleRes[]
  >([]);

  return (
    <Form<CompraOrdenRes, CompraOrdenForm>
      item={item}
      initialValues={{
        idProveedor: item?.idProveedor || "",
        idMoneda: item?.idMoneda || "",
        refProveedor: item?.refProveedor || "",
        codOrden: item?.codOrden || "",
        idEmpresa: item?.idEmpresa || "",
        estadoCompra: item?.estadoCompra || "",
        prioridad: item?.prioridad || "",
        nota: item?.nota || "",
        idUsrComprador: item?.idUsrComprador || "",
        montoSinImpuesto: item?.montoSinImpuesto || "",
        montoImpuesto: item?.montoImpuesto || "",
        montoTotal: item?.montoTotal || "",
        fechaLimitePedido: item?.fechaLimitePedido || "",
        fechaConfirmacion: item?.fechaConfirmacion || "",
        fechaEntregaPlanifi: item?.fechaEntregaPlanifi || "",
      }}
      validationSchema={compraOrdenSchema}
      post={{
        route: ENDPOINTS.COMPRAORDEN.POST,
        onSuccess: onSuccessPost,
        onBody: (body) => {
          return { ...body, compraOrdenDetalle };
        },
      }}
      disabled={disabled}
      debug
    >
      <Form.Section title="Datos generales" row expandable>
        <Form.Column>
        <Form.Select<MonedaRes>
            name="idMoneda"
            title="Moneda"
            route={ENDPOINTS.MONEDA.GET}
            optionTextKey="nombre"
            optionValueKey="id"
            placeholder="Seleccione un moneda"
          />
          <Form.Select<EmpresaRes>
            name="idEmpresa"
            title="Empresa"
            route={ENDPOINTS.EMPRESA.GET}
            optionTextKey="nombre"
            optionValueKey="id"
            placeholder="Seleccione un empresa"
          />
          <Form.Input name="prioridad" title="Prioridad" />   
          <Form.Input name="nota" title="Nota" />
          <Form.Input name="idUsrComprador" title="Usuario comprador" />
        </Form.Column>
        <Form.Column>
          <Form.Input name="montoSinImpuesto" title="Monto Sin Impuesto" />
          <Form.Input name="montoImpuesto" title="Monto de Impuesto" />
          <Form.Input name="montoTotal" title="Monto Total" />
          <Form.Input
            type="date"
            name="fechaLimitePedido"
            title="Fecha Límite de Pedido"
          />
          <Form.Input
            type="date"
            name="fechaConfirmacion"
            title="Fecha de Confirmación"
          />
        </Form.Column>
        <Form.Column>
          <Form.Input name="estadoCompra" title="Estado de Compra" />
          <Form.Select<ContactoRes>
            name="idProveedor"
            title="Proveedor"
            route={ENDPOINTS.CONTACTO.GET}
            optionTextKey="nombre"
            optionValueKey="id"
            placeholder="Seleccione un proveedor"
          />
          <Form.Input name="refProveedor" title="Referencia Proveedor" />
          <Form.Input name="codOrden" title="Código de Orden" />
          <Form.Input
            type="date"
            name="fechaEntregaPlanifi"
            title="Fecha de Entrega Planificada"
          />
        </Form.Column>
      </Form.Section>
      <CompraOrdenDetalle
        compraOrdenDetalle={compraOrdenDetalle}
        setCompraOrdenDetalle={setCompraOrdenDetalle}
      />
    </Form>
  );
};

export default CompraOrdenFormulario;
