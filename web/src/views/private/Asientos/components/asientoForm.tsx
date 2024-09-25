import Form from "@/components/common/form/form";
import { AsientosRes } from "@/types/res/AsientosRes";
import { LocalAsientos, LocalAsientosRes } from "../interfaces/LocalAsientos";
import {
  AsientoForm as AsientoFormType,
  asientoSchema,
} from "../validations/asiento";
import { useRequest } from "@/components/hooks/useRequest";
import { TipoComprobantesRes } from "@/types/res/TipoComprobantesRes";
import { ENDPOINTS } from "@/types/enums/Endpoints";
import { useUser } from "@/context/user";
import { ModelState } from "@/types/enums/ModelState";
import { v4 as uuid } from "uuid";
import { alertSuccess } from "@/utils/alertsToast";
import PageContainer from "@/components/common/pageContainer";
import { useState } from "react";
import DetalleAsientos from "../../DetalleAsientos";
import { useContabilidad } from "@/context/contabilidad";

interface Props {
  setLocalAsientos: React.Dispatch<React.SetStateAction<LocalAsientos>>;
  closeModal: () => void;
  data: AsientosRes[] | undefined;
  viewLocal: boolean;
  pushData: (data: AsientosRes) => void;
  modifyData: (
    data: AsientosRes,
    condition: (value: AsientosRes) => boolean
  ) => void;
  filterData: (filter: (value: AsientosRes) => boolean) => void;
  canEdit: <T>(data?: T | undefined) => T | undefined;
  canDelete: <T>(data?: T | undefined) => T | undefined;
  localDetalles?: any;
  setLocalDetalles?: React.Dispatch<React.SetStateAction<any>>;
  item?: AsientosRes | LocalAsientosRes | null;
  idCuenta?: number;
}

const AsientoForm = ({
  setLocalAsientos,
  closeModal,
  item: propItem,
  data,
  viewLocal,
  filterData,
  modifyData,
  pushData,
  canDelete,
  canEdit,
  idCuenta,
  localDetalles,
  setLocalDetalles,
}: Props) => {
  const { sendRequest } = useRequest();
  const { user } = useUser();
  const [item, setItem] = useState<AsientosRes | LocalAsientosRes | null>(
    propItem || null
  );
  const { libroDiarioActivo } = useContabilidad();

  const addLocal = async (values: AsientoFormType) => {
    const res = await sendRequest<TipoComprobantesRes>(
      ENDPOINTS.TIPOCOMPROBANTES.FIND + values.idTipoComprobante,
      null,
      {
        method: "GET",
      }
    );
    if (res) {
      const newItem = {
        id: uuid(),
        concepto: values.concepto,
        fecha: values.fecha,
        idTipoComprobante: values.idTipoComprobante,
        tipoComprobante: res.data,
        numeroComprobante: values.numeroComprobante,
        fechaCreacion: new Date().toLocaleString(),
        idUsrCreacion: user?.id || null,
        idUsrModificacion: null,
        estado: ModelState.ACTIVE,
        fechaModificacion: new Date().toLocaleString(),
      };
      setLocalAsientos((old) => ({
        ...old,
        added: [...old.added, newItem],
      }));
      setItem(newItem);
      alertSuccess("Asiento añadido localmente");
    }
  };

  const updateLocal = async (values: AsientoFormType) => {
    if (!item || !data) return;
    const id = item.id;
    const exists = data.find((value) => value.id === id);
    const resTipoComprobante = await sendRequest<TipoComprobantesRes>(
      ENDPOINTS.TIPOCOMPROBANTES.FIND + values.idTipoComprobante,
      null,
      {
        method: "GET",
      }
    );
    if (!resTipoComprobante) return;
    if (exists) {
      const newValue: AsientosRes = {
        id: exists.id,
        concepto: values.concepto,
        fecha: values.fecha,
        idTipoComprobante: values.idTipoComprobante,
        numeroComprobante: values.numeroComprobante,
        tipoComprobante: resTipoComprobante.data,
        estado: exists.estado,
        fechaCreacion: exists.fechaCreacion,
        idUsrCreacion: exists.idUsrCreacion,
        idUsrModificacion: user?.id || null,
        fechaModificacion: new Date().toLocaleString(),
        activo: true,
      };
      setLocalAsientos((old) => {
        const modified = old.updated.some((value) => value.id === exists.id);
        let updated = [...old.updated, newValue];
        if (modified) {
          updated = old.updated.map((value) => {
            if (value.id === id) {
              return newValue;
            }
            return value;
          });
        }
        return {
          ...old,
          updated,
        };
      });
    } else {
      setLocalAsientos((old) => {
        return {
          ...old,
          added: old.added.map((value) => {
            if (value.id === id) {
              return {
                id: value.id,
                concepto: values.concepto,
                fecha: values.fecha,
                idTipoComprobante: values.idTipoComprobante,
                numeroComprobante: values.numeroComprobante,
                tipoComprobante: resTipoComprobante.data,
                estado: value.estado,
                fechaCreacion: value.fechaCreacion,
                idUsrCreacion: value.idUsrCreacion,
                idUsrModificacion: user?.id || null,
                fechaModificacion: new Date().toLocaleString(),
              };
            }
            return value;
          }),
        };
      });
    }
    alertSuccess("Asiento modificado localmente");
  };

  const removeLocal = () => {
    if (!item || !data) return;
    const id = item.id;
    const exists = data.find((value) => value.id === id);
    if (exists) {
      setLocalAsientos((old: LocalAsientos) => ({
        ...old,
        deleted: [...old.deleted, exists],
        updated: old.updated.filter((value) => value.id !== exists.id),
      }));
    } else {
      setLocalAsientos((old: LocalAsientos) => ({
        ...old,
        added: old.added.filter((value) => value.id !== id),
      }));
    }
    alertSuccess("Asiento eliminado localmente");
    closeModal();
  };

  return (
    <PageContainer
      title="Detalle de asientos"
      default={item?.concepto}
      titleRequestRoute={ENDPOINTS.ASIENTOS.FIND + item?.id}
      titleRequestKey="concepto"
      backRoute={closeModal}
    >
      <div className="flex flex-col gap-4 h-full">
        {!idCuenta && (
          <Form<AsientosRes | LocalAsientosRes, AsientoFormType>
            item={item}
            initialValues={{
              idTipoComprobante: item?.idTipoComprobante || "",
              numeroComprobante: item?.numeroComprobante || "",
              fecha: item?.fecha || "",
              concepto: item?.concepto || "",
            }}
            validationSchema={asientoSchema}
            post={
              viewLocal
                ? addLocal
                : {
                    route: ENDPOINTS.ASIENTOS.POST,
                    onBody: (value) => value,
                    onSuccess: (data) => {
                      pushData(data as AsientosRes);
                      closeModal();
                    },
                  }
            }
            put={libroDiarioActivo?.activo ?canEdit(
              viewLocal
                ? updateLocal
                : {
                    route: ENDPOINTS.ASIENTOS.PUT + item?.id,
                    onBody: (value) => value,
                    onSuccess: (data) => {
                      modifyData(
                        data as AsientosRes,
                        (value) => value.id === data.id
                      );
                      closeModal();
                    },
                  }
            ):undefined}
            del={libroDiarioActivo?.activo ? canDelete(
              viewLocal
                ? removeLocal
                : {
                    route: ENDPOINTS.ASIENTOS.DELETE + item?.id,
                    onSuccess: (data) => {
                      filterData((value) => value.id !== data.id);
                      closeModal();
                    },
                  }
            ):undefined}
            button={!idCuenta ? undefined : () => <></>}
          >
            <Form.Section row expandable title="Asiento" >
              <Form.Column>
                <Form.Select<TipoComprobantesRes>
                  name="idTipoComprobante"
                  title="Tipo comprobante"
                  route={ENDPOINTS.TIPOCOMPROBANTES.GET}
                  optionTextKey="nombre"
                  optionValueKey="id"
                  placeholder="Seleccione un tipo comprobante"
                  disabled = {!libroDiarioActivo?.activo}
                />
                <Form.Input
                  name="numeroComprobante"
                  title="Número comprobante"
                  disabled = {!libroDiarioActivo?.activo}
                />
              </Form.Column>
              <Form.Column>
                <Form.Input type="date" name="fecha" title="Fecha" disabled = {!libroDiarioActivo?.activo}/>
                <Form.Input name="concepto" title="Concepto" disabled = {!libroDiarioActivo?.activo}/>
              </Form.Column>
            </Form.Section>
          </Form>
        )}
        {item && (
            <DetalleAsientos
              viewLocal={viewLocal}
              localDetalles={localDetalles}
              setLocalDetalles={setLocalDetalles}
              asiento={item as AsientosRes}
            />
        )}
      </div>
    </PageContainer>
  );
};

export default AsientoForm;
