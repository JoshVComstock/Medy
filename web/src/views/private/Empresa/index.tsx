import TableContainer from "../../../components/common/table/tableContainer";
import { useGet } from "../../../components/hooks/useGet";
import { createColumns } from "../../../utils/createColumns";
import PageContainer from "../../../components/common/pageContainer";
import { useModal } from "../../../components/common/modal/useModal";
import Modal from "../../../components/common/modal/modal";
import Form from "../../../components/common/form/form";
import { EmpresaForm, empresaSchema } from "./validations/empresa";
import { ENDPOINTS } from "../../../types/enums/Endpoints";
import { MODELOS } from "@/types/enums/Modelos";
import { useAcceso } from "@/components/hooks/useAcceso";
import { EmpresaRes } from "@/types/res/EmpresaRes";
import { ContactoRes } from "@/types/res/ContactoRes";
import { MonedaRes } from "@/types/res/MonedaRes";

const Empresa = () => {
  const { res, pushData, modifyData, filterData, getData } = useGet<
    EmpresaRes[]
  >(ENDPOINTS.EMPRESA.GET);
  const { state, item, openModal, closeModal } = useModal<EmpresaRes>(
    "Formulario de empresa"
  );
  const { canAdd, canDelete, canEdit, canModify, canView } = useAcceso(
    MODELOS.EMPRESA
  );

  const columns = createColumns<EmpresaRes>([
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
      header: "ID de Padre",
      accessorKey: "idPadre",
    },
    {
      header: "Nombre",
      accessorKey: "nombre",
    },
    {
      header: "Detalles de la Empresa",
      accessorKey: "empresaDetalles",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Teléfono Fijo",
      accessorKey: "telefonoFijo",
    },
    {
      header: "Teléfono Móvil",
      accessorKey: "telefonoMovil",
    },
    {
      header: "Cabecera de Informe",
      accessorKey: "cabeceraInforme",
    },
    {
      header: "Código QR",
      accessorKey: "codigoQR",
    },
  ]);

  return (
    <PageContainer title="Empresa">
      <TableContainer
        name="empresas"
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
        <Form<EmpresaRes, EmpresaForm>
          item={item}
          initialValues={{
            idMoneda: item?.idMoneda || "",
            idPadre: 1,
            nombre: item?.nombre || "",
            empresaDetalles: item?.empresaDetalles || "",
            secuencia: 1,
            email: item?.email || "",
            telefonoFijo: item?.telefonoFijo || "",
            telefonoMovil: item?.telefonoMovil || "",
            fuenteLetra: "romana",
            colorPrimario: "1",
            colorSecundario: "1",
            colorBackground: "1",
            pieInforme: item?.pieInforme || "",
            cabeceraInforme: item?.cabeceraInforme || "",
            pathLogo: item?.pathLogo || "",
            idNomenclatura: 1,
            codigoQR: item?.codigoQR || "",
            idContacto: item?.idContacto,
          }}
          validationSchema={empresaSchema}
          post={{
            route: ENDPOINTS.EMPRESA.POST,
            onBody: (value) => value,
            onSuccess: (data) => {
              pushData(data);
              closeModal();
            },
          }}
          put={canEdit({
            route: ENDPOINTS.EMPRESA.PUT + item?.id,
            onBody: (value) => value,
            onSuccess: (data) => {
              modifyData(data, (value) => value.id === data.id);
              closeModal();
            },
          })}
          del={canDelete({
            route: ENDPOINTS.EMPRESA.DELETE + item?.id,
            onSuccess: (data) => {
              filterData((value) => value.id !== data.id);
              closeModal();
            },
          })}
        >
          <Form.Column>
            <Form.Input name="nombre" title="Nombre" />
            <Form.Input name="empresaDetalles" title="Detalles" />
            <Form.Input name="email" title="Email" />
            <Form.Input name="telefonoFijo" title="Telefono" />
            <Form.Select<ContactoRes>
              route={ENDPOINTS.CONTACTO.GET}
              optionTextKey="nombre"
              optionValueKey="id"
              placeholder="Seleccione contacto"
              name="idContacto"
              title="Contacto"
            />
            <Form.Select<MonedaRes>
              route={ENDPOINTS.MONEDA.GET}
              optionTextKey="nombre"
              optionValueKey="id"
              placeholder="Seleccione una moneda"
              name="idMoneda"
              title="Moneda"
            />
          </Form.Column>
          <Form.Column>
            <Form.Input name="telefonoMovil" title="Celular" />
            <Form.Input name="pieInforme" title="Informe pie" />
            <Form.Input name="cabeceraInforme" title="Informe cabecera" />
            <Form.Input name="pathLogo" title="logo" />
            <Form.Input name="codigoQR" title="codigo QR" />
          </Form.Column>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default Empresa;
