import TableContainer from "../../../components/common/table/tableContainer";
import { useGet } from "../../../components/hooks/useGet";
import { createColumns } from "../../../utils/createColumns";
import PageContainer from "../../../components/common/pageContainer";
import { useModal } from "../../../components/common/modal/useModal";
import Modal from "../../../components/common/modal/modal";
import Form from "../../../components/common/form/form";
import {
  libroDiarioSchema,
  LibroDiarioForm,
  LibroDiarioImportantShare,
  libroDiarioSchemaImportantShare,
} from "./validations/libroDiario";
import { ENDPOINTS } from "../../../types/enums/Endpoints";
import { MODELOS } from "@/types/enums/Modelos";
import { useAcceso } from "@/components/hooks/useAcceso";
import { LibroDiarioRes } from "@/types/res/LibroDiarioRes";
import { useRequest } from "@/components/hooks/useRequest";
import { alertSuccess } from "@/utils/alertsToast";
import { useContabilidad } from "@/context/contabilidad";
import { setAuthCookie } from "@/utils/authCookie";
import { useEffect, useState } from "react";
import { UsuarioSimpleRes } from "@/types/res/UsuarioRes";
import { useUser } from "@/context/user";

const LibroDiario = () => {
  const { setLibroDiarioActual, libroDiarioActivo } = useContabilidad();
  const [libroIsPrivado, setLibroIsPrivado] = useState<boolean>(false);
  const { res, pushData, modifyData, filterData, getData } = useGet<
    LibroDiarioRes[]
  >(ENDPOINTS.COMPARTIRLIBRODIARIO.GET);
  const response = res?.data.filter((row) =>
    libroIsPrivado
      ? row.visualizacion == "Privado"
      : row.visualizacion != "Privado"
  );
  const { res: resUser } = useGet<UsuarioSimpleRes[]>(ENDPOINTS.USUARIO.GET);
  const [usersBook, setUsersBook] = useState<UsuarioSimpleRes[]>([]);

  const [typeModal, setTypeModal] = useState<
    | { name: "form"; text: "Formulario de libro diario" }
    | {
        name: "important" | "share";
        text: "Asignar libro importante" | "Compartir";
        libro: LibroDiarioRes;
      }
  >({ name: "form", text: "Formulario de libro diario" });
  const { state, item, openModal, closeModal } = useModal<LibroDiarioRes>(
    typeModal.text
  );
  const { canAdd, canDelete, canEdit, canModify, canView } = useAcceso(
    MODELOS.LIBRO_DIARIO
  );
  const { user } = useUser();

  const { sendRequest } = useRequest();

  const columns = createColumns<LibroDiarioRes>([
    {
      header: "Nombre",
      accessorKey: "nombre",
    },
    {
      header: "Descripcion",
      accessorKey: "descripcion",
    },
    {
      header: "Activo",
      accessorFn: (row) => (row.activo ? "SI" : "NO"),
    },
    {
      header: "Fecha Inicio",
      accessorKey: "fechaInicio",
    },
    {
      header: "Fecha Cierre",
      accessorFn: (row) => (row.fechaCierre ? row.fechaCierre : "-"),
    },
  ]);

  const handleDeactivate = async (book: LibroDiarioRes) => {
    const res = await sendRequest<LibroDiarioRes>(
      ENDPOINTS.LIBRODIARIO.ACTIVEBOOK + book.id,
      null,
      {
        method: "PATCH",
      }
    );
    if (res) {
      if (libroDiarioActivo?.id == res.data.id) setLibroDiarioActual(res.data);
      getData();
      alertSuccess(res.message);
    }
  };

  const handleChangeLibro = async (newLibro: LibroDiarioRes) => {
    const res = await sendRequest<string>(
      ENDPOINTS.LIBRODIARIO.CHANGE + newLibro.id,
      null
    );
    if (res) {
      alertSuccess(res.message);
      setLibroDiarioActual(newLibro);
      setAuthCookie(res?.data);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key === "s") {
        setLibroIsPrivado(!libroIsPrivado);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [libroIsPrivado]);

  return (
    <PageContainer title={`Libro diario ${libroIsPrivado ? "privado" : ""}`}>
      <TableContainer
        name="libroDiario"
        fixKey="id"
        columns={columns}
        data={response}
        add={canAdd(() => {
          setTypeModal({ name: "form", text: "Formulario de libro diario" });
          openModal();
        })}
        reports={canView}
        reload={getData}
        controls={[
          {
            label: "Modificar",
            fn: (row) => {
              setTypeModal({
                name: "form",
                text: "Formulario de libro diario",
              });
              openModal(row);
            },
            on: (row) => canModify() && row.idUsuario == user?.id,
          },
          {
            label: "Desactivar",
            fn: (row) => {
              if (row.importante) {
                setTypeModal({
                  name: "important",
                  text: "Asignar libro importante",
                  libro: row,
                });
                openModal(row);
              } else {
                handleDeactivate(row);
              }
            },
            on: (row) =>
              canModify() && row.visualizacion != "Privado" && row.activo,
          },
          {
            label: "Usar",
            fn: (row) => {
              handleChangeLibro(row);
            },
          },
          {
            label: "Compartir",
            fn: async (row) => {
              setTypeModal({
                name: "share",
                text: "Compartir",
                libro: row,
              });
              const res = await sendRequest<UsuarioSimpleRes[]>(
                ENDPOINTS.COMPARTIRLIBRODIARIO.GETUSERSBYBOOK + row.id,
                null,
                {
                  method: "GET",
                }
              );
              if (res?.data != undefined) {
                setUsersBook(res?.data);
                openModal();
              }
            },
            on: (row) =>
              row.visualizacion == "Privado" && row.idUsuario == user?.id,
          },
        ]}
      />

      <Modal state={state}>
        {typeModal.name == "form" && (
          <Form<LibroDiarioRes | LibroDiarioRes[], LibroDiarioForm>
            item={item}
            initialValues={{
              fechaInicio: item?.fechaInicio || "",
              nombre: item?.nombre || "",
              descripcion: item?.descripcion || "",
            }}
            validationSchema={libroDiarioSchema}
            post={{
              route: ENDPOINTS.LIBRODIARIO.POST,
              onBody: (value) => value,
              onSuccess: (data) => {
                if (Array.isArray(data)) {
                  data.map((row) => pushData(row));
                }
                closeModal();
              },
            }}
            put={
              item?.activo && item?.visualizacion != "Privado"
                ? canEdit({
                    route: ENDPOINTS.LIBRODIARIO.PUT + item?.id,
                    onBody: (value) => value,
                    onSuccess: (data) => {
                      if (Array.isArray(data)) {
                        data.map((row) =>
                          modifyData(row, (value) => value.id === row.id)
                        );
                        closeModal();
                      }
                    },
                  })
                : undefined
            }
            del={
              !item?.activo &&
              item?.visualizacion != "Privado" &&
              item?.idUsuario == user?.id
                ? canDelete({
                    route: ENDPOINTS.LIBRODIARIO.DELETE + item?.id,
                    onSuccess: (data) => {
                      if (!Array.isArray(data)) {
                        filterData((value) => value.id !== data.id);
                        filterData((value) => value.idPadreLibro !== data.id);
                        closeModal();
                      }
                    },
                  })
                : undefined
            }
          >
            <Form.Column>
              <Form.Input name="nombre" title="Nombre" />
              <Form.Input name="descripcion" title="Descripcion" />
              <Form.Input name="fechaInicio" title="Fecha inicio" type="date" />
            </Form.Column>
          </Form>
        )}

        {(typeModal.name == "important" || typeModal.name == "share") && (
          <Form<LibroDiarioRes, LibroDiarioImportantShare>
            item={item}
            initialValues={{
              id:
                typeModal.name == "important"
                  ? ""
                  : usersBook?.map((user) => user.id.toString()) || [],
            }}
            validationSchema={
              typeModal.name == "important"
                ? libroDiarioSchemaImportantShare
                : undefined
            }
            put={
              item?.activo && typeModal.name == "important"
                ? canEdit({
                    route: ENDPOINTS.LIBRODIARIO.NEWIMPORTANT,
                    onBody: (value) => value,
                    onSuccess: (data) => {
                      getData();
                      closeModal();
                      if (libroDiarioActivo?.id == data.id)
                        setLibroDiarioActual(data);
                    },
                  })
                : undefined
            }
            post={{
              route: ENDPOINTS.COMPARTIRLIBRODIARIO.SHAREPRIVATE,
              onBody: (value) => ({ ...value, idLibro: typeModal.libro?.id }),
              onSuccess: () => {
                closeModal();
              },
            }}
          >
            <Form.Select
              name="id"
              title={
                typeModal.name == "important" ? "Libros diarios" : "Usuarios"
              }
              placeholder={
                typeModal.name == "important"
                  ? "Seleccione un libro"
                  : "Seleccione un usuario"
              }
            >
              {typeModal.name == "important"
                ? res?.data
                    .filter(
                      (filter) =>
                        filter.activo == true &&
                        filter.visualizacion != "Privado" &&
                        filter.id != item?.id
                    )
                    .map((data) => (
                      <Form.Option key={data.id} value={data.id.toString()}>
                        {data.nombre}
                      </Form.Option>
                    ))
                : resUser?.data
                    .filter((u) => u.id != user?.id)
                    .map((data) => (
                      <Form.Option key={data.id} value={data.id.toString()}>
                        {data.login}
                      </Form.Option>
                    ))}
            </Form.Select>
          </Form>
        )}
      </Modal>
    </PageContainer>
  );
};

export default LibroDiario;
