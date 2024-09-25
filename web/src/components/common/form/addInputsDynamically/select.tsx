/* import IconUp from "@assets/icons/iconUp";
import IconDown from "@assets/icons/iconDown";
import { useState } from "react";
import { MultipleValue } from "../select/formSelect";

interface Props {
  id: string;
  disabled: boolean | undefined;
  setOpenClose: (value: boolean) => void;
  props: any;
  value: string | undefined;
  open: boolean;
}
const SelectComponent = ({
  disabled,
  id,
  setOpenClose,
  props,
  open,
  value,
}: Props) => {

    const data:MultipleValue[] = [
        { value: "Option 1", parent: "1" },
        { value: "Option 2", parent: "2" },
        { value: "Option 3", parent: "3" },
      ];

      const actualValue = data;
      const multiple = Array.isArray(actualValue);
      const [multipleValues, setMultipleValues] = useState<MultipleValue[]>(
        multiple
          ? actualValue.map((v) => ({
              value: v,
              text: "",
            }))
          : []
      );

  return (
    <>
      <button
        type="button"
        tabIndex={0}
        id={id}
        onClick={() => setOpenClose(!open)}
        disabled={disabled}
        className="select-none min-w-80 text-start bg-white w-full px-2 h-10 items-center pr-16 text-sm border outline-none border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-300 disabled:bg-gray-100 placeholder:text-gray-700 flex justify-between"
      >
        <p className="whitespace-nowrap overflow-hidden text-ellipsis">
          {multiple
            ? multipleValues.length
              ? `${multipleValues.length} seleccionado${
                  multipleValues.length > 1 ? "s" : ""
                }`
              : props.placeholder
            : value}
          
        </p>
      
      </button>
      <div className="h-5 text-gray-500 absolute right-10 pointer-events-none top-1/2 -translate-y-1/2">
        {open ? <IconUp /> : <IconDown />}
      </div>
    </>
  );
};

export default SelectComponent;
 */