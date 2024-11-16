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
import { CartillaFormRes, CartillaRes } from "@/types/res/CartillaRes";
import { CartillaForm, cartillaSchema } from "./validations/cartilla";
import Formmaps from "./components/formMaps";
const Cartilla = () => {
  const { res, pushData, modifyData, filterData, getData } = useGet<
    CartillaFormRes[]
  >(ENDPOINTS.CARTILLA.GET);
  const { state, item, openModal, closeModal } = useModal<CartillaFormRes>(
    "Formulario de cartilla"
  );
  const { canAdd, canDelete, canEdit, canModify, canView } = useAcceso(
    MODELOS.CARTILLA
  );
  const {
    state: stateMap,
    openModal: openModalMap,
    closeModal: closeModalMap,
  } = useModal<[number, number]>("Seleccionar ubicacion");
  const columns = createColumns<CartillaRes>([
    {
      header: "Codigo de barras",
      accessorKey: "codigoBarras",
    },
    {
      header: "Nombre",
      accessorKey: "nombrePaciente",
    },
    {
      header: "Fecha toma de muestra",
      accessorKey: "fechaTomaMuestras",
    },
    {
      header: "Sexo",
      accessorKey: "sexoPaciente",
    },

    {
      header: "Numero de muestra",
      accessorKey: "numeroMuestra",
    },
  ]);

  return (
    <PageContainer title="Cartilla">
      <TableContainer
        name="cartilla"
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
          {
            label: "Agregar ubicacion",
            fn: () => openModalMap(),
          },
        ]}
      />
      <Modal state={stateMap}>
        <Formmaps closeModalMap={closeModalMap} />
      </Modal>
      <Modal state={state}>
        <Form<CartillaFormRes, CartillaForm>
          item={item}
          initialValues={{
            nombreMadre: item?.nombreMadre || "",
            ciMadre: item?.ciMadre || "",
            direccionMadre: item?.direccionMadre || "",
            detalleDireccionMadre: item?.detalleDireccionMadre || "",
            telefonoMadre: item?.telefonoMadre || "",
            telefonoEmergenciaMadre: item?.telefonoEmergenciaMadre || "",
            tratamientoHiportiroidismo:
              item?.tratamientoHiportiroidismo || false,
            tratamientoHipertiroidismo:
              item?.tratamientoHipertiroidismo || false,
            tratamientoMadre: item?.tratamientoMadre || "",
            enfermedadMadre: item?.enfermedadMadre || "",
            idProvincia: item?.idProvincia || null,

            // Datos del Paciente
            nombrePaciente: item?.nombrePaciente || "",
            sexoPaciente: item?.sexoPaciente || "",
            edadGestacionalSemanaPaciente:
              item?.edadGestacionalSemanaPaciente || "",
            edadGestacionalDiaPaciente: item?.edadGestacionalDiaPaciente || "",
            fechaNacimientoPaciente: item?.fechaNacimientoPaciente || "",
            pesoNacimientoPaciente: item?.pesoNacimientoPaciente || "",
            nacimientoTerminoPaciente: item?.nacimientoTerminoPaciente || false,

            // Datos de la Cartilla

            codigoBarras: item?.codigoBarras || "",
            fechaTomaMuestras: item?.fechaTomaMuestras || "",
            numeroMuestra: item?.numeroMuestra || "",
            transfucion: item?.transfucion || false,
            antibioticos: item?.antibioticos || "",
            notas: item?.notas || "",
          }}
          validationSchema={cartillaSchema}
          post={{
            route: ENDPOINTS.CARTILLA.POST,
            onBody: (value) => ({
              ...value,
            }),
            onSuccess: (data) => {
              pushData(data);
              closeModal();
            },
          }}
          put={canEdit({
            route: ENDPOINTS.CARTILLA.PUT + item?.id,
            onBody: (value) => ({
              ...value,
            }),
            onSuccess: (data) => {
              modifyData(data, (value) => value.id === data.id);
              closeModal();
            },
          })}
          del={canDelete({
            route: ENDPOINTS.CARTILLA.DELETE + item?.id,
            onSuccess: (data) => {
              filterData((value) => value.id !== data.id);
              closeModal();
            },
          })}
          debug
        >
          <Form.Column>
            <Form.Input name="codigoBarras" title="Código de Barras" />
            <Form.Input name="tratamientoMadre" title="Tratamiento madre" />
            <Form.Input name="telefonoMadre" title="Teléfono de la Madre" />
            <Form.Input
              name="telefonoEmergenciaMadre"
              title="Teléfono de Emergencia de la Madre"
            />
            <Form.Select
              name="idProvincia"
              optionTextKey="nombre"
              title="Provincia"
              route={ENDPOINTS.PROVINCIA.GET}
              optionValueKey="id"
              placeholder="Seleccione una provincia"
            />
          </Form.Column>
          <Form.Column>
            <Form.Input name="nombreMadre" title="Nombre de la Madre" />
            <Form.Input name="ciMadre" title="CI de la Madre" />
            <Form.Input name="direccionMadre" title="Dirección de la Madre" />
            <Form.Input
              name="detalleDireccionMadre"
              title="Detalle de Dirección de la Madre"
            />

            <Form.Input name="enfermedadMadre" title="Enfermedad madre" />
            <Form.Checkbox
              name="tratamientoHipertiroidismo"
              title="Hipeteroidismo"
            />
            <Form.Checkbox
              name="tratamientoHiportiroidismo"
              title="Hipoteroidismo"
            />
          </Form.Column>
          <Form.Column>
            <Form.Input name="nombrePaciente" title="Nombre del Paciente" />
            <Form.Input name="sexoPaciente" title="Sexo del Paciente" />
            <Form.Input
              name="edadGestacionalSemanaPaciente"
              title="Edad Gestacional (Semanas)"
              type="number"
            />

            <Form.Input
              name="edadGestacionalDiaPaciente"
              title="Edad Gestacional (Días)"
              type="number"
            />
            <Form.Input
              name="fechaNacimientoPaciente"
              title="Fecha de Nacimiento del Paciente"
              type="date"
            />
            <Form.Checkbox
              name="nacimientoTerminoPaciente"
              title="Nacimiento termino"
            />
          </Form.Column>
          <Form.Column>
            <Form.Input
              name="pesoNacimientoPaciente"
              title="Peso de Nacimiento"
              type="number"
            />
            <Form.Input
              name="fechaTomaMuestras"
              title="Fecha de Toma de Muestras"
              type="date"
            />
            <Form.Input
              name="numeroMuestra"
              title="Número de Muestra"
              type="number"
            />
            <Form.Checkbox name="transfucion" title="Transfucion" />
            <Form.Input name="antibioticos" title="Antibióticos" />
            <Form.Input name="notas" title="Notas" />
          </Form.Column>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default Cartilla;
