import { ENDPOINTS } from "@/types/enums/Endpoints";
import Form from "@/components/common/form/form";
import { ProductoBaseRes } from "@/types/res/ProductoBaseRes";
import {
  ProductoBaseForm as ProductoBaseFormType,
  productoBaseSchema,
} from "../validations/productoBase";
import { ProductoCategoriaRes } from "@/types/res/ProductoCategoriaRes";
/* import { UseInputsDynamically } from "@/components/common/form/addInputsDynamically/useInputsDynamically"; */
/* import { useMemo } from "react"; */
import { useLang } from "@/context/lang";
import { EmpresaRes } from "@/types/res/EmpresaRes";
import UnidadMedidaRes from "@/types/res/UnidadMedida";
/* 

import Button from "@/components/common/button/button";
import IconAdd from "@assets/icons/iconAdd";
import Input from "@/components/common/inputs/input";
import IconX from "@assets/icons/iconX";
 */
interface Props {
  item: ProductoBaseRes | null;
  onSuccessPost: (data: ProductoBaseRes) => void;
  onSuccessPut: (data: ProductoBaseRes) => void;
  onSuccessDelete: (data: ProductoBaseRes) => void;
  canEdit: <T>(data: T) => T | undefined;
  canDelete: <T>(data: T) => T | undefined;
  disabled?: boolean;
}

const ProductoBaseForm = ({
  item,
  onSuccessDelete,
  onSuccessPost,
  onSuccessPut,
  canDelete,
  canEdit,
  disabled = false,
}: Props) => {
  // ============ add inputs ============
  /* const initialValues = useMemo(
    () => item?.prodBaseAtributoValor || [],
    [item]
  ); */
  /* const { values } = UseInputsDynamically(initialValues); */

  const { translate } = useLang();

  return (
    <Form<ProductoBaseRes, ProductoBaseFormType>
      item={item}
      initialValues={{
        idCategoria: item?.idCategoria || "",
        idUnidadMedida: item?.idUnidadMedida || "",
        idUnidadMedCompra: item?.idUnidadMedCompra || "",
        idEmpresa: item?.idEmpresa || "",
        idTipoProducto: item?.idTipoProducto || "",
        secuencia: item?.secuencia || "",
        color: item?.color || "",
        codInterno: item?.codInterno || "",
        codFabricante: item?.codFabricante || "",
        codBarras: item?.codBarras || "",
        prioridad: item?.prioridad || "",
        nombre: item?.nombre || "",
        descripcion: item?.descripcion || "",
        descripcionCompra: item?.descripcionCompra || "",
        descripcionVenta: item?.descripcionVenta || "",
        precioVenta: item?.precioVenta || "",
        precioCosto: item?.precioCosto || "",
        volumen: item?.volumen || "",
        peso: item?.peso || "",
        vendible: item?.vendible || false,
        comprable: item?.comprable || false,
        configurable: item?.configurable || false,
        trazabilidad: item?.trazabilidad || "",
        plazoEntregaCli: item?.plazoEntregaCli || "",
        tipoServEnt: item?.tipoServEnt || "",
      }}
      validationSchema={productoBaseSchema}
      post={{
        route: ENDPOINTS.PRODUCTOBASE.POST,
        onSuccess: onSuccessPost,
        onBody: (body) => {
          return { ...body, prodBaseAtribValorRel: [] };
        },
      }}
      put={canEdit({
        route: ENDPOINTS.PRODUCTOBASE.PUT + item?.id,
        onSuccess: onSuccessPut,
        onBody: (body) => {
          return { ...body, prodBaseAtribValorRel: [] };
        },
      })}
      del={canDelete({
        route: ENDPOINTS.PRODUCTOBASE.DELETE + item?.id,
        onSuccess: onSuccessDelete,
      })}
      disabled={disabled}
    >
      <Form.Section
        title={translate("FORM_PRODUCTO_BASE_SUBTITLE1")}
        row
        expandable
      >
        <Form.Column>
          <Form.Input
            name="nombre"
            title={translate("FORM_PRODUCTO_BASE_INPUT_NOMBRE")}
          />
          <Form.Input
            name="descripcion"
            title={translate("FORM_PRODUCTO_BASE_INPUT_DESCRIPCION")}
          />
        </Form.Column>
        <Form.Column>
          <Form.Select<ProductoCategoriaRes>
            name="idCategoria"
            title={translate("FORM_PRODUCTO_BASE_INPUT_CATEGORIA")}
            route={ENDPOINTS.PRODUCTOCATEGORIA.GET}
            optionTextKey="nombre"
            optionValueKey="id"
            placeholder="Seleccione la categoria"
          />
          <Form.Select<UnidadMedidaRes>
            name="idUnidadMedida"
            title={translate("FORM_PRODUCTO_BASE_INPUT_UNIDAD_DE_MEDIDA")}
            route={ENDPOINTS.RMUNIDADMEDIDA.GET}
            optionTextKey="nombre"
            optionValueKey="id"
            placeholder="Seleccione una medida"
          />
          <Form.Input
            name="idUnidadMedCompra"
            title={translate(
              "FORM_PRODUCTO_BASE_INPUT_UNIDAD_DE_MEDIDA_DE_COMPRA"
            )}
          />
          <Form.Select<EmpresaRes>
            name="idEmpresa"
            title={translate("FORM_PRODUCTO_BASE_INPUT_EMPRESA")}
            route={ENDPOINTS.EMPRESA.GET}
            optionTextKey="nombre"
            optionValueKey="id"
            placeholder="Seleccione una empresa"
          />
          <Form.Input
            name="idTipoProducto"
            title={translate("FORM_PRODUCTO_BASE_INPUT_TIPO_DE_PRODUCTO")}
          />
        </Form.Column>
      </Form.Section>
      <Form.Section
        title={translate("FORM_PRODUCTO_BASE_SUBTITLE2")}
        row
        expandable
      >
        <Form.Column>
          <Form.Input
            name="codInterno"
            title={translate("FORM_PRODUCTO_BASE_INPUT_CODIGO_INTERNO")}
          />
          <Form.Input
            name="codFabricante"
            title={translate("FORM_PRODUCTO_BASE_INPUT_CODIGO_FABRICANTE")}
          />
          <Form.Input
            name="codBarras"
            title={translate("FORM_PRODUCTO_BASE_INPUT_CODIGO_DE_BARRAS")}
          />
          <Form.Input
            name="secuencia"
            title={translate("FORM_PRODUCTO_BASE_INPUT_SECUENCIA")}
          />
          <Form.Input
            name="plazoEntregaCli"
            title={translate(
              "FORM_PRODUCTO_BASE_INPUT_PLAZO_DE_ENTREGA_AL_CLIENTE"
            )}
          />
          <Form.Input
            name="tipoServEnt"
            title={translate(
              "FORM_PRODUCTO_BASE_INPUT_TIPO_DE_SERVICIO_DE_ENTREGA"
            )}
          />
        </Form.Column>
        <Form.Column>
          <Form.Input
            name="color"
            title={translate("FORM_PRODUCTO_BASE_INPUT_COLOR")}
          />
          <Form.Input
            name="descripcionCompra"
            title={translate("FORM_PRODUCTO_BASE_INPUT_DESCRIPCION_DE_COMPRA")}
          />
          <Form.Input
            name="descripcionVenta"
            title={translate("FORM_PRODUCTO_BASE_INPUT_DESCRIPCION_DE_VENTA")}
          />
          <Form.Input
            name="prioridad"
            title={translate("FORM_PRODUCTO_BASE_INPUT_PRIORIDAD")}
          />
          <Form.Input
            name="trazabilidad"
            title={translate("FORM_PRODUCTO_BASE_INPUT_TRAZABILIDAD")}
          />
        </Form.Column>
        <Form.Column>
          <Form.Input
            name="precioCosto"
            title={translate("FORM_PRODUCTO_BASE_INPUT_PRECIO_DE_COSTO")}
          />
          <Form.Input
            name="precioVenta"
            title={translate("FORM_PRODUCTO_BASE_INPUT_PRECIO_DE_VENTA")}
          />
          <Form.Input
            name="volumen"
            title={translate("FORM_PRODUCTO_BASE_INPUT_VOLUMEN")}
          />
          <Form.Input
            name="peso"
            title={translate("FORM_PRODUCTO_BASE_INPUT_PESO")}
          />
          <Form.Checkbox
            name="vendible"
            title={translate("FORM_PRODUCTO_BASE_INPUT_VENDIBLE")}
          />
          <Form.Checkbox
            name="comprable"
            title={translate("FORM_PRODUCTO_BASE_INPUT_COMPRABLE")}
          />
          <Form.Checkbox
            name="configurable"
            title={translate("FORM_PRODUCTO_BASE_INPUT_CONFIGURABLE")}
          />
        </Form.Column>
      </Form.Section>
      {/*      <Form.Section title="Atributos" expandable>
    <div>
          <Button
            disabled={disabled}
            type="button"
            icon={<IconAdd />}
            onClick={addInput}
          >
            Añadir
          </Button>
        </div> */}
      {/* {inputs.map((input, index) => (
          <Form.Section row noBar key={index}>
            <Input
              disabled={disabled}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange(index, "idAtribValor", event)
              }
              type="number"
              value={String(input.idAtribValor)}
              title={"Id atributo valor " + (index + 1)}
            />
            <Input
              disabled={disabled}
              title={"precioExtra " + (index + 1)}
              type="number"
              value={String(input.precioExtra)}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange(index, "precioExtra", event)
              }
            />
            <div className="self-end">
              <Button
                disabled={disabled}
                size="input"
                icon={<IconX />}
                onClick={() => removeInput(index)}
                type="button"
              />
            </div>
         
          </Form.Section>
        ))}

      </Form.Section>*/}
    </Form>
  );
};

export default ProductoBaseForm;
