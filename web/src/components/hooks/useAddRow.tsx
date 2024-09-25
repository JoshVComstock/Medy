import { useState } from "react";

interface Params<T>{
  initialValue:T[]
}

const useAddRow = <T,>({initialValue}:Params<T>) => {
  const initial = initialValue.length > 0 ? initialValue : [{} as T];
  const [rows, setRows] = useState(initial);

  const addRow = () => {
    setRows([...rows, {} as T]);
  };

  const deleteRow = (index:number)=>{
    const list = [...rows];
    list.splice(index,1);
    setRows(list);
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const list = [...rows];

    //@ts-ignore
    list[index][name] = Number(value);

    setRows(list);
  };

  return {
    rows,
    addRow,
    handleChange,
    deleteRow
  };
};

export default useAddRow;
