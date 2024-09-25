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
import { ResultadoRes } from "@/types/res/Resultado";
import { resultadoSchema, ResultadoForm } from "./validations/resultado";

const Resultado = () => {
  const { res, pushData, modifyData, filterData, getData } = useGet<
    ResultadoRes[]
  >(ENDPOINTS.RESULTADO.GET);
  const { state, item, openModal, closeModal } = useModal<ResultadoRes>(
    "Formulario de resultado"
  );
  const { canAdd, canDelete, canEdit, canModify, canView } = useAcceso(
    MODELOS.RESULTADO
  );

  const columns = createColumns<ResultadoRes>([
    {
      header: "Codigo de barras",
      accessorKey: "codigoBarra",
    },
    {
      header: "Fecha entregado",
      accessorKey: "fechaEntregado",
    },
    {
      header: "Fecha resultado",
      accessorKey: "fechaResultado",
    },
    {
      header: "Resultado ",
      accessorKey: "resultadoPaciente",
    },
    {
      header: "Paciente ",
      accessorKey: "NobrePaciente",
    },
  ]);

  return (
    <PageContainer title="Resultado">
      <TableContainer
        name="resultado"
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
        <Form<ResultadoRes, ResultadoForm>
          item={item}
          initialValues={{
            fechaIngreso: item?.fechaIngreso || "",
            fechaResultado: item?.fechaResultado || "",
            fechaEntregado: item?.fechaEntregado || "",
            resultadoPaciente: item?.resultadoPaciente || "",
            metodo: item?.metodo || "",
            valorResultado: item?.valorResultado || "",
            valorReferencia: item?.valorReferencia || "",
            observacion: item?.observacion || "",
            idCartilla: item?.idCartilla || "",
            idLaboratorio: item?.idLaboratorio || "",
          }}
          validationSchema={resultadoSchema}
          post={{
            route: ENDPOINTS.RESULTADO.POST,
            onBody: (value) => ({
              ...value,
            }),
            onSuccess: (data) => {
              pushData(data);
              closeModal();
            },
          }}
          put={canEdit({
            route: ENDPOINTS.RESULTADO.PUT + item?.id,
            onBody: (value) => ({
              ...value,
            }),
            onSuccess: (data) => {
              modifyData(data, (value) => value.id === data.id);
              closeModal();
            },
          })}
          del={canDelete({
            route: ENDPOINTS.RESULTADO.DELETE + item?.id,
            onSuccess: (data) => {
              filterData((value) => value.id !== data.id);
              closeModal();
            },
          })}
           debug
        >
          <Form.Column>
            <Form.Input
              name="fechaIngreso"
              title="Fecha de Ingreso"
              type="date"
            />
            <Form.Input
              name="fechaResultado"
              title="Fecha de Resultado"
              type="date"
            />
            <Form.Input
              name="fechaEntregado"
              title="Fecha de Entrega"
              type="date"
            />
            <Form.Input
              name="resultadoPaciente"
              title="Resultado del Paciente"
            />
            <Form.Input name="metodo" title="Método" />
            <Form.Input name="valorResultado" title="Valor del Resultado" />
            <Form.Input name="valorReferencia" title="Valor de Referencia" />
            <Form.Input name="observacion" title="Observación" />
            <Form.Select
              name="idCartilla"
              optionTextKey="codigoBarras"
              title="Cartilla"
              route={ENDPOINTS.CARTILLA.GET}
              optionValueKey="id"
              placeholder="Seleccione una cartilla"
              searchable
            />
            <Form.Select
              name="idLaboratorio"
              optionTextKey="nombre"
              title="Laboratorio"
              route={ENDPOINTS.LABORATORIO.GET}
              optionValueKey="id"
              placeholder="Seleccione un laboratorio"
            />
          </Form.Column>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default Resultado;
