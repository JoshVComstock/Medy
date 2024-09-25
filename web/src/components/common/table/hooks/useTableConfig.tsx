import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useUser } from "@/context/user";
import { MarkersType, SaveSearchType } from "@/types/interfaces/SaveSearch";

export interface TableConfig {
  visibleColumns: VisibleColumn[];
  pins: any[];
  marker: MarkersType[];
}

export type TableConfigObject = Record<string, TableConfig>;

export interface VisibleColumn {
  name: string;
  active: boolean;
  order: number;
  size: number;
}

export const localTableConfigName = "tableConfig";

export const useTableConfig = (
  columns: ColumnDef<any, any>[],
  name?: string
) => {
  const { tableConfig } = useUser();
  const getLocalStorage = () => {
    if (!name) return null;

    const local: TableConfigObject | null = JSON.parse(
      localStorage.getItem(localTableConfigName) || "null"
    );
    const newLocal: TableConfigObject = {
      [name]: {
        visibleColumns: columns.map((column, i) => ({
          name: (column.header as string).toString(),
          active: true,
          order: i,
          size: 150,
        })),
        pins: [],
        marker: [],
      },
    };

    if (local) {
      if (!local[name]) {
        local[name] = {
          visibleColumns: columns.map((column, i) => ({
            name: (column.header as string).toString(),
            active: true,
            order: i,
            size: 150,
          })),
          pins: [],
          marker: [],
        };
      }
      return local;
    } else {
      if (!tableConfig) {
        return newLocal;
      }
      return tableConfig;
    }
  };

  const [config, setConfig] = useState<TableConfigObject | null>(
    getLocalStorage()
  );

  const toggleColumn = (columnName: string) => {
    setConfig((old) => {
      if (!old) return null;
      if (!name) return null;
      return {
        ...old,
        [name]: {
          ...old[name],
          visibleColumns: old[name].visibleColumns.map((visibleColumn) => {
            if (visibleColumn.name === columnName) {
              return {
                name: visibleColumn.name,
                active: !visibleColumn.active,
                order: visibleColumn.order,
                size: visibleColumn.size,
              };
            }
            return visibleColumn;
          }),
        },
      };
    });
  };

  const toggleFix = (fixValue: any) => {
    setConfig((old) => {
      if (!old) return null;
      if (!name) return null;
      const exist = old[name].pins.some((pin) => pin === fixValue);
      return {
        ...old,
        [name]: {
          ...old[name],
          pins: exist
            ? old[name].pins.filter((pin) => pin !== fixValue)
            : [...old[name].pins, fixValue],
        },
      };
    });
  };

  const toggleSaveMarkers = (value: SaveSearchType[]) => {
    setConfig((old) => {
      if (!old) return null;
      if (!name) return null;
      return {
        ...old,
        [name]: {
          ...old[name],
          marker: [
            ...old[name].marker,
            {
              id:
                old[name].marker.length > 0
                  ? old[name].marker[old[name].marker.length - 1].id + 1
                  : old[name].marker.length + 1,
              filters: value,
            },
          ],
        },
      };
    });
  };

  const toggleDeleteMarker = (id: number) => {
    setConfig((old) => {
      if (!old) return null;
      if (!name) return null;
      return {
        ...old,
        [name]: {
          ...old[name],
          marker: old[name].marker.filter((item) => item.id != id),
        },
      };
    });
  };

  const handleReorder = (dragged: VisibleColumn, dropped: VisibleColumn) => {
    setConfig((old) => {
      if (!old) return null;
      if (!name) return null;
      if (dragged.order === dropped.order) return old;

      const oldOrder = [...old[name].visibleColumns];
      const newOrder = old[name].visibleColumns.map((column) => {
        if (dragged.order > dropped.order) {
          if (column.order >= dropped.order && column.order < dragged.order) {
            return {
              ...column,
              order: column.order + 1,
            };
          }
        } else {
          if (column.order <= dropped.order && column.order > dragged.order) {
            return {
              ...column,
              order: column.order - 1,
            };
          }
        }
        if (column.name === dragged.name) {
          const oldDropped = oldOrder.find((col) => col.name === dropped.name);
          return {
            ...column,
            order: oldDropped?.order ?? column.order,
          };
        }
        return column;
      });

      return {
        ...old,
        [name]: {
          ...old[name],
          visibleColumns: newOrder,
        },
      };
    });
  };

  const saveSizes = (
    sizes: {
      name: string;
      size: number;
    }[]
  ) => {
    setConfig((old) => {
      if (!old) return null;
      if (!name) return null;
      return {
        ...old,
        [name]: {
          ...old[name],
          visibleColumns: old[name].visibleColumns.map((column) => {
            const findSize = sizes.find((s) => s.name === column.name);
            if (!findSize) return column;
            return {
              ...column,
              size: findSize.size,
            };
          }),
        },
      };
    });
  };

  useEffect(() => {
    if (name && config) {
      localStorage.setItem(localTableConfigName, JSON.stringify(config));
    }
  }, [config]);

  let cfg = null;
  if (name && config) {
    cfg = config[name];
  }

  return {
    config: cfg,
    toggleColumn,
    toggleFix,
    toggleSaveMarkers,
    toggleDeleteMarker,
    handleReorder,
    saveSizes,
  };
};
