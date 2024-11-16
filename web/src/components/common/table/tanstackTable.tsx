import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  Row,
  Header,
} from "@tanstack/react-table";
import TablePDF from "./pdf/tablePDF";
import { DateFilter } from "./tableContainer";
import { forwardRef, useEffect, useState } from "react";
import { tailwindColors } from "../../../utils/tailwindConfig";
import TablePagination from "./tablePagination";
import TBody from "./tableBody";
import { useTableContext } from "./context/tableContext";
import IconArrowUp from "@assets/icons/iconArrowUp";
import { receiveData } from "./utils/receiveData";

//* ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇ Principal component for render table ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
const TanstackTable = forwardRef(
  (_, tableRef: React.ForwardedRef<HTMLTableElement>) => {
    const {
      data,
      onlyColumns: columns,
      filter,
      setFilter,
      setSorting,
      view,
      controls,
      rowStyle,
      config,
      fixKey,
      selectFilter,
      saveSearch,
      dateFilter,
      sorting,
      saveSizes,
    } = useTableContext();
    //* ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇ Tanstack table configuration ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
    const table = useReactTable({
      data,
      columns,
      /* getPaginationRowModel: getPaginationRowModel(), */
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      state: { sorting },
      /* initialState: {
        pagination: {
          pageSize: 40,
        },
      }, */
      columnResizeMode: "onChange",
      onSortingChange: setSorting,
      onGlobalFilterChange: setFilter,
      meta: {
        getRowStyles: rowStyle ? rowStyle : () => {},
      },
    });

    //* ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇ Function to get rows with fixed data ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
    const getFixedData = (): {
      data: Row<any>[];
      pinsInPage: number;
    } => {
      const allData = table.getCoreRowModel().rows;
      const paginatedData = table.getPaginationRowModel().rows;

      if (!fixKey)
        return {
          data: paginatedData,
          pinsInPage: 0,
        };
      if (!config)
        return {
          data: paginatedData,
          pinsInPage: 0,
        };

      const pins = config.pins
        .map((pin) => allData.find((value) => value.original[fixKey] === pin))
        .filter((v) => !!v);
      const filteredData = paginatedData.filter(
        (value) => !config.pins.includes(value.original[fixKey])
      );
      const pinsInPage =
        filteredData.length + pins.length - paginatedData.length;

      const data: any[] = [...pins, ...filteredData];
      return {
        data,
        pinsInPage,
      };
    };
    const rows = getFixedData();

    //* ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇ Handle filter ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
    const handleFilter = (
      row: any,
      selectFilter: string | undefined,
      filterStringified: string,
      dateFilter: DateFilter
    ) => {
      let filter = filterStringified;
      if (
        filterStringified.startsWith(`"`) &&
        filterStringified.endsWith(`"`)
      ) {
        filter = filterStringified.substring(1, filterStringified.length - 1);
      }
      const colum = columns.find((column) => column.header === selectFilter);
      const filterType = colum?.meta?.filterType;
      const filterBackend = colum?.meta?.filterBackend;

      //? ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇ filter with accesorKey ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
      //@ts-ignore
      const accessorKey = colum?.accessorKey;
      if (accessorKey) {
        if (!row.original[accessorKey]) return false;
        if (filterBackend) return true;
        if (filterType === "date" || filterType === "justOneDate") {
          const date = row.original[accessorKey];
          const from = dateFilter.from;
          const to = dateFilter.to;
          if (!from && !to) return true;
          if (!from && to) return new Date(date) <= new Date(to);
          if (from && !to) return new Date(date) >= new Date(from);
          return (
            new Date(date) >= new Date(from) && new Date(date) <= new Date(to)
          );
        } else {
          return row.original[accessorKey]
            .toString()
            .toLowerCase()
            .includes(filter.toLowerCase());
        }
      }

      //? ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇ filter with accesorFn ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
      //@ts-ignore
      const accessorFn = colum?.accessorFn;
      if (accessorFn) {
        if (filterType === "date" || filterType === "justOneDate") {
          const date = accessorFn(row.original);
          const from = dateFilter.from;
          const to = dateFilter.to;
          if (!from && !to) return true;
          if (!from && to) return new Date(date) <= new Date(to);
          if (from && !to) return new Date(date) >= new Date(from);
          return (
            new Date(date) >= new Date(from) && new Date(date) <= new Date(to)
          );
        } else {
          return accessorFn(row.original)
            .toString()
            .toLowerCase()
            .includes(filter.toLowerCase());
        }
      }
      return true;
    };

    //* ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇ Filter rows with selected filters ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
    const filteredRows = rows.data.filter((row) =>
      handleFilter(row, selectFilter, filter, dateFilter)
    );
    //* ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇ Filter the remaining rows with every saved markers ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
    const allDataFiltered = filteredRows.filter((row) =>
      saveSearch.every((condition) =>
        handleFilter(
          row,
          condition.selectFilter,
          JSON.stringify(condition.val),
          condition.val as DateFilter
        )
      )
    );
    //* ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇ Pagination ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
    const [rowsPerPage, _setRowsPerPage] = useState(40);
    const [currentPage, setCurrentPage] = useState(1);
    const dataPaginated = allDataFiltered.filter((_, i) => {
      const index = i + 1;
      const min = (currentPage - 1) * rowsPerPage + 1;
      const max = currentPage * rowsPerPage;
      return index >= min && index <= max;
    });

    //* ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇ Resize and sort ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
    const [resizing, setResizing] = useState(false);

    const handleThClick = (
      header: Header<any, unknown>,
      e: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>
    ) => {
      if (resizing) return;
      header.column.getToggleSortingHandler()?.(e);
    };

    const handleMouseDown = (
      header: Header<any, unknown>,
      e: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>
    ) => {
      const startX = e.pageX;
      let moving = false;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const deltaX = moveEvent.pageX - startX;
        if (Math.abs(deltaX) > 3 && !moving) {
          moving = true;
          setResizing(true);
          header.getResizeHandler()(e);
        }
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        moving = false;
        setTimeout(() => {
          setResizing(false);
        }, 100);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      header.getResizeHandler()(e);
    };

    //* ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇ Header styles ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
    const thStyle = [
      "px-2 py-2 bg-gray-100 border-solid border-gray-300 text-sm font-medium text-gray-700 text-start dark:text-white dark:bg-gray-800",
    ];
    const thStyleBorder = [...thStyle, "border"];
    const thStyleResize = [
      ...thStyleBorder,
      "border select-none cursor-pointer hover:invert-[8%] active:invert-[8%] transition-[filter] duration-100",
    ];
    if (resizing) {
      thStyleResize.push("active:cursor-w-resize");
    }

    //* ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇ Row styles (not null) ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
    //@ts-ignore
    const getRowStyles = table.options.meta?.getRowStyles;
    if (!getRowStyles) return null;

    //* ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇ Column sizes ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
    useEffect(() => {
      if (!resizing) {
        const headers = table
          .getHeaderGroups()
          .map((group) => group.headers)[0];
        const columnSizes = headers.map((header) => ({
          name: header.column.columnDef.header?.toString() || "",
          size: header.getSize(),
        }));
        saveSizes(columnSizes);
      }
    }, [resizing]);

    //* ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇ JSX (table or PDF) ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
    if (view === "PDF") {
      return (
        <TablePDF
          table={table}
          filter={filter}
          dataFiltered={allDataFiltered}
        />
      );
    }
    return (
      <div className="relative overflow-auto w-full h-full flex flex-col border bg-white justify-between">
        <table
          ref={tableRef}
          className="w-full border-separate border-spacing-0 whitespace-nowrap"
        >
          <thead className="sticky top-0 z-1">
            {table.getHeaderGroups().map((group) => (
              <tr key={group.id} >
                <th
                   className="text-center bg-white px-4 py-3 border-b text-[10px] font-medium text-gray-500"
                   style={{
                     width: "32px",
                   }}
                >
                  #
                </th>
                {group.headers.map((header) => (
                  <th
                  className="bg-white px-4 py-3 transition-all duration-200 border-b"
                  style={{
                    width: header.getSize(),
                    backgroundColor:
                      header.column.getIsSorted() === "asc"
                        ? "rgba(34, 197, 94, 0.04)"
                        : header.column.getIsSorted() === "desc"
                        ? "rgba(239, 68, 68, 0.04)"
                        : undefined,
                  }}
                    key={header.id}
                    title={header.column.columnDef.header?.toString()}
                    onClick={(e) => handleThClick(header, e)}
                    onMouseDown={(e) => handleMouseDown(header, e)}
                  >
                    <div className="flex items-center gap-2 group">
                      <p className="text-xs font-medium text-gray-600 group-hover:text-gray-900 transition-colors duration-200">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </p>
                      <div className="h-5 w-5">
                        <IconArrowUp
                          show={header.column.getIsSorted() || "none"}
                        />
                      </div>
                    </div>
                  </th>
                ))}
                {!!controls.length && (
                  <th
                  className="bg-white px-4 py-3 border-b text-xs font-medium text-gray-500"
                  style={{
                    width: "160px",
                  }}
                  >
                    Controles
                  </th>
                )}
              </tr>
            ))}
          </thead>

          <TBody
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            table={table}
            dataFiltered={dataPaginated}
          />

          {!!columns.filter((c) => !!c.footer).length && (
            <tfoot className="sticky z-1">
              {table.getFooterGroups().map((group) => (
                <tr key={group.id} className="border border-primary-800">
                  <td className={thStyle.join(" ")}></td>
                  {group.headers.map((header) => (
                    <th
                      key={header.id}
                      className={(() => {
                        const classes = [...thStyle];
                        if (header.column.columnDef.footer) {
                          classes.push(
                            "border border-primary-700 text-primary-700 font-semibold"
                          );
                        }
                        return classes.join(" ");
                      })()}
                      style={{
                        backgroundColor: `${tailwindColors.gray["200"]} dark:bg-gray-800 h-5`,
                        width: header.getSize(),
                      }}
                    >
                      {flexRender((e) => {
                        if (!header.column.columnDef.footer) return;
                        if (
                          typeof header.column.columnDef.footer === "function"
                        ) {
                          return receiveData(
                            {
                              ...e,
                              pageData: dataPaginated,
                              filter,
                              isPDF: false,
                            },
                            header.column.columnDef.footer
                          );
                        }
                        return <>{header.column.columnDef.footer}</>;
                      }, header.getContext())}
                    </th>
                  ))}
                  <td className={thStyle.join(" ")}></td>
                </tr>
              ))}
            </tfoot>
          )}
        </table>

        <TablePagination
          rowsPerPage={rowsPerPage}
          currentPage={currentPage}
          pageLength={dataPaginated.length}
          pinsInPage={rows.pinsInPage}
          dataLength={allDataFiltered.length}
          setCurrentPage={setCurrentPage}
        />
      </div>
    );
  }
);

export default TanstackTable;
