import { ENDPOINTS } from "@/types/enums/Endpoints";
import PageContainer from "@/components/common/pageContainer";
import TableContainer from "@/components/common/table/tableContainer";
import { useGet } from "@/components/hooks/useGet";
import { ContactoRes } from "@/types/res/ContactoRes";
import { createColumns } from "@/utils/createColumns";
import { useLang } from "@/context/lang";
import { useModal } from "@/components/common/modal/useModal";
import Modal from "@/components/common/modal/modal";
import Form from "@/components/common/form/form";
import {
  ContactoForm,
  contactoSchema,
} from "../../Contacto/validations/contacto";
import { CategoriaContactoRes } from "@/types/res/CategoriaContactoRes";
import { MODELOS } from "@/types/enums/Modelos";
import { useAcceso } from "@/components/hooks/useAcceso";

interface Props {
  data: ContactoRes | null;
}
const ContactoRelacionForm = (data: Props) => {
  const { translate } = useLang();
  const { res,pushData, modifyData, filterData, getData } = useGet<ContactoRes[]>(
    ENDPOINTS.CONTACTO.PADRE + data.data?.id
  );
 /*  const { pushData, modifyData, filterData, getData } = useGet<ContactoRes[]>(
    ENDPOINTS.CONTACTO.GET
  ); */
  const { state, item, openModal, closeModal } = useModal<ContactoRes>(
    "Formulario contacto"
  );
  const { canAdd, canDelete, canEdit, canModify, canView } = useAcceso(
    MODELOS.CONTACTOS
  );
  const columns = createColumns<ContactoRes>([
    {
      header: translate("TABLE_CONTACTOS_COL_NOMBRE"),
      accessorKey: "nombre",
    },
    {
      header: translate("TABLE_CONTACTOS_COL_PROFESION"),
      accessorKey: "profesion",
    },
    {
      header: translate("TABLE_CONTACTOS_COL_TELEFONO_FIJO"),
      accessorKey: "telefonoFijo",
    },
    {
      header: translate("TABLE_CONTACTOS_COL_PUESTO_DE_TRABAJO"),
      accessorKey: "puestoTrabajo",
    },
    {
      header: translate("TABLE_CONTACTOS_COL_CORREO_ELECTRONICO"),
      accessorKey: "email",
    },
  ]);
  return (
    <PageContainer title="Contactos relacionados">
      <TableContainer
        name="contactoRelacion"
        fixKey="id"
        columns={columns}
        data={res?.data}
        add={canAdd(() => openModal())}
        reload={getData}
        reports={canView}
        controls={[
          {
            label: "Modificar",
            fn: (row) => openModal(row),
            on: canModify,
          },
        ]}
       
      />
      <Modal state={state}>
        <Form<ContactoRes, ContactoForm>
          item={item}
          initialValues={{
            idEmpresa: data.data?.idEmpresa,
            nombre: item?.nombre || "",
            profesion: item?.profesion || "",
            nombreDespliegue: item?.nombreDespliegue || "",
            identFiscal: item?.identFiscal || "",
            color: 1,
            idPais: 1,
            idCiudad: 1,
            esEmpresa: false,
            direccion1: item?.direccion1 || "",
            direccion2: item?.direccion2 || "",
            telefonoFijo: item?.telefonoFijo || "",
            telefonoMovil: item?.telefonoMovil || "",
            puestoTrabajo: item?.puestoTrabajo || "",
            email: item?.email || "",
            sitioWeb: item?.sitioWeb || "",
            comentario: item?.comentario || "",
            idPadre: data.data?.id || "",
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
            onBody: (value) => value,
            onSuccess: (data) => {
              pushData(data);
              closeModal();
            },
          }}
          put={canEdit({
            route: ENDPOINTS.CONTACTO.PUT + item?.id,
            onBody: (value) => value,
            onSuccess: (data) => {
              modifyData(data, (value) => value.id === data.id);
              closeModal();
            },
          })}
          del={canDelete({
            route: ENDPOINTS.CONTACTO.DELETE + item?.id,
            onSuccess: (data) => {
              filterData((value) => value.id !== data.id);
              closeModal();
            },
          })}
        >
          <Form.Column>
            <Form.Input name="nombre" title="Nombre" />
            <Form.Input name="profesion" title="Profesión" />
            <Form.Input name="nombreDespliegue" title="Nombre de Despliegue" />
            <Form.Input name="identFiscal" title="Identificación Fiscal" />
            <Form.Input name="color" title="Color" />
            <Form.Input name="numeracion" title="Numeracion" />
            <Form.Input name="longitud" title="Longitud" />
            <Form.Input name="latitud" title="Latitud" />
            <Form.Input name="direccion1" title="Dirección 1" />
            <Form.Input name="zona" title="Zona " />
          </Form.Column>
          <Form.Column>
            <Form.Input name="direccion2" title="Dirección 2" />
            <Form.Input name="telefonoFijo" title="Teléfono Fijo" />
            <Form.Input name="telefonoMovil" title="Teléfono Móvil" />
            <Form.Input name="puestoTrabajo" title="Puesto de Trabajo" />
            <Form.Input name="email" title="Correo Electrónico" />
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
            <Form.Select<CategoriaContactoRes>
              name="idsCategContacto"
              title="Categorías"
              route={ENDPOINTS.CATEGORIACONTACTO.GET}
              optionTextKey="nombre"
              optionValueKey="id"
              placeholder="Seleccione una categoría"
            />
            <Form.Input name="sitioWeb" title="Sitio Web" />
            <Form.Input name="comentario" title="Comentario" />
          </Form.Column>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default ContactoRelacionForm;
