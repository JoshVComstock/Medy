import { Cell, Row, Table, flexRender } from "@tanstack/react-table";
import Controls from "../controls/controls";
import TableRelational from "./tableRelational";
import { tailwindColors } from "@/utils/tailwindConfig";
import { CSSProperties } from "react";
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

  //* ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇ JSX ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
  return (
    <tbody className="">
      {dataFiltered.map((row, index) => {
        let isFixed = false;
        if (config && fixKey) {
          isFixed = config.pins.some((pin) => pin === row.original[fixKey]);
        }
        const dynamicStyles: CSSProperties | undefined = getRowStyles(
          row.original
        );
        let rowStyle = {};
        if (isFixed) {
          rowStyle = {
            ...rowStyle,
            backgroundColor:
              theme == "dark"
                ? `${tailwindColors.sky["800"]}`
                : `${tailwindColors.sky["100"]}`,
          };
        }
        if (dynamicStyles) {
          rowStyle = {
            ...rowStyle,
            ...dynamicStyles,
          };
        }
        const rowIndex = String(rowsPerPage * (currentPage - 1) + index + 1);

        return (
          <tr
            style={rowStyle}
            className={`transition-all duration-100 odd:bg-white even:bg-gray-100 dark:odd:bg-gray-500 dark:even:bg-gray-600 hover:invert-[8%]`}
            key={row.id}
            onDoubleClick={() => {
              if (modificarFn) {
                modificarFn(row.original);
              }
            }}
            title={rowIndex}
          >
            <td className={tdStyle.join(" ")}>
              <p
                className={`line-clamp-1 text-center text-[10px] ${
                  theme == "dark" ? "text-white" : ""
                }`}
              >
                {rowIndex}
              </p>
            </td>
            {row.getVisibleCells().map((cell) => {
              const header = cell.column.columnDef.header;

              if (header === "Acciones")
                return (
                  <td className={tdStyle + " cursor-default"} key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              const isRelational = cell.column.columnDef.meta?.isRelational;
              return (
                <td
                  className={tdStyle.join(" ")}
                  key={cell.id}
                  onClick={() => handleClickRow(row.original)}
                  title={cell.renderValue() as string}
                >
                  <div className="flex gap-2">
                    <p
                      className={`line-clamp-1 ${isNumber(cell)} ${
                        theme == "dark" ? "text-white" : ""
                      }`}
                    >
                      {flexRender(
                        !canCellBeIgnored(String(cell.column.id)) &&
                          cell.renderValue() &&
                          !isNaN(Number(cell.renderValue()))
                          ? numberFormat(cell.renderValue())
                          : cell.column.columnDef.cell,
                        cell.getContext()
                      )}
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
              <td className={tdStyle.join(" ") + " text-center"}>
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
