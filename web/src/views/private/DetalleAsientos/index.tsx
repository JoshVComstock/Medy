import TableContainer from "../../../components/common/table/tableContainer";
import { useGet } from "../../../components/hooks/useGet";
import { createColumns } from "../../../utils/createColumns";
import { useModal } from "../../../components/common/modal/useModal";
import Modal from "../../../components/common/modal/modal";
import Form from "../../../components/common/form/form";
import { DetalleAsientosRes } from "../../../types/res/DetalleAsientosRes";
import {
  DetalleAsientoForm,
  detalleAsientoSchema,
} from "./validations/detalleAsiento";
import { CuentasRes } from "../../../types/res/CuentasRes";
import { AsientosRes } from "../../../types/res/AsientosRes";
import { ENDPOINTS } from "../../../types/enums/Endpoints";
import {
  LocalDetalleAsientos,
  LocalDetalleAsientosRes,
} from "../Asientos/interfaces/LocalAsientos";
import { useRequest } from "@/components/hooks/useRequest";
import { v4 as uuid } from "uuid";
import { ModelState } from "@/types/enums/ModelState";
import { alertError, alertSuccess } from "@/utils/alertsToast";
import { useUser } from "@/context/user";
import { useEffect } from "react";
import { tailwindColors } from "@/utils/tailwindConfig";
import { MODELOS } from "@/types/enums/Modelos";
import { useAcceso } from "@/components/hooks/useAcceso";
import { useContabilidad } from "@/context/contabilidad";
import Tag from "@/components/common/tag/tag";
import { formatDate } from "@/utils/date";
import { ModelMonedas } from "@/types/enums/Monedsa";

interface Props {
  viewLocal?: boolean;
  localDetalles?: any;
  setLocalDetalles?: React.Dispatch<React.SetStateAction<any>>;
  asiento?: AsientosRes | null;
  idCuenta?: number;
}

const DetalleAsientos = ({
  asiento,
  localDetalles,
  setLocalDetalles,
  viewLocal,
  idCuenta,
}: Props) => {
  const isDetallePage = !!asiento;
  const isNew = viewLocal && typeof asiento?.id === "string";

  const { res, setRes, pushData, modifyData, filterData, getData } = useGet<
    DetalleAsientosRes[]
  >(
    isDetallePage
      ? ENDPOINTS.DETALLEASIENTOS.GETBYASIENTO + asiento.id
      : ENDPOINTS.DETALLEASIENTOS.GETBYCUENTA + idCuenta,
    {
      send: !isNew,
    }
  );

  const sumaHaber =
    (res?.data.reduce((total, row) => {
      if (!viewLocal) return total + row.haberBs;
      const existsInDeleted = localDetalles.deleted.find(
        (local: any) => local.id === row.id
      );
      if (existsInDeleted) return total;
      const existsInLocal = localDetalles.updated.find(
        (local: any) => local.id === row.id
      );
      return total + (existsInLocal ? existsInLocal.haberBs : row.haberBs);
    }, 0) || 0) +
    (viewLocal
      ? localDetalles.added
          .filter((row: any) => String(row.idAsiento) === String(asiento?.id))
          .reduce((total: number, row: any) => total + row.haberBs, 0) || 0
      : 0);

  const sumaDebe =
    (res?.data.reduce((total, row) => {
      if (!viewLocal) return total + row.debeBs;
      const existsInDeleted = localDetalles.deleted.find(
        (local: any) => local.id === row.id
      );
      if (existsInDeleted) return total;
      const existsInLocal = localDetalles.updated.find(
        (local: any) => local.id === row.id
      );
      return total + (existsInLocal ? existsInLocal.debeBs : row.debeBs);
    }, 0) || 0) +
    (viewLocal
      ? localDetalles.added
          .filter((row: any) => String(row.idAsiento) === String(asiento?.id))
          .reduce((total: number, row: any) => total + row.debeBs, 0) || 0
      : 0);

  const balance = sumaHaber - sumaDebe;

  const { libroDiarioActivo } = useContabilidad();

  const { state, item, openModal, closeModal } = useModal<
    DetalleAsientosRes | LocalDetalleAsientosRes
  >("Formulario de detalle asiento");
  const { sendRequest } = useRequest();
  const { user } = useUser();
  const { cambioActual } = useContabilidad();
  const {
    canAdd: canAddDetalle,
    canDelete: canDeleteDetalle,
    canEdit: canEditDetalle,
    canModify: canModifyDetalle,
    canView: canViewDetalle,
  } = useAcceso(MODELOS.DETALLE_DE_ASIENTOS);
  const {
    canDelete: canDeleteLibro,
    canEdit: canEditLibro,
    canModify: canModifyLibro,
    canView: canViewLibro,
  } = useAcceso(MODELOS.LIBRO_MAYOR);

  const columns = createColumns<DetalleAsientosRes>([
    {
      header: "Debe Bs.",
      accessorKey: "debeBs",
    },
    {
      header: "Debe $us.",
      accessorKey: "debeSus",
    },
    {
      header: "Haber Bs.",
      accessorKey: "haberBs",
    },
    {
      header: "Haber $us.",
      accessorKey: "haberSus",
    },
    {
      header: "Glosa",
      accessorKey: "glosa",
    },
  ]);

  if (isDetallePage) {
    columns.unshift({
      header: "Cuenta",
      accessorFn: (row) => row.cuenta.codigo,
      meta: {
        isRelational: "cuenta",
      },
    });
  }
  if (idCuenta) {
    columns.unshift({
      header: "Asiento",
      accessorKey: "conceptoAsiento",
    });
  }

  const addLocal = async (values: DetalleAsientoForm) => {
    if (!setLocalDetalles) return;
    if (!cambioActual) return;
    const res = await sendRequest<CuentasRes>(
      ENDPOINTS.CUENTAS.FIND + values.idCuenta,
      null,
      {
        method: "GET",
      }
    );
    if (res) {
      setLocalDetalles((old: LocalDetalleAsientos) => ({
        ...old,
        added: [
          ...old.added,
          {
            id: uuid(),
            idCuenta: values.idCuenta,
            idAsiento: String(asiento?.id),
            cuenta: res.data,
            moneda: values.moneda,
            debeBs: values.debeSus
              ? values.debeSus / cambioActual.dolar
              : values.debeBs || null,
            debeSus: values.debeBs
              ? values.debeBs * cambioActual.dolar
              : values.debeSus || null,
            haberBs: values.haberSus
              ? values.haberSus / cambioActual.dolar
              : values.haberBs || null,
            haberSus: values.haberBs
              ? values.haberBs * cambioActual.dolar
              : values.haberSus || null,
            glosa: values.glosa,
            idUsrCreacion: user?.id,
            idUsrModificacion: null,
            estado: ModelState.ACTIVE,
          },
        ],
      }));
      alertSuccess("Detalle añadido localmente");
      closeModal();
    }
  };

  const updateLocal = async (values: DetalleAsientoForm) => {
    if (!item || !res) return;
    if (!setLocalDetalles) return;
    if (!cambioActual) return;
    const id = item.id;
    const exists = res.data.find((value) => value.id === id);
    const resCuenta = await sendRequest<CuentasRes>(
      ENDPOINTS.CUENTAS.FIND + values.idCuenta,
      null,
      {
        method: "GET",
      }
    );
    if (!resCuenta) return;
    if (exists) {
      const newValue = {
        id: exists.id,
        idAsiento: String(asiento?.id),
        idCuenta: values.idCuenta,
        cuenta: resCuenta.data,
        moneda: values.moneda,
        debeBs: values.debeSus
          ? values.debeSus / cambioActual.dolar
          : values.debeBs || null,
        debeSus: values.debeBs
          ? values.debeBs * cambioActual.dolar
          : values.debeSus || null,
        haberBs: values.haberSus
          ? values.haberSus / cambioActual.dolar
          : values.haberBs || null,
        haberSus: values.haberBs
          ? values.haberBs * cambioActual.dolar
          : values.haberSus || null,
        glosa: values.glosa,
        idUsrCreacion: exists.idUsrCreacion,
        idUsrModificacion: user?.id,
        estado: exists.estado,
      };
      setLocalDetalles((old: LocalDetalleAsientos) => {
        const modified = old.updated.some((value) => value.id === exists.id);
        return {
          ...old,
          updated: modified
            ? old.updated.map((value) => {
                if (value.id === id) {
                  return newValue;
                }
                return value;
              })
            : [...old.updated, newValue],
        };
      });
    } else {
      setLocalDetalles((old: LocalDetalleAsientos) => {
        return {
          ...old,
          added: old.added.map((value) => {
            if (value.id === id) {
              return {
                id: value.id,
                idAsiento: String(asiento?.id),
                idCuenta: values.idCuenta,
                cuenta: resCuenta.data,
                moneda: values.moneda,
                glosa: values.glosa,
                debeBs: values.debeSus
                  ? values.debeSus / cambioActual.dolar
                  : values.debeBs || null,
                debeSus: values.debeBs
                  ? values.debeBs * cambioActual.dolar
                  : values.debeSus || null,
                haberBs: values.haberSus
                  ? values.haberSus / cambioActual.dolar
                  : values.haberBs || null,
                haberSus: values.haberBs
                  ? values.haberBs * cambioActual.dolar
                  : values.haberSus || null,
                estado: value.estado,
                idUsrCreacion: value.idUsrCreacion,
                idUsrModificacion: value.idUsrModificacion,
              };
            }
            return value;
          }),
        };
      });
    }
    alertSuccess("Detalle modificado localmente");
    closeModal();
  };

  const removeLocal = () => {
    if (!item || !res) return;
    if (!setLocalDetalles) return;
    const id = item.id;
    const exists = res.data.find((value) => value.id === id);
    if (exists) {
      setLocalDetalles((old: LocalDetalleAsientos) => ({
        ...old,
        deleted: [...old.deleted, exists],
        updated: old.updated.filter((value) => value.id !== exists.id),
      }));
    } else {
      setLocalDetalles((old: LocalDetalleAsientos) => ({
        ...old,
        added: old.added.filter((value) => value.id !== id),
      }));
    }
    alertSuccess("Asiento eliminado localmente");
    closeModal();
  };

  const renderData = () => {
    if (!res?.data) return undefined;
    if (!viewLocal) return res.data;
    return [
      ...res.data
        // OBJETOS ELIMINADOS
        /* .filter(
          (value) =>
            !localDetalles.deleted
              .map((value: DetalleAsientosRes) => value.id)
              .includes(value.id)
        ) */
        // OBJETOS MODIFICADOS
        .map((value) => {
          const isUpdated = localDetalles.updated.find(
            (v: DetalleAsientosRes) => v.id === value.id
          );
          if (!isUpdated) return value;
          return isUpdated;
        }),
      // OBJETOS AGREGADOS
      ...localDetalles.added.filter((v: DetalleAsientosRes) => {
        return v.idAsiento == asiento?.id;
      }),
    ];
  };

  const restoreLocal = (row: DetalleAsientosRes | LocalDetalleAsientosRes) => {
    if (!setLocalDetalles) return;
    setLocalDetalles((old: LocalDetalleAsientos) => ({
      ...old,
      deleted: old.deleted.filter((value) => value.id !== row.id),
    }));
    alertSuccess("Asiento restaurado correctamente");
    closeModal();
  };

  const returnColors = (row: DetalleAsientosRes | LocalDetalleAsientosRes) => {
    if (!viewLocal) return undefined;
    if (
      localDetalles.added.some((v: LocalDetalleAsientosRes) => v.id === row.id)
    )
      return tailwindColors.green["100"];
    if (localDetalles.updated.some((v: DetalleAsientosRes) => v.id === row.id))
      return tailwindColors.amber["100"];
    if (localDetalles.deleted.some((v: DetalleAsientosRes) => v.id === row.id))
      return tailwindColors.rose["100"];
    return undefined;
  };

  useEffect(() => {
    if (isNew) {
      setRes({
        data: [],
        message: "Nuevos detalles",
        status: 200,
      });
    }
  }, []);

  const controls = [
    {
      label: "Restaurar",
      fn: (row: any) => restoreLocal(row),
      on: (row: any) =>
        localDetalles?.deleted.some((v: DetalleAsientosRes) => v.id === row.id),
    },
  ];
  if (isDetallePage && libroDiarioActivo?.activo) {
    controls.push({
      label: "Modificar",
      fn: (row) => openModal(row),
      on: (row) =>
        isDetallePage
          ? canModifyDetalle() &&
            !localDetalles?.deleted.some(
              (v: DetalleAsientosRes) => v.id === row.id
            )
          : canModifyLibro(),
    });
  }
  return (
    <>
      {isDetallePage && (
        <div className="flex gap-2 justify-end">
          <Tag>Haber: {sumaHaber}</Tag>
          <Tag>Debe: {sumaDebe}</Tag>
          <Tag color={balance === 0 ? "success" : "danger"}>
            Balance: {balance}
          </Tag>
        </div>
      )}
      <div className="flex-1">
        <TableContainer
          name={isDetallePage ? "detalleAsientos" : "libroMayor"}
          fixKey="id"
          columns={columns}
          data={renderData()}
          add={
            isDetallePage && libroDiarioActivo?.activo
              ? canAddDetalle(() => openModal())
              : undefined
          }
          reports={isDetallePage ? canViewDetalle : canViewLibro}
          controls={controls}
          reload={getData}
          rowStyle={(row) => ({
            background: returnColors(row),
          })}
        />
        <Modal state={state}>
          <Form<
            DetalleAsientosRes | LocalDetalleAsientosRes,
            DetalleAsientoForm
          >
            item={item}
            initialValues={{
              idCuenta: idCuenta || item?.idCuenta || "",
              idAsiento: asiento?.id || item?.idAsiento || "",
              moneda: item?.moneda || ModelMonedas.BS,
              glosa: item?.glosa || "",
              debeBs: item?.debeBs || "",
              debeSus: item?.debeSus || "",
              haberBs: item?.haberBs || "",
              haberSus: item?.haberSus || "",
            }}
            validationSchema={detalleAsientoSchema}
            post={
              viewLocal
                ? addLocal
                : {
                    route: ENDPOINTS.DETALLEASIENTOS.POST,
                    onBody: (value) => {
                      if (!cambioActual) return value;
                      return {
                        ...value,
                        debeBs: value.debeSus
                          ? value.debeSus / cambioActual.dolar
                          : value.debeBs || null,
                        debeSus: value.debeBs
                          ? value.debeBs * cambioActual.dolar
                          : value.debeSus || null,
                        haberBs: value.haberSus
                          ? value.haberSus / cambioActual.dolar
                          : value.haberBs || null,
                        haberSus: value.haberBs
                          ? value.haberBs * cambioActual.dolar
                          : value.haberSus || null,
                      };
                    },
                    onSuccess: (data) => {
                      pushData(data as DetalleAsientosRes);
                      closeModal();
                    },
                  }
            }
            debug
            put={
              isDetallePage
                ? canEditDetalle(
                    viewLocal
                      ? updateLocal
                      : {
                          route: ENDPOINTS.DETALLEASIENTOS.PUT + item?.id,
                          onBody: (value) => {
                            if (!cambioActual) return value;
                            return {
                              ...value,
                              debeBs: value.debeSus
                                ? value.debeSus / cambioActual.dolar
                                : value.debeBs || null,
                              debeSus: value.debeBs
                                ? value.debeBs * cambioActual.dolar
                                : value.debeSus || null,
                              haberBs: value.haberSus
                                ? value.haberSus / cambioActual.dolar
                                : value.haberBs || null,
                              haberSus: value.haberBs
                                ? value.haberBs * cambioActual.dolar
                                : value.haberSus || null,
                            };
                          },
                          onSuccess: (data) => {
                            modifyData(
                              data as DetalleAsientosRes,
                              (value) => value.id === data.id
                            );
                            closeModal();
                          },
                        }
                  )
                : canEditLibro({
                    route: ENDPOINTS.DETALLEASIENTOS.PUT + item?.id,
                    onBody: (value) => value,
                    onSuccess: (data) => {
                      modifyData(
                        data as DetalleAsientosRes,
                        (value) => value.id === data.id
                      );
                      closeModal();
                    },
                  })
            }
            del={
              isDetallePage
                ? canDeleteDetalle(
                    viewLocal
                      ? removeLocal
                      : {
                          route: ENDPOINTS.DETALLEASIENTOS.DELETE + item?.id,
                          onSuccess: (data) => {
                            filterData((value) => value.id !== data.id);
                            closeModal();
                          },
                        }
                  )
                : canDeleteLibro({
                    route: ENDPOINTS.DETALLEASIENTOS.DELETE + item?.id,
                    onSuccess: (data) => {
                      filterData((value) => value.id !== data.id);
                      closeModal();
                    },
                  })
            }
            validateBeforeSend={(values) => {
              console.log(
                !String(values.debeBs).trim() && !String(values.haberBs).trim()
              );
              if (
                (values.moneda === ModelMonedas.BS &&
                  String(values.debeBs).trim() &&
                  String(values.haberBs).trim()) ||
                (values.moneda === ModelMonedas.US &&
                  String(values.debeSus).trim() &&
                  String(values.haberSus).trim())
              ) {
                alertError(`Solo tiene que colocar uno, "Debe" o "Haber"`);
                return false;
              }
              if (
                (values.moneda === ModelMonedas.BS &&
                  !String(values.debeBs).trim() &&
                  !String(values.haberBs).trim()) ||
                (values.moneda === ModelMonedas.US &&
                  !String(values.debeSus).trim() &&
                  !String(values.haberSus).trim())
              ) {
                alertError(`Tiene que colocar "Debe" o "Haber"`);
                return false;
              }
              return true;
            }}
          >
            <Form.Column>
              {isDetallePage && (
                <Form.Select<CuentasRes>
                  name="idCuenta"
                  title="Cuenta"
                  route={ENDPOINTS.CUENTAS.GETMAYOR}
                  optionValueKey="id"
                  optionTextFn={(item) =>
                    `${item.codigo} - ${item.descripcion}`
                  }
                  placeholder="Seleccione una cuenta"
                  searchable
                />
              )}
              {idCuenta && (
                <Form.Select<AsientosRes>
                  name="idAsiento"
                  title="Asiento"
                  route={ENDPOINTS.ASIENTOS.GET}
                  optionValueKey="id"
                  optionTextKey="concepto"
                  placeholder="Seleccione un asiento"
                />
              )}
              <Form.Input name="glosa" title="Glosa" />
              <Form.Select name="moneda" title="Moneda">
                <Form.Option value={ModelMonedas.BS}>Bs</Form.Option>
                <Form.Option value={ModelMonedas.US}>US$</Form.Option>
              </Form.Select>
              <Form.Input
                name="debeBs"
                title="Debe Bs."
                condition={(values) => values.moneda === ModelMonedas.BS}
                type="number"
                noAutoComplete
              />
              <Form.Detail
                condition={(values) => {
                  if (
                    values.moneda === ModelMonedas.BS &&
                    (!item ||
                      (item.fechaCreacion &&
                        formatDate(item.fechaCreacion) == cambioActual?.fecha))
                  ) {
                    return true;
                  }
                  return false;
                }}
              >
                {(values) => {
                  if (!values.debeBs) return "US$:";
                  const value = Number(values.debeBs);
                  if (isNaN(value)) return "US$:";
                  if (!cambioActual) return "US$:";
                  const cambio = cambioActual.dolar * value;
                  return "US$: " + String(cambio);
                }}
              </Form.Detail>
              <Form.Input
                name="haberBs"
                title="Haber Bs."
                condition={(values) => values.moneda === ModelMonedas.BS}
                type="number"
                noAutoComplete
              />
              <Form.Detail
                condition={(values) => {
                  if (
                    values.moneda === ModelMonedas.BS &&
                    (!item ||
                      (item.fechaCreacion &&
                        formatDate(item.fechaCreacion) == cambioActual?.fecha))
                  ) {
                    return true;
                  }
                  return false;
                }}
              >
                {(values) => {
                  if (!values.haberBs) return "US$:";
                  const value = Number(values.haberBs);
                  if (isNaN(value)) return "US$:";
                  if (!cambioActual) return "US$:";
                  const cambio = cambioActual.dolar * value;
                  return "US$: " + String(cambio);
                }}
              </Form.Detail>
              <Form.Input
                name="debeSus"
                title="Debe US$."
                condition={(values) => values.moneda === ModelMonedas.US}
                type="number"
                noAutoComplete
              />
              <Form.Detail
                condition={(values) => {
                  if (
                    values.moneda === ModelMonedas.US &&
                    (!item ||
                      (item.fechaCreacion &&
                        formatDate(item.fechaCreacion) == cambioActual?.fecha))
                  ) {
                    return true;
                  }
                  return false;
                }}
              >
                {(values) => {
                  if (!values.debeSus) return "Bs:";
                  const value = Number(values.debeSus);
                  if (isNaN(value)) return "Bs:";
                  if (!cambioActual) return "Bs:";
                  const cambio = value / cambioActual.dolar;
                  return "Bs: " + String(cambio);
                }}
              </Form.Detail>
              <Form.Input
                name="haberSus"
                title="Haber US$."
                condition={(values) => values.moneda === ModelMonedas.US}
                type="number"
                noAutoComplete
              />
              <Form.Detail
                condition={(values) => {
                  if (
                    values.moneda === ModelMonedas.US &&
                    (!item ||
                      (item.fechaCreacion &&
                        formatDate(item.fechaCreacion) == cambioActual?.fecha))
                  ) {
                    return true;
                  }
                  return false;
                }}
              >
                {(values) => {
                  if (!values.haberSus) return "Bs:";
                  const value = Number(values.haberSus);
                  if (isNaN(value)) return "Bs:";
                  if (!cambioActual) return "Bs:";
                  const cambio = value / cambioActual.dolar;
                  return "Bs: " + String(cambio);
                }}
              </Form.Detail>
            </Form.Column>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default DetalleAsientos;
