import useAddRow from "@/components/hooks/useAddRow";
import { RowAperturaCajaType } from "../types/rowAperturaCaja";
import SelectComp from "@/components/common/form/select/selectComp";
import { useGet } from "@/components/hooks/useGet";
import { EfectivoRes } from "@/types/res/EfectivoRes";
import { ENDPOINTS } from "@/types/enums/Endpoints";
import Input from "@/components/common/inputs/input";
import Button from "@/components/common/button/button";
import IconX from "@assets/icons/iconX";

interface Props {
  handleSaveData: (rows: RowAperturaCajaType[]) => Promise<void>;
  handleEditData: (rows: RowAperturaCajaType[]) => Promise<void>;
  rowsEdit: RowAperturaCajaType[];
}
const FormAperturaCaja = ({
  handleSaveData,
  rowsEdit,
  handleEditData,
}: Props) => {
  const operationForm = rowsEdit.length > 0 ? "edit" : "create";
  //* ========== START: ADD ROWS ==========
  const { addRow, handleChange, rows, deleteRow } =
    useAddRow<RowAperturaCajaType>({ initialValue: rowsEdit });
  //* ========== END: ADD ROWS ==========

  //* ========== START: GET DATA OF THE API ==========
  //? get monedas
  /*   const { res: monedas } = useGet<MonedaRes[]>(ENDPOINTS.MONEDA.GET); */
  //? get efectivos
  const { res: efectivos } = useGet<EfectivoRes[]>(ENDPOINTS.EFECTIVO.GET);
  //* ========== END: GET DATA OF THE API ==========

  return (
    <>
      <div className="flex flex-col gap-2">
        {rows.map((row, index) => (
          <div className="flex" key={index}>
            <SelectComp
              data={efectivos?.data}
              handleChange={handleChange}
              index={index}
              property={"descripcion"}
              name="idEfectivo"
              title="Fraccionamiento"
              defaultValue={row.idEfectivo}
            />
            <Input
              title="Cantidad"
              name="cantidad"
              onChange={(e) => handleChange(e, index)}
              value={row.cantidad}
              type="number"
              minWidth="200px"
              placeholder="Cantidad"
            />
            <div className="self-end">
              <Button
                onClick={() => deleteRow(index)}
                size="input"
                icon={<IconX />}
              ></Button>
            </div>
          </div>
        ))}
        <div className="flex gap-2 mt-3 self-center">
          <Button btnType="secondary">
            <span onClick={addRow}>Agregar fraccionamiento</span>
          </Button>
          {operationForm === "edit" && (
            <Button btnType="primary">
              <span onClick={() => handleEditData(rows)}>Editar</span>
            </Button>
          )}
          {operationForm === "create" && (
            <Button btnType="primary">
              <span onClick={() => handleSaveData(rows)}>Guardar</span>
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default FormAperturaCaja;
