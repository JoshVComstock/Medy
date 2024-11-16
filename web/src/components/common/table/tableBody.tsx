import { Cell, Row, Table, flexRender } from "@tanstack/react-table";
import Controls from "../controls/controls";
import TableRelational from "./tableRelational";
import { useTheme } from "../../../ThemeContext";
import excludableFields from "@/types/declarations/excludableFields";
import { useTableContext } from "./context/tableContext";

interface TBodyProps {
  table: Table<any>;
  dataFiltered: Row<any>[];
  rowsPerPage: number;
  currentPage: number;
}

//* ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇ Component for render the rows in the table ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
const TBody = ({
  table,
  dataFiltered,
  rowsPerPage,
  currentPage,
}: TBodyProps) => {
  const { theme } = useTheme();
  const { config, fixKey, onClickRow, controls } = useTableContext();

  //* ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇ Check if theres any function for onClickRow ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
  const handleClickRow = (row: any) => {
    if (onClickRow) {
      onClickRow(row.column.columnDef.header);
    }
  };

  //* ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇ Styles for every single data ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
  const tdStyle = [
    "px-2 py-[6px] border border-solid border-gray-300 text-sm text-gray-700",
  ];
  if (onClickRow) {
    tdStyle.push("cursor-pointer");
  }

  //* ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇ Check decimals from local config ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
  let decimals = localStorage.getItem("decimales")
    ? Number(localStorage.getItem("decimales"))
    : 2;
  const numberFormat = (value: unknown) => {
    return (value as number).toLocaleString("es-ES", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };
  const canCellBeIgnored = (value: string) => {
    return excludableFields.has(value.toLowerCase());
  };
  const isNumber = (cell: Cell<any, unknown>) => {
    return !isNaN(Number(cell.renderValue())) ? "ml-auto" : "";
  };

  //* ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇ Row styles (not null) ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
  //@ts-ignore
  const getRowStyles = table.options.meta?.getRowStyles;
  if (!getRowStyles) return null;

  //* ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇ Check if theres any control with "Modificar" for double click ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
  const modificarFn = controls.find((c) =>
    typeof c.label === "string"
      ? c.label.includes("Modificar") || c.label.includes("Modify")
      : undefined
  )?.fn;
  const isRowFixed = (row: any): boolean => {
    if (!config?.pins || !fixKey || !row.original) return false;
    return config.pins.some(pin => pin === row.original[fixKey]);
  };
  //* ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇ JSX ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
  return (
    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
      {dataFiltered.map((row, index) => {
        const isFixed = isRowFixed(row);
        const dynamicStyles = getRowStyles?.(row.original) || {};
        
        const rowStyle = {
          ...(isFixed && {
            backgroundColor: theme === "dark" 
              ? "rgb(7 89 133)" 
              : "rgb(224 242 254)"
          }),
          ...dynamicStyles
        };
      
      const rowIndex = String(rowsPerPage * (currentPage - 1) + index + 1);

      return (
        <tr
          key={row.id}
          style={rowStyle}
          className={`
            group
            transition-all duration-200 ease-in-out
            odd:bg-white even:bg-gray-50
            dark:odd:bg-gray-800 dark:even:bg-gray-900
            hover:bg-blue-50 dark:hover:bg-blue-900/30
            cursor-pointer
          `}
          onDoubleClick={() => modificarFn?.(row.original)}
          title={rowIndex}
        >
          <td className="w-12 px-3 py-2 text-center whitespace-nowrap">
            <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded">
              {rowIndex}
            </span>
          </td>

          {row.getVisibleCells().map((cell) => {
            const header = cell.column.columnDef.header;
            const isRelational = cell.column.columnDef.meta?.isRelational;

            if (header === "Acciones") {
              return (
                <td key={cell.id} className="px-3 py-2 cursor-default">
                  <div className="flex justify-end gap-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                </td>
              );
            }

            const cellValue = cell.renderValue();
            const formattedValue = !canCellBeIgnored(String(cell.column.id)) && 
              cellValue && 
              !isNaN(Number(cellValue))
                ? numberFormat(cellValue)
                : flexRender(cell.column.columnDef.cell, cell.getContext());

            return (
              <td
                key={cell.id}
                className={`px-3 py-2 text-sm ${
                  isNumber(cell) 
                    ? 'text-right tabular-nums' 
                    : 'text-left'
                }`}
                onClick={() => handleClickRow(row.original)}
                title={cellValue as string}
              >
                <div className="flex items-center gap-2">
                  <p className={`
                    line-clamp-1
                    text-gray-600 dark:text-gray-100
                    group-hover:text-primary-700 dark:group-hover:text-blue-300
                    transition-colors duration-200
                  `}>
                    {formattedValue}
                  </p>
                  {isRelational && (
                    <TableRelational
                      relationalTitle={cell.column.columnDef.header?.toString()}
                      relationalObj={row.original[isRelational]}
                    />
                  )}
                </div>
              </td>
            );
          })}

          {!!controls.length && (
            <td className="px-3 py-2 text-center">
              <Controls controls={controls} item={row.original} />
            </td>
          )}
        </tr>
      );
    })}
  </tbody>
  );
};

export default TBody;
