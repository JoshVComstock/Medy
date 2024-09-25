import TableContainer from "../../../components/common/table/tableContainer";
import { useGet } from "../../../components/hooks/useGet";
import { createColumns } from "../../../utils/createColumns";
import PageContainer from "../../../components/common/pageContainer";
import { useModal } from "../../../components/common/modal/useModal";
import Modal from "../../../components/common/modal/modal";
import Form from "../../../components/common/form/form";
import { ENDPOINTS } from "../../../types/enums/Endpoints";
import { MODELOS } from "@/types/enums/Modelos";
import { useAcceso } from "@/components/hooks/useAcceso";
import { ContactoBancoRes } from "@/types/res/ContactoBanco";
import {
  ContactoBancoForm,
  contactoBancoSchema,
} from "./validations/contactoBanco";
import { ContactoRes } from "@/types/res/ContactoRes";
import { BancoRes } from "@/types/res/BancoRes";
import { MonedaRes } from "@/types/res/MonedaRes";
import { EmpresaRes } from "@/types/res/EmpresaRes";

const ContactoBanco = () => {
  const { res, pushData, modifyData, filterData, getData } = useGet<
    ContactoBancoRes[]
  >(ENDPOINTS.CONTACTOBANCO.GET);
  const { state, item, openModal, closeModal } = useModal<ContactoBancoRes>(
    "Formulario de contacto banco"
  );
  const { canAdd, canDelete, canEdit, canModify, canView } = useAcceso(
    MODELOS.CONTACTO_BANCO
  );

  const columns = createColumns<ContactoBancoRes>([
    {
      header: "Número de cuenta",
      accessorKey: "numeroCuenta",
    },
    {
      header: "Contacto",
      accessorFn: (row) => row.contacto.nombre,
      meta: {
        isRelational: "contacto",
      },
    },
    {
      header: "Moneda",
      accessorFn: (row) => row.moneda.nombre,
      meta: {
        isRelational: "moneda",
      },
    },
    {
      header: "Banco",
      accessorFn: (row) => row.banco.nombre,
      meta: {
        isRelational: "banco",
      },
    },
    {
      header: "Empresa",
      accessorFn: (row) => row.empresa.nombre,
      meta: {
        isRelational: "empresa",
      },
    },
  ]);

  return (
    <PageContainer title="Contacto banco">
      <TableContainer
        name="contactoBanco"
        fixKey="id"
        columns={columns}
        data={res?.data}
        add={canAdd(() => openModal())}
        reports={canView}
        reload={getData}
        controls={[
          {
            label: "Modificar",
            fn: (row) => openModal(row),
            on: canModify,
          },
        ]}
      />
      <Modal state={state}>
        <Form<ContactoBancoRes, ContactoBancoForm>
          item={item}
          initialValues={{
            numeroCuenta: item?.numeroCuenta || "",
            idContacto: item?.idContacto || "",
            idBanco: item?.idBanco || "",
            idEmpresa: item?.idEmpresa || "",
            idMoneda: item?.idMoneda || "",
          }}
          validationSchema={contactoBancoSchema}
          post={{
            route: ENDPOINTS.CONTACTOBANCO.POST,
            onBody: (value) => ({
              ...value,
            }),
            onSuccess: (data) => {
              pushData(data);
              closeModal();
            },
          }}
          put={canEdit({
            route: ENDPOINTS.CONTACTOBANCO.PUT + item?.id,
            onBody: (value) => ({
              ...value,
            }),
            onSuccess: (data) => {
              modifyData(data, (value) => value.id === data.id);
              closeModal();
            },
          })}
          del={canDelete({
            route: ENDPOINTS.CONTACTOBANCO.DELETE + item?.id,
            onSuccess: (data) => {
              filterData((value) => value.id !== data.id);
              closeModal();
            },
          })}
        >
          <Form.Column>
            <Form.Input name="numeroCuenta" title="Número de cuenta" />
            <Form.Select<MonedaRes>
              name="idMoneda"
              title="Moneda"
              route={ENDPOINTS.MONEDA.GET}
              optionTextKey="nombre"
              optionValueKey="id"
              placeholder="Seleccione una moneda"
            />
            <Form.Select<EmpresaRes>
              name="idEmpresa"
              title="Empresa"
              route={ENDPOINTS.EMPRESA.GET}
              optionTextKey="nombre"
              optionValueKey="id"
              placeholder="Seleccione una empresa"
            />
            <Form.Select<ContactoRes>
              name="idContacto"
              title="Contactos"
              route={ENDPOINTS.CONTACTO.GET}
              optionTextKey="nombre"
              optionValueKey="id"
              placeholder="Seleccione un contacto"
            />
            <Form.Select<BancoRes>
              name="idBanco"
              title="Bancos"
              route={ENDPOINTS.BANCO.GET}
              optionTextKey="nombre"
              optionValueKey="id"
              placeholder="Seleccione un banco"
            />
          </Form.Column>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default ContactoBanco;
