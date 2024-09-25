import TableContainer from "../../../components/common/table/tableContainer";
import { useGet } from "../../../components/hooks/useGet";
import { CuentasRes } from "../../../types/res/CuentasRes";
import { createColumns } from "../../../utils/createColumns";
import PageContainer from "../../../components/common/pageContainer";
import { useModal } from "../../../components/common/modal/useModal";
import Modal from "../../../components/common/modal/modal";
import Form from "../../../components/common/form/form";
import { CuentaForm, cuentaSchema } from "./validations/cuenta";
import { ENDPOINTS } from "../../../types/enums/Endpoints";
import Floating from "../../../components/common/floating/floating";
import DetalleAsientos from "../DetalleAsientos";
import { MODELOS } from "@/types/enums/Modelos";
import { useAcceso } from "@/components/hooks/useAcceso";
import Bancos from "../Bancos";
import { useLang } from "@/context/lang";

const Cuentas = () => {
  const { translate } = useLang();

  /* 
    TRAE LOS DATOS DEL BACKEND 
    res ES EL QUE TIENE LOS DATOS
    getData RECARGA DATOS
  */
  const { res, pushData, modifyData, filterData, getData } = useGet<
    CuentasRes[]
  >(ENDPOINTS.CUENTAS.GET);

  /* 
    useModal ES PARA MODALES Y PARA FLOATINGS
    state ES LO QUE SE LE PASA AL MODAL O FLOATING
    item ES CUANDO ABRES EL MODAL CON UN OBJETO
    openModal ES PARA ABRIR EL MODAL
    closeModal ES PARA CERRAR EL MODAL
  */
  const { state, item, openModal, closeModal } = useModal<CuentasRes>(
    "Formulario de cuenta"
  );
  const {
    state: libroState,
    item: libroItem,
    openModal: libroOpenModal,
    closeModal: libroCloseModal,
  } = useModal<CuentasRes>("Libro mayor");
  const {
    state: bancoState,
    item: bancoItem,
    openModal: bancoOpenModal,
    closeModal: bancoCloseModal,
  } = useModal<CuentasRes>("Libro de banco");

  /* */
  const { canAdd, canDelete, canEdit, canModify, canView } = useAcceso(
    MODELOS.CUENTAS
  );

  /*
    CREAR LAS COLUMNAS DE LA TABLA
    header ES LO QUE SE MUESTRA EN EL FRONTEND
    accesorKey ES LA PROPIEDAD QUE SE VA A MOSTRAR
  */
  const columns = createColumns<CuentasRes>([
    {
      header: translate("TABLE_CUENTAS_COL_CODIGO"),
      accessorKey: "codigo",
    },
    {
      header: translate("TABLE_CUENTAS_COL_DESCRIPCION"),
      accessorKey: "descripcion",
    },
    {
      header: translate("TABLE_CUENTAS_COL_NIVEL"),
      accessorKey: "nivel",
    },
    {
      header: translate("TABLE_CUENTAS_COL_PADRE"),
      accessorKey: "padre",
    },
    {
      header: translate("TABLE_CUENTAS_COL_MONEDA"),
      accessorKey: "moneda",
    },
    {
      header: translate("TABLE_CUENTAS_COL_ESTADO"),
      accessorKey: "estado",
    },
  ]);

  return (
    <PageContainer title={translate("MODELOS_CUENTAS")}>
      {/*
        COMPONENTE DE TABLA
        name ES EL IDENTIFICADOR DE LA TABLA
        fixKey ES LA PROPIEDAD DEL OBJETO CON LA QUE SE FIJA ARRIBA DE LA TABLA
        columns ES LA DEFINICIÓN DE LAS COLUMNAS
        data SON LOS DATOS DE LA TABLA
        add ES EL BOTÓN DE AÑADIR
        reports ES EL BOTÓN DE EXPORTAR
        reload ES EL BOTÓN DE RECARGA
        controls SON LAS ACCIONES DE CADA FILA DE LA TABLA
          label ES EL TEXTO QUE SE MUESTRA
          fn ES LA FUNCION QUE SE VA A REALIZAR CON LA FILA
          on ES LA CONDICION PARA QUE APAREZCA LA ACCION EN LA FILA
        buttons SON LOS BOTONES EXTRA DE LA TABLA
      */}
      <TableContainer
        name="cuentas"
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
            label: "Libro mayor",
            fn: (row) => libroOpenModal(row),
            on: (row) => row.nivel === 5,
          },
          {
            label: "Libro de banco",
            fn: (row) => bancoOpenModal(row),
            on: (row) =>
              row.nivel === 5 &&
              row.descripcion.toLocaleLowerCase().includes("banco"),
          },
        ]}
      />
      <Modal state={state}>
        {/*
          COMPONENTE DE FORMULARIO
          RECIBE DOS GENERICOS, EL PRIMERO ES DE QUE TIPO ES EL ITEM y EL SEGUNDO ES EL TIPO DEL FORMULARIO
          item ES EL OBJETO PARA IDENTIFICAR SI ES SOLO EL POST o EL PUT Y EL DELETE
          initialValues SON LOS VALORES INICIALES DEL FORMULARIO
          validationSchema SON LAS VALIDACIONES DEL YUP
          post, put SON LAS PETICIONES QUE SE HACEN AL MOMENTO DE QUE EL FORMULARIO HAYA PASADO TODAS LAS VALIDACIONES
        */}
        <Form<CuentasRes, CuentaForm>
          item={item}
          initialValues={{
            codigo: item?.codigo || "",
            descripcion: item?.descripcion || "",
            padre: item?.padre || "",
            moneda: item?.moneda || "",
            nivel: item?.nivel || "",
          }}
          validationSchema={cuentaSchema}
          post={{
            route: ENDPOINTS.CUENTAS.POST,
            onSuccess: (data) => {
              pushData(data);
              closeModal();
            },
          }}
          put={canEdit({
            route: ENDPOINTS.CUENTAS.PUT + item?.id,
            onSuccess: (data) => {
              modifyData(data, (value) => value.id === data.id);
              closeModal();
            },
          })}
          del={canDelete({
            route: ENDPOINTS.CUENTAS.DELETE + item?.id,
            onSuccess: (data) => {
              filterData((value) => value.id !== data.id);
              closeModal();
            },
          })}
        >
          <Form.Column>
            <Form.Input
              name="codigo"
              title={translate("FORM_CUENTAS_INPUT_CODIGO")}
            />
            <Form.Input
              name="descripcion"
              title={translate("FORM_CUENTAS_INPUT_DESCRIPCION")}
            />
            <Form.Input
              name="padre"
              title={translate("FORM_CUENTAS_INPUT_PADRE")}
            />
            <Form.Select
              name="moneda"
              title="Moneda"
              placeholder={translate("FORM_CUENTAS_INPUT_MONEDA_PLACEHOLDER")}
            >
              <Form.Option value="Bs">Bs</Form.Option>
              <Form.Option value="Us">Us</Form.Option>
              <Form.Option value="UFV">UFV</Form.Option>
            </Form.Select>
            <Form.Input
              type="number"
              name="nivel"
              title={translate("FORM_CUENTAS_INPUT_NIVEL")}
            />
          </Form.Column>
        </Form>
      </Modal>
      <Floating width="60%" state={libroState}>
        <PageContainer
          title="Libro mayor"
          titleRequestRoute={ENDPOINTS.CUENTAS.FIND + libroItem?.id}
          titleRequestKey="descripcion"
          backRoute={libroCloseModal}
        >
          <DetalleAsientos idCuenta={libroItem?.id} />
        </PageContainer>
      </Floating>
      <Floating width="60%" state={bancoState}>
        <Bancos close={bancoCloseModal} idCuenta={bancoItem?.id} />
      </Floating>
    </PageContainer>
  );
};

export default Cuentas;
