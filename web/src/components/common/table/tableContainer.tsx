import { CSSProperties, useMemo, useRef, useState } from "react";
import TableControls from "./tableControls";
import TanstackTable from "./tanstackTable";
import { ColumnDef } from "@tanstack/react-table";
import TableSkeleton from "./tableSkeleton";
import { Control } from "../controls/controls";
import { useTableConfig } from "./hooks/useTableConfig";
import { MarkersType, SaveSearchType } from "@/types/interfaces/SaveSearch";
import { alertSuccess } from "@/utils/alertsToast";
import { TableContext } from "./context/tableContext";

export interface TableButton {
  title: string;
  icon: JSX.Element;
  fn: () => void;
  active?: boolean;
  disabled?: boolean;
}

export interface DateFilter {
  from: string;
  to: string;
}

interface Props<T> {
  data: T[] | undefined;
  columns: ColumnDef<any, any>[];
  name: string;
  reports?: boolean;
  reload?: () => Promise<void>;
  add?: () => void;
  onClickRow?: (row: T) => void;
  controls?: Control<T>[];
  buttons?: TableButton[];
  fixKey?: keyof T;
  rowStyle?: (row: T) => CSSProperties;
  search?: boolean;
}

export type TableView = "table" | "PDF";

//* ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇ Component for external use ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
const TableContainer = <T,>({
  data,
  columns,
  name,
  reports = true,
  reload: reloadFn,
  add,
  onClickRow,
  controls = [],
  buttons = [],
  fixKey,
  rowStyle,
  search = true,
}: Props<T>) => {
  //* ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇ States ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
  const [sorting, setSorting] = useState<any[]>([]);
  const [reloadCount, setReloadCount] = useState(0);
  const [view, setView] = useState<TableView>("table");

  //* ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇ Reload table ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
  const reload = reloadFn
    ? async () => {
        setReloadCount((old) => old + 1);
        await reloadFn();
        alertSuccess("Recarga exitosa");
      }
    : undefined;

  //* ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇ PDF needs a ref for the table ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
  const tableRef = useRef<HTMLTableElement>(null);

  //* ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇ Configuration of the table ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
  const {
    config,
    toggleColumn,
    toggleFix,
    toggleSaveMarkers,
    toggleDeleteMarker,
    handleReorder,
    saveSizes,
  } = useTableConfig(columns, name);

  //* ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇ Filter and sort columns with configuration ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
  const onlyColumns = useMemo(
    () =>
      columns
        .sort((a, b) => {
          const visibleColumnA = config?.visibleColumns.find(
            (visibleColumn) => visibleColumn.name === a.header?.toString()
          );
          const visibleColumnB = config?.visibleColumns.find(
            (visibleColumn) => visibleColumn.name === b.header?.toString()
          );
          if (!visibleColumnA || !visibleColumnB) return 0;
          return visibleColumnA.order - visibleColumnB.order;
        })
        .filter((column) => {
          const visibleColumn = config?.visibleColumns.find(
            (visibleColumn) => visibleColumn.name === column.header?.toString()
          );
          if (!visibleColumn) return true;
          return visibleColumn.active;
        })
        .map((col) => ({
          ...col,
          size: config?.visibleColumns.find(
            (column) => column.name === col.header
          )?.size,
          enableResizing: true,
        })),
    [columns]
  );

  //* ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇ Add fix control to controls ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
  const allControls: Control<T>[] = [...controls];
  if (config && fixKey) {
    allControls.unshift({
      label: (row) =>
        !config.pins.find((pin) => pin === row[fixKey]) ? "Fijar" : "Desfijar",
      fn: (row) => toggleFix(row[fixKey]),
    });
  }

  //* ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇ Initial state of filter (first column for select) ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
  const [selectFilter, setSelectFilter] = useState<string | undefined>(
    columns[0].header?.toString()
  );
  const [filter, setFilter] = useState("");
  const [dateFilter, setDateFilter] = useState<DateFilter>({
    from: "",
    to: "",
  });

  //* ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇ Change selector ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
  const handleSelectFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectFilter(e.target.value);
  };

  //* ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇ Markers and searchs ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
  const [selectedMarker, setSelectedMarker] = useState<number>();
  const [saveSearch, setSaveSearch] = useState<SaveSearchType[]>([]);

  //* ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇ Save search ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
  const handleSaveSearch = (
    selectFilter: string | undefined,
    val: string | DateFilter
  ) => {
    if (!selectFilter) return;
    setSaveSearch((old) => [...old, { selectFilter, val }]);

    setFilter("");
    setDateFilter({
      from: "",
      to: "",
    });

    const existMarker = config?.marker?.find((item) => {
      const sortedItemFilters = item.filters
        .map((filter) => JSON.stringify(filter))
        .sort();
      const sortedNewSaveSearch = [...saveSearch, { selectFilter, val }]
        .map((filter) => JSON.stringify(filter))
        .sort();
      return (
        JSON.stringify(sortedItemFilters) ===
        JSON.stringify(sortedNewSaveSearch)
      );
    })?.id;

    if (existMarker) {
      setSelectedMarker(existMarker);
    } else {
      setSelectedMarker(undefined);
    }
  };

  //* ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇ Delete search ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
  const hanldeDeleteSavaedSearch = (index: number) => {
    const newSaveSearch = [...saveSearch];
    newSaveSearch.splice(index, 1);
    setSaveSearch(newSaveSearch);
    const existMarker = config?.marker.find((item) => {
      const sortedItemFilters = item.filters
        .map((filter) => JSON.stringify(filter))
        .sort();
      const sortedNewSaveSearch = newSaveSearch
        .map((filter) => JSON.stringify(filter))
        .sort();
      return (
        JSON.stringify(sortedItemFilters) ===
        JSON.stringify(sortedNewSaveSearch)
      );
    })?.id;
    if (existMarker) {
      setSelectedMarker(existMarker);
    } else {
      setSelectedMarker(undefined);
    }
  };

  //* ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇ Save marker ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
  const handleSaveMarker = (value: SaveSearchType[]) => {
    if (!config?.marker) return;
    if (selectedMarker == undefined) {
      toggleSaveMarkers(value);
      setSelectedMarker(config?.marker.length + 1);
    }
  };

  //* ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇ Load marker ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
  const handleLoadMarker = (marker: MarkersType) => {
    if (marker.id == selectedMarker) {
      setSelectedMarker(undefined);
      setSaveSearch([]);
    } else {
      setSelectedMarker(marker.id);
      setSaveSearch(marker.filters);
    }
  };

  //* ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇ Delete marker ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
  const handleDeleteMarker = (idMarker: number) => {
    toggleDeleteMarker(idMarker);
    if (idMarker != selectedMarker) return;
    setSelectedMarker(undefined);
    setSaveSearch([]);
  };

  //* ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇ JSX ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
  return (
    <TableContext.Provider
      value={{
        currentTableRef: tableRef.current,
        loading: !data,
        data: data || [],
        filter,
        setFilter,
        dateFilter,
        setDateFilter,
        reload,
        add,
        view,
        setView,
        reports,
        columns,
        onlyColumns,
        buttons,
        config,
        toggleColumn,
        handleSelectFilter,
        handleSaveSearch,
        selectFilter,
        saveSearch,
        hanldeDeleteSavaedSearch,
        handleDeleteMarker,
        handleLoadMarker,
        handleSaveMarker,
        selectedMarker,
        reloadCount,
        search,
        handleReorder,
        sorting,
        setSorting,
        onClickRow,
        controls: allControls,
        rowStyle,
        fixKey,
        saveSizes,
      }}
    >
      <div className="flex flex-col h-full flex-1">
        <TableControls>
          {data ? <TanstackTable ref={tableRef} /> : <TableSkeleton />}
        </TableControls>
      </div>
    </TableContext.Provider>
  );
};

export default TableContainer;
