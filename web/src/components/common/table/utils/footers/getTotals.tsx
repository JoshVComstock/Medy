import { HeaderContext } from "@tanstack/react-table";
import { FooterUtilProps } from "../receiveData";

//* GET TOTALS OF THE NUMBERS IN THE TABLE
//* TOTAL OF ALL ROWS OF DATA
//* TOTAL OF PAGINATED DATA
//* ONLY WORKS WITH COLUMNS WITH accesorKey
export const getTotals = (props: HeaderContext<any, unknown>) => {
  const { column, table, pageData, filter, isPDF } = props as FooterUtilProps;

  const getTotal = () => {
    return `Total:
    ${table
      .getCoreRowModel()
      .rows.reduce(
        (total, row) => total + row.original[column.id as string],
        0
      )}`;
  };

  const getPageTotal = () => {
    return `${filter ? "Total" : "Página"}:
    ${pageData.reduce(
      (total, row) => total + row.original[column.id as string],
      0
    )}`;
  };

  if (isPDF) {
    return !filter ? <>{getTotal()}</> : <>{getPageTotal()}</>;
  }
  return (
    <div className="flex flex-col items-end">
      {!filter ? (
        <>
          <p className="line-clamp-1">{getTotal()}</p>
          <small className="line-clamp-1 -mt-[2px] font-medium">
            {getPageTotal()}
          </small>
        </>
      ) : (
        <p className="line-clamp-1">{getPageTotal()}</p>
      )}
    </div>
  );
};
