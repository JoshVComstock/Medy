/* import { useState } from "react";
import Button from "@/components/common/button/button";
import Form from "@/components/common/form/form";
import { alertError, alertSuccess } from "@/utils/alertsToast";
import { ENDPOINTS } from "@/types/enums/Endpoints";
import { Atributo, AtributoValorRes } from "../../Atributo/interfaces/atributo";
import { useRequest } from "@/components/hooks/useRequest";
import { v4 as uuid } from "uuid";
import IconX from "@assets/icons/iconX";
import { ProductoBaseRes } from "@/types/res/ProductoBaseRes";
import IconAdd from "@assets/icons/iconAdd";

interface FormEfectivo {
  id: string;
  descripcion: string;
  valor: number;
}

const tipoEfectivoForm = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormEfectivo[]>([]);
  const { sendRequest } = useRequest();

  const addForm = () => {
    setForm((old) => [
      ...old,
      {
        id: uuid(),
        descripcion: "",
        valor: 0,
      },
    ]);
  };
  const removeForm = (id: string) => {
    setForm((old) => old.filter((v) => v.id !== id));
  };

  const handleChangeEfectivo = (descripcion: number, id: string) => {
    setForm((old) =>
      old.map((v) => {
        if (v.id === id) {
          return {
            ...v,
            atributo: String(idAtributo),
          };
        }
        return v;
      })
    );
  };

  const handleChangeValores = (valores: number[], id: string) => {
    setForm((old) =>
      old.map((v) => {
        if (v.id === id) {
          return {
            ...v,
            valores,
          };
        }
        return v;
      })
    );
  };

  const handleSend = async () => {
    for (const formAtributo of form) {
      if (formAtributo.atributo === "") {
        alertError("Todos los atributos tienen que estar seleccionados");
        return;
      }
      if (formAtributo.valores.length === 0) {
        alertError(
          `Se tiene que seleccionar al menos un valor de ${formAtributo.atributo}`
        );
        return;
      }
    }
    setLoading(true);
    const dto = form.map((formAtributo) => formAtributo.valores);
    const res = await sendRequest<{
      count: number;
      producto: ProductoBaseRes;
    }>(
      ENDPOINTS.PRODUCTOBASE.PUTATRIBUTOS + productoBase.id,
      form.length === 0 ? [[]] : dto,
      {
        method: "PUT",
      }
    );
    if (res) {
      alertSuccess(
        res.data.count === 0
          ? "Se eliminaron las variantes del producto"
          : `Creadas ${res.data.count} variantes`
      );
      setRes({
        data: res.data.producto,
        message: res.message,
        status: res.status,
      });
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col">
      {form.map((formAtributo) => (
        <Form
          key={formAtributo.id}
          initialValues={{
            [`atributo`]: Number(formAtributo.atributo),
            [`valores`]: formAtributo.valores,
          }}
          post={(body) => {
            alertSuccess(JSON.stringify(body));
          }}
          button={() => <></>}
        >
          <Form.Section row>
            <Form.Select<Atributo>
              name={`atributo`}
              title={`Atributo`}
              placeholder="Seleccione un atributo"
              route={ENDPOINTS.ATRIBUTO.GET}
              optionTextKey="nombre"
              optionValueKey="id"
              onChange={(id) => {
                handleChangeAtributo(id, formAtributo.id);
              }}
            />
            {formAtributo.atributo === "" ? (
              <Form.Select
                name={`valores`}
                placeholder="Seleccione los valores del atributo"
                title="Valores"
                disabled
              >
                <></>
              </Form.Select>
            ) : (
              <Form.Select<AtributoValorRes>
                key={formAtributo.atributo}
                name={`valores`}
                title="Valores"
                placeholder="Seleccione los valores del atributo"
                route={
                  ENDPOINTS.ATRIBUTOVALOR.GETBYATRIBUTO + formAtributo.atributo
                }
                optionTextKey="nombre"
                optionValueKey="id"
                onChange={(values) => {
                  handleChangeValores(values, formAtributo.id);
                }}
              />
            )}
            <div className="self-end">
              <Button
                onClick={() => removeForm(formAtributo.id)}
                size="input"
                icon={<IconX />}
              />
            </div>
          </Form.Section>
        </Form>
      ))}
      <div className="flex justify-center gap-5 ">
        <Button
          disabled={loading}
          onClick={addForm}
          icon={<IconAdd />}
        ></Button>
        <Button disabled={loading} onClick={handleSend}>
          Guardar
        </Button>
      </div>
    </div>
  );
};

export default tipoEfectivoForm;
 */