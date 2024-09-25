import { ENDPOINTS } from "@/types/enums/Endpoints";
import Form from "@/components/common/form/form";
import Empresa from "@/assets/images/Empresa.png";
import Usuario from "@/assets/images/individual.png";
import {
  ContactoForm as ContactoBaseFormType,
  contactoSchema,
} from "../validations/contacto";
import { ContactoRes } from "@/types/res/ContactoRes";
import { EmpresaRes } from "@/types/res/EmpresaRes";
import { CategoriaContactoRes } from "@/types/res/CategoriaContactoRes";
import { useState } from "react";
interface Props {
  item: ContactoRes | null;
  onSuccessPost: (data: ContactoRes) => void;
  onSuccessPut: (data: ContactoRes) => void;
  onSuccessDelete: (data: ContactoRes) => void;
  canEdit: <T>(data: T) => T | undefined;
  canDelete: <T>(data: T) => T | undefined;
  disabled?: boolean;
}
const ContactosForm = ({
  item,
  onSuccessDelete,
  onSuccessPost,
  onSuccessPut,
  canDelete,
  canEdit,
  disabled = false,
}: Props) => {
  const [esEmpresa, setEsEmpresa] = useState(false);
  return (
    <>
      <Form<ContactoRes, ContactoBaseFormType>
        item={item}
        initialValues={{
          idEmpresa: item?.idEmpresa || "",
          nombre: item?.nombre || "",
          profesion: item?.profesion || "",
          nombreDespliegue: item?.nombreDespliegue || "",
          identFiscal: item?.identFiscal || "",
          color: 1,
          idPais: 1,
          idCiudad: 1,
          esEmpresa: esEmpresa ? true : false,
          direccion1: item?.direccion1 || "",
          direccion2: item?.direccion2 || "",
          telefonoFijo: item?.telefonoFijo || "",
          telefonoMovil: item?.telefonoMovil || "",
          puestoTrabajo: item?.puestoTrabajo || "",
          email: item?.email || "",
          sitioWeb: item?.sitioWeb || "",
          comentario: item?.comentario || "",
          idPadre: item?.id,
          latitud: item?.latitud || "",
          longitud: item?.longitud || "",
          numeracion: item?.numeracion || "",
          tipoContacto: item?.tipoContacto || "",
          zona: item?.zona || "",
          idsCategContacto: item?.categorias.map((cat) => cat.id) || [],
        }}
        validationSchema={contactoSchema}
        post={{
          route: ENDPOINTS.CONTACTO.POST,
          onBody: (value) => ({ ...value, idEmpresa: value.idEmpresa || null }),
          onSuccess: onSuccessPost,
        }}
        put={canEdit({
          route: ENDPOINTS.CONTACTO.PUT + item?.id,
          onBody: (value) => value,
          onSuccess: onSuccessPut,
        })}
        del={canDelete({
          route: ENDPOINTS.CONTACTO.DELETE + item?.id,
          onSuccess: onSuccessDelete,
        })}
        disabled={disabled}
      >
        <div className="w-full h-[70px] flex p-4 items-center">
          <img
            className="w-[44px] h-[44px]"
            src={esEmpresa ? Empresa : Usuario}
            alt="Es empresa o no"
          />
          <div className="w-9 h-full flex row items-center gap-4">
            <label className="text-sm ml-2 font-semibold text-gray-700 dark:text-white]">
              individual
            </label>
            <input
              type="radio"
              name="EsEmpresa"
              onClick={() => setEsEmpresa(false)}
              defaultChecked={!esEmpresa}
            />
            <label className="text-sm ml-2 font-semibold text-gray-700 dark:text-white]">
              Empresa
            </label>
            <input
              type="radio"
              name="EsEmpresa"
              onClick={() => setEsEmpresa(true)}
            />
          </div>
        </div>
        <Form.Column>
          <Form.Input name="nombre" title="Nombre" />
          <Form.Input name="profesion" title="Profesión" />
          <Form.Input name="nombreDespliegue" title="Nombre de Despliegue" />
          <Form.Input name="identFiscal" title="Identificación Fiscal" />
          <Form.Input name="numeracion" title="Numeracion" />
          <Form.Input name="longitud" title="Longitud" />
          <Form.Input name="latitud" title="Latitud" />
          <Form.Input name="direccion1" title="Dirección 1" />
          <Form.Input name="zona" title="Zona " />
        </Form.Column>
        <Form.Column>
          {esEmpresa ? (
            <Form.Select<EmpresaRes>
              name="idEmpresa"
              title="Empresa"
              route={ENDPOINTS.EMPRESA.GET}
              optionTextKey="nombre"
              optionValueKey="id"
              placeholder="Seleccione una empresa"
            />
          ) : (
            <></>
          )}

          <Form.Input name="direccion2" title="Dirección 2" />
          <Form.Input name="telefonoFijo" title="Teléfono Fijo" />
          <Form.Input name="telefonoMovil" title="Teléfono Móvil" />
          <Form.Input name="puestoTrabajo" title="Puesto de Trabajo" />
          <Form.Input name="email" title="Correo Electrónico" />
          <Form.Select<CategoriaContactoRes>
            name="idsCategContacto"
            title="Categorías"
            route={ENDPOINTS.CATEGORIACONTACTO.GET}
            optionTextKey="nombre"
            optionValueKey="id"
            placeholder="Seleccione una categoría"
          />
          <Form.Select
            name="tipoContacto"
            title="Tipo contacto"
            placeholder="Selecciones tipo contacto"
          >
            <Form.Option value="Contacto">Contacto</Form.Option>
            <Form.Option value="Direccion de factura">
              Direccion de factura
            </Form.Option>
            <Form.Option value="Direccion de entrega">
              Direccion de entrega
            </Form.Option>
            <Form.Option value="Direccion privada">
              Direccion privada
            </Form.Option>
            <Form.Option value="Otra direccion">Otra direccion</Form.Option>
          </Form.Select>
          <Form.Input name="sitioWeb" title="Sitio Web" />
          <Form.Input name="comentario" title="Comentario" />
        </Form.Column>
      </Form>
    </>
  );
};

export default ContactosForm;
