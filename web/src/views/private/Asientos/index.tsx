import TableContainer from "../../../components/common/table/tableContainer";
import { useGet } from "../../../components/hooks/useGet";
import { createColumns } from "../../../utils/createColumns";
import PageContainer from "../../../components/common/pageContainer";
import { useModal } from "../../../components/common/modal/useModal";
import { AsientosRes } from "../../../types/res/AsientosRes";
import { ENDPOINTS } from "../../../types/enums/Endpoints";
import Floating from "../../../components/common/floating/floating";
import { useLocalState } from "@/components/hooks/useLocalState";
import { alertSuccess, alertWarning } from "@/utils/alertsToast";
import IconPCLocal from "@assets/icons/iconPCLocal";
import { useState } from "react";
import IconSave from "@assets/icons/iconSave";
import { confirmAlert } from "@/utils/alerts";
import IconFileDelete from "@assets/icons/iconFileDelete";
import { useSocket } from "@/components/hooks/useSocket";
import { Sockets } from "@/types/enums/Sockets";
import {
  LocalAsientos,
  LocalAsientosRes,
  LocalDetalleAsientosRes,
} from "./interfaces/LocalAsientos";
import { tailwindColors } from "@/utils/tailwindConfig";
import { DetalleAsientosRes } from "@/types/res/DetalleAsientosRes";
import { MODELOS } from "@/types/enums/Modelos";
import { useAcceso } from "@/components/hooks/useAcceso";
import { useLang } from "@/context/lang";
import Form from "./components/asientoForm";
import { useRequest } from "@/components/hooks/useRequest";
import { formatDate } from "@/utils/date";
import { useContabilidad } from "@/context/contabilidad";

const initialLocal = {
  added: [],
  updated: [],
  deleted: [],
};

const Asientos = () => {
  const { translate } = useLang();
  const { res, pushData, modifyData, filterData, getData } = useGet<
    AsientosRes[]
  >(ENDPOINTS.ASIENTOS.GET);
  const [localAsientos, setLocalAsientos] = useLocalState<any>(
    initialLocal,
    "localAsientos"
  );
  const [localDetalles, setLocalDetalles] = useLocalState<any>(
    initialLocal,
    "localDetallesAsiento"
  );
  const { canAdd, canDelete, canEdit, canView } = useAcceso(MODELOS.ASIENTOS);
  const { sendRequest } = useRequest();
  const [viewLocal, setViewLocal] = useState(true);
  const [loadSave, setLoadSave] = useState(false);
  const {
    state: detalleState,
    item: detalleItem,
    openModal: detalleOpenModal,
    closeModal: detalleCloseModal,
  } = useModal<AsientosRes>("Asiento y detalles");
  const { libroDiarioActivo } = useContabilidad();

  useSocket({
    [Sockets.ASIENTOLOCAL](res) {
      alertWarning(res.message);
      getData();
    },
    [Sockets.ASIENTOPOST](res) {
      alertWarning(res.message);
      pushData(res.data);
    },
    [Sockets.ASIENTOPUT](res) {
      alertWarning(res.message);
      modifyData(res.data, (asiento) => asiento.id === res.data.id);
    },
    [Sockets.ASIENTODELETE](res) {
      alertWarning(res.message);
      filterData((asiento) => asiento.id !== res.data);
    },
  });

  const columns = createColumns<AsientosRes>([
    {
      header: translate("TABLE_ASIENTOS_COL_NUMERO"),
      accessorKey: "numeroComprobante",
    },
    {
      header: translate("TABLE_ASIENTOS_COL_CONCEPTO"),
      accessorKey: "concepto",
    },
    {
      header: translate("TABLE_ASIENTOS_COL_TIPO_COMPROBANTE"),
      accessorFn: (row) => row.tipoComprobante.nombre,
    },
    {
      header: translate("TABLE_ASIENTOS_COL_FECHA"),
      accessorKey: "fecha",
      meta: {
        filterType: "date",
      },
    },
    {
      header: translate("TABLE_ASIENTOS_COL_ESTADO"),
      accessorKey: "estado",
    },
    {
      header: translate("TABLE_ASIENTOS_COL_FECHA_CREACION"),
      accessorFn: (row) => formatDate(row.fechaCreacion),
      meta: {
        filterType: "date",
      },
    },
  ]);

  const resetLocal = async () => {
    confirmAlert(() => {
      setLocalAsientos(initialLocal);
      setLocalDetalles(initialLocal);
    }, "Se eliminarán los cambios locales permanentemente");
  };

  const renderData = () => {
    if (!res?.data) return undefined;
    if (!viewLocal) return res.data;
    return [
      ...res.data
        // OBJETOS ELIMINADOS
        /* .filter(
          (value) =>
            !localAsientos.deleted
              .map((value: AsientosRes) => value.id)
              .includes(value.id)
        ) */
        // OBJETOS MODIFICADOS
        .map((value) => {
          const isUpdated = localAsientos.updated.find(
            (v: AsientosRes) => v.id === value.id
          );
          if (!isUpdated) return value;
          return isUpdated;
        }),
      // OBJETOS AGREGADOS
      ...localAsientos.added,
    ];
  };

  const returnColors = (row: AsientosRes | LocalAsientosRes) => {
    if (!viewLocal) return undefined;
    if (localAsientos.added.some((v: LocalAsientosRes) => v.id === row.id))
      return tailwindColors.green["100"];
    if (localAsientos.updated.some((v: AsientosRes) => v.id === row.id))
      return tailwindColors.amber["100"];
    if (localAsientos.deleted.some((v: AsientosRes) => v.id === row.id))
      return tailwindColors.rose["100"];
    if (
      localDetalles.added.some(
        (v: LocalDetalleAsientosRes) => v.idAsiento == row.id
      ) ||
      localDetalles.updated.some(
        (v: DetalleAsientosRes) => v.idAsiento === row.id
      ) ||
      localDetalles.deleted.some(
        (v: DetalleAsientosRes) => v.idAsiento === row.id
      )
    )
      return tailwindColors.amber["100"];
    return undefined;
  };

  const restoreLocal = (row: AsientosRes | LocalAsientosRes) => {
    setLocalAsientos((old: LocalAsientos) => ({
      ...old,
      deleted: old.deleted.filter((value) => value.id !== row.id),
    }));
    alertSuccess("Asiento restaurado correctamente");
  };

  const saveLocal = async () => {
    setLoadSave(true);
    console.log(
      JSON.stringify({
        asientos: localAsientos,
        detalles: localDetalles,
      })
    );
    const res = await sendRequest(ENDPOINTS.ASIENTOS.SAVELOCAL, {
      asientos: localAsientos,
      detalles: localDetalles,
    });
    if (res) {
      alertSuccess(res.message);
      getData();
      setLocalAsientos(initialLocal);
      setLocalDetalles(initialLocal);
    }
    setLoadSave(false);
  };

  const ShowAsientos = () => {
    if (libroDiarioActivo?.activo) {
      return [
        {
          title: "Usar datos locales",
          icon: <IconPCLocal />,
          fn: () => setViewLocal(!viewLocal),
          active: viewLocal,
        },
        {
          title: "Guardar cambios locales",
          fn: saveLocal,
          icon: <IconSave />,
          disabled:
            loadSave ||
            !viewLocal ||
            (!localAsientos.added.length &&
              !localAsientos.deleted.length &&
              !localAsientos.updated.length &&
              !localDetalles.added.length &&
              !localDetalles.deleted.length &&
              !localDetalles.updated.length),
        },
        {
          title: "Eliminar cambios locales",
          fn: resetLocal,
          icon: <IconFileDelete />,
          disabled:
            loadSave ||
            !viewLocal ||
            (!localAsientos.added.length &&
              !localAsientos.deleted.length &&
              !localAsientos.updated.length &&
              !localDetalles.added.length &&
              !localDetalles.deleted.length &&
              !localDetalles.updated.length),
        },
      ];
    }
    return [];
  };
  const labelModify = libroDiarioActivo?.activo
    ? "Modificar y ver detalles"
    : "Ver detalles";

  return (
    <PageContainer title={translate("MODLEOS_ASIENTOS")}>
      <TableContainer<LocalAsientosRes | AsientosRes>
        name="asientos"
        fixKey="id"
        columns={columns}
        data={renderData()}
        add={
          libroDiarioActivo?.activo
            ? canAdd(() => detalleOpenModal())
            : undefined
        }
        reports={canView}
        reload={getData}
        rowStyle={(row) => ({
          backgroundColor: returnColors(row),
        })}
        buttons={ShowAsientos()}
        controls={[
          {
            label: "Restaurar",
            fn: (row) => restoreLocal(row),
            on: (row) =>
              localAsientos.deleted.some((v: AsientosRes) => v.id === row.id),
          },
          {
            label: labelModify,
            fn: (row) => detalleOpenModal(row as AsientosRes),
            on: (row) =>
              !localAsientos.deleted.some((v: AsientosRes) => v.id === row.id),
          },
        ]}
      />
      <Floating width="60%" state={detalleState}>
        <Form
          setLocalAsientos={setLocalAsientos}
          closeModal={detalleCloseModal}
          item={detalleItem}
          data={res?.data}
          viewLocal={viewLocal}
          canDelete={canDelete}
          canEdit={canEdit}
          filterData={filterData}
          modifyData={modifyData}
          pushData={pushData}
          localDetalles={localDetalles}
          setLocalDetalles={setLocalDetalles}
        />
      </Floating>
    </PageContainer>
  );
};

export default Asientos;
