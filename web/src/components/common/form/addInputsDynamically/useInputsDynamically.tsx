/* import { ProductoBaseAtributoValor } from "@/types/res/ProductoBaseRes";
import { useEffect, useState } from "react";

export const UseInputsDynamically = (
  initialValues: ProductoBaseAtributoValor[] = []
) => {
  const [inputs, setInputs] =
    useState<ProductoBaseAtributoValor[]>(initialValues);
  const [values, setValues] = useState<ProductoBaseAtributoValor[]>([]);

  // Update inputs when initialValues change
  useEffect(() => {
    setInputs(initialValues);
  }, [initialValues]);

  const addInput = () => {
    setInputs((prevInputs) => [...prevInputs, { idAtribValor: 0, precioExtra: 0 }]);
  };

  const removeInput = (index: number) => {
    setInputs((prevInputs) => prevInputs.filter((_, i) => i !== index));
  };

  const handleInputChange = (
    index: number,
    key: keyof ProductoBaseAtributoValor,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newInputs = [...inputs];
    newInputs[index][key] = Number(event.target.value);
    setInputs(newInputs);
  };

  useEffect(() => {
    setValues(inputs);
  }, [inputs]);

  const submitValues = () => {
    setValues(inputs);
  };

  return {
    addInput,
    removeInput,
    handleInputChange,
    submitValues,
    inputs,
    values,
  };
};
 */