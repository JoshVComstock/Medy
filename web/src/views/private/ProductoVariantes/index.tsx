import TableContainer from "../../../components/common/table/tableContainer";
import { useGet } from "../../../components/hooks/useGet";
import { createColumns } from "../../../utils/createColumns";
import PageContainer from "../../../components/common/pageContainer";
import { useModal } from "../../../components/common/modal/useModal";
import { ENDPOINTS } from "../../../types/enums/Endpoints";
import { MODELOS } from "@/types/enums/Modelos";
import { useAcceso } from "@/components/hooks/useAcceso";
import Floating from "@/components/common/floating/floating";
import { ProductoRes } from "@/types/res/ProductoRes";
import Form from "@/components/common/form/form";
import { ProductoForm, productoSchema } from "./validations/producto";
import Title from "@/components/common/title/title";
import Tag from "@/components/common/tag/tag";
import InputFile from "@/components/common/form/inputFile/inputFile";
import { useRequest } from "@/components/hooks/useRequest";
import { alertSuccess } from "@/utils/alertsToast";
import { serverAPI } from "@/config";
import { useLang } from "@/context/lang";
import Dropdown from "@/components/common/dropdown/dropdown";
import Button from "@/components/common/button/button";

const ProductoVariantes = () => {
  const { translate } = useLang();
  const { res, modifyData, getData } = useGet<ProductoRes[]>(
    ENDPOINTS.PRODUCTO.GET
  );
  const { item, state, openModal, closeModal } = useModal<ProductoRes>(
    "Formulario de variante de producto"
  );
  const { canEdit, canView } = useAcceso(MODELOS.PRODUCTOS_VARIANTES);
  const { sendRequest } = useRequest();

  const columns = createColumns<ProductoRes>([
    {
      header: translate("TABLE_PRODUCTOS_VARIANTES_COL_NOMBRE"),
      accessorKey: "nombre",
    },
    {
      header: translate("TABLE_PRODUCTOS_VARIANTES_COL_DESCRIPCION"),
      accessorKey: "descripcion",
    },
    {
      header: translate("TABLE_PRODUCTOS_VARIANTES_COL_ATRIBUTOS"),
      accessorFn: (row) => {
        return row.atributos.map((a) => a.nombre).join(", ") || "N/A";
      },
    },
    {
      header: translate("TABLE_PRODUCTOS_VARIANTES_COL_CODIGO_INTERNO"),
      accessorKey: "codInterno",
    },
    {
      header: translate("TABLE_PRODUCTOS_VARIANTES_COL_VOLUMEN"),
      accessorKey: "volumen",
    },
    {
      header: translate("TABLE_PRODUCTOS_VARIANTES_COL_PESO"),
      accessorKey: "peso",
    },
    {
      header: translate("TABLE_PRODUCTOS_VARIANTES_COL_PHOTO"),
      cell: ({ cell: { row } }) =>
        row.original.pathImagen ? (
          <Dropdown
            toggleElement={
              <div className="flex justify-center">
                <Button size="small">Ver foto</Button>
              </div>
            }
          >
            <div className="w-full aspect-square flex justify-center">
              <img
                className="h-full aspect-square rounded-md"
                src={
                  row.original.pathImagen
                    ? serverAPI +
                      ENDPOINTS.STATIC.PRODUCT +
                      row.original.pathImagen
                    : undefined
                }
                alt={row.original.pathImagen}
              />
            </div>
          </Dropdown>
        ) : undefined,
    },
  ]);

  const handleSend = async (values: ProductoForm) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(values)) {
      formData.append(key, value as any);
    }
    const res = await sendRequest<ProductoRes>(
      ENDPOINTS.PRODUCTO.PUT + item?.id,
      formData,
      {
        method: "PUT",
      }
    );
    if (res) {
      modifyData(res.data, (value) => value.id === res.data.id);
      alertSuccess(res.message);
      closeModal();
    }
  };

  return (
    <PageContainer title={translate("MODELOS_PRODUCTOS_VARIANTES")}>
      <TableContainer
        name="productosVariantes"
        fixKey="id"
        columns={columns}
        data={res?.data}
        reports={canView}
        controls={[
          {
            label: "Modificar",
            fn: (row) => openModal(row),
            on: () => !!canEdit(true),
          },
        ]}
        reload={getData}
      />
      <Floating width="600px" state={state}>
        <PageContainer title="Formulario de productos" backRoute={closeModal}>
          <div className="w-full flex flex-col items-center gap-2 mb-4">
            <Title textAlign="center">{item?.nombre}</Title>
            <div className="flex gap-2">
              {item?.atributos.map((a) => (
                <Tag key={a.idAtributoValor}>{a.nombre}</Tag>
              ))}
            </div>
          </div>
          <Form<ProductoRes, ProductoForm>
            item={item}
            initialValues={{
              codBarras: item?.codBarras || "",
              codFabricante: item?.codFabricante || "",
              codInterno: item?.codInterno || "",
              peso: item?.peso || "",
              volumen: item?.volumen || "",
              pathImagen: null,
            }}
            validationSchema={productoSchema}
            put={canEdit(
              handleSend /* {
              route: ENDPOINTS.PRODUCTO.PUT + item?.id,
              onBody: (values) => ({
                ...values,
                pathImagen: null,
              }),
              onSuccess: (data) => {
                modifyData(data, (value) => value.id === data.id);
                closeModal();
              },
            } */
            )}
          >
            <div className="w-full mb-2">
              <InputFile
                defaultSrc={
                  item?.pathImagen
                    ? serverAPI + ENDPOINTS.STATIC.PRODUCT + item?.pathImagen
                    : undefined
                }
                title="Foto"
                name="pathImagen"
              />
            </div>
            <Form.Column>
              <Form.Input name="codBarras" title="Código interno" />
              <Form.Input name="codBarras" title="Código fabricante" />
              <Form.Input name="codBarras" title="Código barras" />
              <Form.Input type="number" name="volumen" title="Volumen" />
              <Form.Input type="number" name="peso" title="Peso" />
            </Form.Column>
          </Form>
        </PageContainer>
      </Floating>
    </PageContainer>
  );
};

export default ProductoVariantes;
