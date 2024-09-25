import { useId } from "react";

export interface Control<T> {
  label: string | ((row: T) => string);
  fn: (row: T) => void;
  on?: (row: T) => boolean;
}

interface Props<T> {
  controls: Control<T>[];
  item: T;
}

const Controls = <T,>({ controls, item }: Props<T>) => {
  const id = useId();

  const handleActions = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const option = controls.find((_, i) => String(i) === e.target.value);
    if (!option) return;
    option.fn(item);
  };

  return (
    <select
      onChange={handleActions}
      value=""
      className={"bg-transparent w-32 dark:text-white"}
      id={id}
    >
      <option value="" disabled>
        Acciones
      </option>
      {controls.map((control, i) => {
        const label =
          typeof control.label === "string"
            ? control.label
            : control.label(item);
        return !control.on ? (
          <option key={i} value={i}>
            {label}
          </option>
        ) : (
          control.on(item) && (
            <option
              key={i}
              value={i}
              className="dark:text-white dark:bg-gray-500"
            >
              {label}
            </option>
          )
        );
      })}
    </select>
  );
};

export default Controls;
