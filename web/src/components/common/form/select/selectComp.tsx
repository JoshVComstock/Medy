interface Props {
  data: any[] | undefined;
  property: keyof any;
  handleChange: (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    index: number
  ) => void;
  index: number;
  name: string;
  title?: string;
  defaultValue?: number | string;
}
const SelectComp = ({
  data,
  handleChange,
  index,
  property,
  name,
  title,
  defaultValue
}: Props) => {
  const stylesSelect = [
    "h-10 w-full px-2 pr-10 text-sm border outline-none border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-300 bg-white disabled:bg-gray-100 dark:bg-gray-500 dark:text-white",
  ];
  const stylesTitle = [
    "text-sm ml-2 font-semibold text-gray-700 dark:text-white",
  ];

  return (
    <div>
      {title && (
        <label className={stylesTitle.join(" ")} htmlFor={index.toString()}>
          {title}
        </label>
      )}

      {data && (
        <select
          className={stylesSelect.join(" ")}
          defaultValue={defaultValue ? defaultValue : 0}
          onChange={(e) => handleChange(e, index)}
          name={name}
        >
          <option value={0}>Seleccione un valor</option>
          {data.map((moneda) => (
            <option value={moneda.id}>{moneda[property]}</option>
          ))}
        </select>
      )}
    </div>
  );
};

export default SelectComp;
