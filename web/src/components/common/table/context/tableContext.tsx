import { CSSProperties, createContext, useContext } from "react";
import { DateFilter, TableButton, TableView } from "../tableContainer";
import { ColumnDef } from "@tanstack/react-table";
import { TableConfig, VisibleColumn } from "../hooks/useTableConfig";
import { MarkersType, SaveSearchType } from "@/types/interfaces/SaveSearch";
import { Control } from "../../controls/controls";

interface ContextValue {
  data: any[];
  currentTableRef: HTMLTableElement | null;
  loading: boolean;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  dateFilter: DateFilter;
  setDateFilter: React.Dispatch<React.SetStateAction<DateFilter>>;
  reload: (() => Promise<void>) | undefined;
  add: (() => void) | undefined;
  view: TableView;
  setView: React.Dispatch<React.SetStateAction<TableView>>;
  reports: boolean;
  columns: ColumnDef<any, any>[];
  onlyColumns: ColumnDef<any, any>[];
  buttons: TableButton[];
  config: TableConfig | null;
  toggleColumn: (columnName: string) => void;
  handleSelectFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSaveSearch: (
    selectFilter: string | undefined,
    val: string | DateFilter
  ) => void;
  selectFilter: string | undefined;
  saveSearch: SaveSearchType[];
  hanldeDeleteSavaedSearch: (index: number) => void;
  handleDeleteMarker: (idMarker: number) => void;
  handleLoadMarker: (marker: MarkersType) => void;
  handleSaveMarker: (value: SaveSearchType[]) => void;
  selectedMarker: number | undefined;
  reloadCount: number;
  search: boolean;
  handleReorder: (dragged: VisibleColumn, dropped: VisibleColumn) => void;
  sorting: any[];
  setSorting: React.Dispatch<React.SetStateAction<any[]>>;
  onClickRow: ((row: any) => void) | undefined;
  controls: Control<any>[];
  rowStyle: ((row: any) => CSSProperties) | undefined;
  fixKey: string | number | symbol | undefined;
  saveSizes: (
    sizes: {
      name: string;
      size: number;
    }[]
  ) => void;
}

export const TableContext = createContext<ContextValue | null>(null);

export const useTableContext = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("this contexts must be used whitin a TableContextProvider");
  }
  return context;
};
