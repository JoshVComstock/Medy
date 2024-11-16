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
//import { confirmAlert } from "@/utils/alerts";
import { useRequest } from "@/components/hooks/useRequest";
import { alertSuccess } from "@/utils/alertsToast";

const Resultado = () => {
  const { res, getData } = useGet<ResultadoRes[]>(ENDPOINTS.RESULTADO.DAY);
  const { sendRequest } = useRequest();
  const { state, item, openModal, closeModal } = useModal<ResultadoRes>(
    "Formulario de resultado"
  );
  const { canAdd, canView } = useAcceso(MODELOS.RESULTADO);

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
      accessorKey: "nombrePaciente",
    },
  ]);
  const handleAdd = async (body: ResultadoForm) => {
    const resResul = await sendRequest<null>(ENDPOINTS.RESULTADO.POST, body);
    if (resResul) {
      alertSuccess("Resultado creado");
      getData();
      closeModal();
    }
  };
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
            envio: false,
          }}
          validationSchema={resultadoSchema}
          post={(data) => handleAdd(data)}
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

            <Form.Select
              name="resultadoPaciente"
              title="Resultado"
              placeholder="Seleccione un resultado"
            >
              <Form.Option value="POSITIVO">POSITIVO</Form.Option>
              <Form.Option value="NEGATIVO">NEGATIVO</Form.Option>
              <Form.Option value="SOSPECHOSO">SOSPECHOSO</Form.Option>
            </Form.Select>
            <Form.Input name="metodo" title="Método" />
          </Form.Column>
          <Form.Column>
            <Form.Input name="valorResultado" title="Valor del Resultado" />
            <Form.Input name="valorReferencia" title="Valor de Referencia" />
            <Form.Input name="observacion" title="Observación" />
            <Form.Select
              name="idCartilla"
              optionTextKey="codigoBarras"
              title="Cartilla"
              route={ENDPOINTS.CARTILLA.RESULTADONULL}
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
