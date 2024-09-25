import TableContainer from "../../../components/common/table/tableContainer";
import { useGet } from "../../../components/hooks/useGet";
import { createColumns } from "../../../utils/createColumns";
import PageContainer from "../../../components/common/pageContainer";
import { useModal } from "../../../components/common/modal/useModal";
import Modal from "../../../components/common/modal/modal";
import Form from "../../../components/common/form/form";
import {
  EntregaDeEfectivoForm,
  entregaDeEfectivoSchema,
} from "./validations/entregaDeEfectivo";
import { ENDPOINTS } from "../../../types/enums/Endpoints";
import { MODELOS } from "@/types/enums/Modelos";
import { useAcceso } from "@/components/hooks/useAcceso";
import { EntregaDeEfectivoRes } from "@/types/res/EntregaDeEfectivoRes";
import { useEffect, useState } from "react";
import Input from "@/components/common/inputs/input";
import { formatDate } from "@/utils/date";
import { useLang } from "@/context/lang";
import { ModelMonedas } from "@/types/enums/Monedsa";
import { alertError } from "@/utils/alertsToast";
import { useContabilidad } from "@/context/contabilidad";

const EntregaDeEfectivo = () => {
  const { res, pushData, modifyData, filterData, getData } = useGet<
    EntregaDeEfectivoRes[]
  >(ENDPOINTS.ENTREGADEEFECTIVO.GET);
  const { cambioActual } = useContabilidad();
  const { translate } = useLang();
  const { state, item, openModal, closeModal } = useModal<EntregaDeEfectivoRes>(
    translate("FORM_TABLE_ENTREGA_DE_EFECTIVO_TITULO")
  );
  const { canAdd, canDelete, canEdit, canModify, canView } = useAcceso(
    MODELOS.ENTREGA_DE_EFECTIVO
  );
  const [amount, setAmount] = useState(0);
  const [amountConversion, setAmountConversion] = useState(0);
  const [title, setTitle] = useState(ModelMonedas.BS);
  const [titleConversion, setTitleConversion] = useState(ModelMonedas.US);
  const exchangeRate = cambioActual;

  const columns = createColumns<EntregaDeEfectivoRes>([
    {
      header: "Fecha",
      accessorFn: (row) => formatDate(row.fechaCreacion),
      meta: {
        filterType: "date",
      },
    },
    {
      header: translate("FORM_TABLE_ENTREGA_DE_EFECTIVO_CAJERA"),
      accessorKey: "cajera",
    },
    {
      header: translate("FORM_TABLE_ENTREGA_DE_EFECTIVO_DESCRIPCION"),
      accessorKey: "descripcion",
    },
    {
      header: translate("FORM_TABLE_ENTREGA_DE_EFECTIVO_MONTOBS"),
      accessorKey: "montoBs",
    },
    {
      header: translate("FORM_TABLE_ENTREGA_DE_EFECTIVO_MONTOSUS"),
      accessorKey: "montoSus",
    },
  ]);

  const closeModalCustomized = () => {
    setAmountConversion(0);
    setAmount(0);
    closeModal();
  };

  const currencyConversion = (value: number): number => {
    if (exchangeRate) {
      if (titleConversion === ModelMonedas.BS) {
        value = value * (1 / exchangeRate.dolar);
      } else if (titleConversion === ModelMonedas.US) {
        value = value * exchangeRate.dolar;
      }
    }
    return value;
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value < 0) {
      return;
    }
    setAmount(value);
    setAmountConversion(currencyConversion(value));
  };

  const saveAmounts = (value: EntregaDeEfectivoForm) => {
    console.log(value);
    if (title == ModelMonedas.BS) {
      value.montoBs = amount;
      value.montoSus = amountConversion;
    }
    if (title == ModelMonedas.US) {
      value.montoBs = amountConversion;
      value.montoSus = amount;
    }
    return value;
  };

  const onChangeSelect = (e: ModelMonedas) => {
    if (!e) {
      return;
    }
    const isBs = e === ModelMonedas.BS;
    const bs = item ? item.montoBs : isBs ? currencyConversion(amount) : amount;
    const sus = item
      ? item.montoSus
      : isBs
      ? amount
      : currencyConversion(amount);
    setTitleConversion(isBs ? ModelMonedas.US : ModelMonedas.BS);
    setAmountConversion(isBs ? sus : bs);
    setAmount(isBs ? bs : sus);
    setTitle(e);
  };
  state.closeModal = closeModalCustomized;

  useEffect(() => {
    if (item) {
      setAmount(item.montoBs);
      setAmountConversion(item.montoSus);
    }
  }, [item]);

  return (
    <PageContainer title={translate("FORM_TABLE_ENTREGA_DE_EFECTIVO_TITULO")}>
      <TableContainer
        name="Entrega de efectivo"
        fixKey="id"
        columns={columns}
        data={res?.data}
        add={canAdd(() => {
          exchangeRate ? openModal() : alertError("Agregue un tipo de cambio");
        })}
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
        <Form<EntregaDeEfectivoRes, EntregaDeEfectivoForm>
          item={item}
          initialValues={{
            descripcion: item?.descripcion || "",
            montoBs: item?.montoBs || 0,
            montoSus: item?.montoSus || 0,
            cajera: item?.cajera || "",
            moneda: item?.moneda || ModelMonedas.BS,
          }}
          validationSchema={entregaDeEfectivoSchema}
          post={{
            route: ENDPOINTS.ENTREGADEEFECTIVO.POST,
            onBody: (value) => saveAmounts(value),
            onSuccess: (data) => {
              pushData(data);
              closeModalCustomized();
            },
          }}
          put={canEdit({
            route: ENDPOINTS.ENTREGADEEFECTIVO.PUT + item?.id,
            onBody: (value) => saveAmounts(value),
            onSuccess: (data) => {
              modifyData(data, (value) => value.id === data.id);
              closeModalCustomized();
            },
          })}
          del={canDelete({
            route: ENDPOINTS.ENTREGADEEFECTIVO.DELETE + item?.id,
            onSuccess: (data) => {
              filterData((value) => value.id !== data.id);
              closeModalCustomized();
            },
          })}
        >
          <Form.Column>
            <Form.Select
              onChange={onChangeSelect}
              name="moneda"
              title={translate("FORM_TABLE_ENTREGA_DE_EFECTIVO_SELECT")}
            >
              <Form.Option key={1} value={ModelMonedas.BS}>
                Bs
              </Form.Option>
              <Form.Option key={2} value={ModelMonedas.US}>
                Sus
              </Form.Option>
            </Form.Select>
            <Input
              value={String(amount)}
              onChange={(e) => onChangeInput(e)}
              type="number"
              title={`${translate(
                "FORM_TABLE_ENTREGA_DE_EFECTIVO_MONTO"
              )} ${title}`}
              placeholder="ingrese efectivo"
            />
            {(!item ||
              (item &&
                formatDate(item.fechaCreacion) == exchangeRate?.fecha)) && (
              <div>
                {titleConversion} {amountConversion.toFixed(4)}
              </div>
            )}
            <Form.Input
              name="descripcion"
              title={translate("FORM_TABLE_ENTREGA_DE_EFECTIVO_DESCRIPCION")}
              type="text"
            />
            <Form.Input
              name="cajera"
              title={translate("FORM_TABLE_ENTREGA_DE_EFECTIVO_CAJERA")}
              type="text"
            />
          </Form.Column>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default EntregaDeEfectivo;
