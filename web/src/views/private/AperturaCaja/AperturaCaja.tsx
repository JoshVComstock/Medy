import { useModal } from "@/components/common/modal/useModal";
import PageContainer from "@/components/common/pageContainer";
import TableContainer, {
  DateFilter,
} from "@/components/common/table/tableContainer";
import { useAcceso } from "@/components/hooks/useAcceso";
import { useGet } from "@/components/hooks/useGet";
import { ENDPOINTS } from "@/types/enums/Endpoints";
import { MODELOS } from "@/types/enums/Modelos";
import { AperturaCajaRes } from "@/types/res/CajaRes";
import { createColumns } from "@/utils/createColumns";
import Floating from "@/components/common/floating/floating";
import { useLang } from "@/context/lang";
import { useEffect, useState } from "react";
import { RowAperturaCajaType } from "./types/rowAperturaCaja";
import { CurrentDate } from "@/utils/currentDate";
import { PostRequets } from "@/components/common/utils/fetch";
import { alertError, alertSuccess } from "@/utils/alertsToast";
import IconSave from "@assets/icons/iconSave";
import FormAperturaCaja from "./components/form";

const AperturaCaja = () => {
  const { translate } = useLang();

  const { state, openModal, closeModal } = useModal<AperturaCajaRes>(
    "Formulario de grupo"
  );

  /*   const { canAdd, canDelete, canEdit, canModify, canView } = useAcceso(
    MODELOS.CAJAS
  ); */
  const { canView } = useAcceso(MODELOS.CAJAS);

  //* ========== start: search by date ==========
  const { formattedDate } = CurrentDate();
  const fechaStart = "?fecha=";
  const [date, setDate] = useState(`${fechaStart}${formattedDate}`);

  const { res, getData } = useGet<AperturaCajaRes[]>(
    ENDPOINTS.CAJA.GETTODAY + date
  );

  useEffect(() => {
    getData();
  }, [date]);

  //* ========== end: search by fate ==========

  //* ========== start: save the data ==========
  const handleSaveData = async (rows: RowAperturaCajaType[]) => {
    const res = await PostRequets(rows, ENDPOINTS.CAJA.POST);
    if (res.status === 200) {
      await getData();
      closeModal();
      alertSuccess(res.message);
    } else {
      alertError(res.message);
    }
  };

  const handleEditData = async (rows: RowAperturaCajaType[]) => {
    const res = await PostRequets(rows, ENDPOINTS.CAJA.PUT);
    if (res.status === 200) {
      await getData();
      closeModal();
      alertSuccess(res.message);
    } else {
      alertError(res.message);
    }
  };
  //* ========== end: save the data ==========

  const columns = createColumns<AperturaCajaRes>([
    {
      header: translate("FPRM_TABLE_APERTURA_CAJA_COL_FECHA"),
      accessorKey: "fecha",
      meta: {
        filterType: "justOneDate",
        filterBackend: (v: DateFilter) => {
          const newFecha = `${fechaStart}${v.from}`;
          setDate(newFecha);
        },
      },
    },
    {
      header: translate("FORM_TABLE_APERTURA_CAJA_COL_DESCRIPCION"),
      accessorKey: "descripcion",
    },
    {
      header: translate("FORM_TABLE_APERTURA_CAJA_COL_MONEDA"),
      accessorKey: "efectivo.descripcion",
    },

    {
      header: translate("FORM_TABLE_APERTURA_CAJA_COL_CANTIDAD"),
      accessorKey: "cantidad",
    },

    {
      header: translate("FORM_TABLE_APERTURA_CAJA_COL_MONTO"),
      accessorKey: "valor",
    },
    {
      header: translate("FORM_TABLE_APERTURA_CAJA_COL_APERTURA"),
      accessorKey: "tipo",
      meta: {
        filterType: "select",
        dataSelect: ["Apertura", "Cierre"],
      },
    },
  ]);

  //* ========== start: edit data ==========
  const [rowsEdit, setRowsEdit] = useState([{} as RowAperturaCajaType]);
  const showBtns = () => {
    return [
      {
        title: "Editar Apertura",
        icon: <IconSave />,
        fn: () => {
          const dataEdit = res?.data.filter(
            (item) => item.tipo.toLowerCase() === "apertura"
          );
          const rows = dataEdit?.map((item) => {
            return {
              idMoneda: item.efectivo.idMoneda,
              idEfectivo: item.efectivo.id,
              cantidad: item.cantidad,
              id: item.id,
            };
          });
          if (rows) {
            openModal();
            setRowsEdit(rows);
          }
        },
      },
      {
        title: "Editar Cierre",
        icon: <IconSave />,
        fn: () => {
          const dataEdit = res?.data.filter(
            (item) => item.tipo.toLowerCase() === "cierre"
          );
          const rows = dataEdit?.map((item) => {
            return {
              idMoneda: item.efectivo.idMoneda,
              idEfectivo: item.efectivo.id,
              cantidad: item.cantidad,
              id: item.id,
            };
          });
          if (rows) {
            openModal();
            setRowsEdit(rows);
          }
        },
      },
    ];
  };
  //* ========== end: edit data ==========

  return (
    <PageContainer title={translate("FORM_TABLE_APERTURA_CAJA_TITLE")}>
      <TableContainer
        name="aperturas"
        fixKey="id"
        columns={columns}
        data={res?.data}
        add={() => {
          openModal();
          setRowsEdit([]);
        }}
        reports={canView}
        reload={getData}
        controls={[]}
        buttons={showBtns()}
      />
      <Floating width="600px" state={state}>
        <PageContainer title={translate("FORM_TABLE_APERTURA_CAJA_TITLE_FORM")}>
          <FormAperturaCaja
            handleSaveData={handleSaveData}
            rowsEdit={rowsEdit}
            handleEditData={handleEditData}
          />
        </PageContainer>
      </Floating>
    </PageContainer>
  );
};

export default AperturaCaja;
