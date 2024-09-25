import PageContainer from "../../../components/common/pageContainer";
import TableContainer from "../../../components/common/table/tableContainer";
import Modal from "../../../components/common/modal/modal";
import Form from "../../../components/common/form/form";
import { createColumns } from "../../../utils/createColumns";
import { CategoriaRes } from "../../../types/res/CategoriaRes";
import { useGet } from "../../../components/hooks/useGet";
import { useModal } from "../../../components/common/modal/useModal";
import { CategoriaForm, categoriaSchema } from "./validations/categoria";
import { ENDPOINTS } from "../../../types/enums/Endpoints";
import { useEffect, useState } from "react";
import KeyboardEventHandler from "@/utils/Keyboard";

const Categoria = () => {
  const { res, pushData, modifyData, filterData, getData } = useGet<
    CategoriaRes[]
  >(ENDPOINTS.CATEGORIAS.GET);
  const { state, item, openModal, closeModal } = useModal<CategoriaRes>(
    "Formulario categoria"
  );
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(ENDPOINTS.CONTACTO.GET);
        if (response.ok) {
          const data = await response.json();
          const employees = data.map((employee: any) => employee.name); 
          setSuggestions(employees);
        } else {
          throw new Error("Error al obtener la lista de empleados");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmployees();
  }, []);

  const handleMention = (employees: string[]) => {
    setSuggestions(employees);
  };
  const columns = createColumns<CategoriaRes>([
    {
      header: "Nombre",
      accessorKey: "nombre",
    },
    {
      header: "Padre",
      accessorKey: "idPadre",
    },
    {
      header: "Nombre completo",
      accessorKey: "nombreCompleto",
    },
    {
      header: "Path padre",
      accessorKey: "pathPadre",
    },
    {
      header: "Estrategia de eliminiacion",
      accessorKey: "idEstrategiaEliminacion",
    },
    {
      header: "Metodo embalaje",
      accessorKey: "metodoEmbalaje",
    },
    {
      header: "Estado",
      accessorKey: "estado",
    },
  ]);

  return (
    <PageContainer title="Categoria">
      <KeyboardEventHandler onMention={handleMention} />
      <TableContainer
        name="categorias"
        fixKey="id"
        columns={columns}
        data={res?.data}
        add={() => openModal()}
        controls={[
          {
            label: "Modificar",
            fn: (row) => openModal(row),
          },
        ]}
        reload={getData}
      />
      <Modal state={state}>
        <Form<CategoriaRes, CategoriaForm>
          item={item}
          initialValues={{
            idPadre: "1",
            nombre: item?.nombre || "",
            nombreCompleto: item?.nombreCompleto || "",
            pathPadre: item?.pathPadre || "",
            idEstrategiaEliminacion: "1",
            metodoEmbalaje: item?.metodoEmbalaje || "",
          }}
          validationSchema={categoriaSchema}
          post={{
            route: ENDPOINTS.CATEGORIAS.POST,
            onBody: (value) => value,
            onSuccess: (data) => {
              pushData(data);
              closeModal();
            },
          }}
          put={{
            route: ENDPOINTS.CATEGORIAS.PUT + item?.id,
            onBody: (value) => value,
            onSuccess: (data) => {
              modifyData(data, (value) => value.id === data.id);
              closeModal();
            },
          }}
          del={{
            route: ENDPOINTS.CATEGORIAS.DELETE + item?.id,
            onSuccess: (data) => {
              filterData((value) => value.id !== data.id);
              closeModal();
            },
          }}
        >
          <Form.Column>
            <Form.Input name="nombre" title="Nombre" />
            <Form.Input name="nombreCompleto" title="Nombre completo" />
            <Form.Input name="metodoEmbalaje" title="Metodo embalaje" />
            <Form.Input name="pathPadre" title="Path Padre" />
          </Form.Column>
        </Form>
      </Modal>
      <ul>
        {suggestions.map((employee, index) => (
          <li key={index}>{employee}</li>
        ))}
      </ul>
    </PageContainer>
  );
};

export default Categoria;
