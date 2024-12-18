import IconMove from "@assets/icons/iconMove";
import Button from "../button/button";
import { VisibleColumn } from "./hooks/useTableConfig";
import { useState } from "react";
import { useTableContext } from "./context/tableContext";

//* ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇ Component for reorder and toggle columns ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
const TableFilters = () => {
  const { config, toggleColumn, handleReorder } = useTableContext();

  const [dragItem, setDragItem] = useState<VisibleColumn | null>(null);

  const handleDrop = (column: VisibleColumn) => {
    if (!dragItem) return;
    if (!document.startViewTransition) {
      handleReorder(dragItem, column);
      return;
    }
    document.startViewTransition(() => {
      handleReorder(dragItem, column);
    });
  };

  //* ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇ JSX ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
  return (
    <div className="flex flex-col gap-2">
      {config?.visibleColumns
        .sort((a, b) => a.order - b.order)
        .map((column) => {
          return (
            <div
              key={`column-${column.name}`}
              className="w-full"
              style={{
                viewTransitionName: `column-${column.name}`,
              }}
              draggable
              onDragStart={() => setDragItem(column)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(column)}
            >
              <Button
                disabled={
                  column?.active &&
                  config?.visibleColumns.filter((col) => col.active).length ===
                    1
                }
                onClick={() => toggleColumn(column.name)}
                toggle={column?.active}
                type="button"
                width="full"
                icon={<IconMove />}
              >
                {column.name}
              </Button>
            </div>
          );
        })}
    </div>
  );
};

export default TableFilters;
