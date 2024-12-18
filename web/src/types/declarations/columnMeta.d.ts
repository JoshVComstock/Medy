import { DateFilter } from "@/components/common/table/tableContainer";
import "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    isRelational?: keyof TData;
    filterType?: "string" | "date" |"justOneDate" | 'select' = "string";
    dataSelect?: string[];
    filterBackend?: (filter: DateFilter) => void;
  }
}
