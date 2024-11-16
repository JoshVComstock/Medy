import IconSearch from "@assets/icons/iconSearch";
import Input from "../inputs/input";
import Button from "../button/button";
import IconX from "@assets/icons/iconX";
import IconFilterAdd from "@assets/icons/iconFilterAdd";
/* import IconBookmark from "@assets/icons/iconBookmark";
import IconSave from "@assets/icons/iconSave";
import Dropdown from "../dropdown/dropdown";
import IconTrash from "@assets/icons/iconTrash"; */
import { SaveSearchType } from "@/types/interfaces/SaveSearch";
import { ColumnDef } from "@tanstack/react-table";

import { useEffect, useState } from "react";
import { useTableContext } from "./context/tableContext";

//* ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇ Component for render search inputs and markers ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
const TableSearch = () => {
  const {
    columns,
    filter: filterValue,
    setFilter,
    handleSaveSearch,
    hanldeDeleteSavaedSearch,
    handleSelectFilter,
    saveSearch,
    selectFilter,
   /*  handleDeleteMarker,
    handleLoadMarker,
    handleSaveMarker,
    selectedMarker,
    config, */
    dateFilter,
    setDateFilter,
  } = useTableContext();

  //* ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇ Selected for mentions @ ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
  const [selected, setSelected] = useState("");
  const handleSelectMentions = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    //Update the input value with the @mention
    setSelected(event.target.value);
    const arrobaIndex = filterValue.lastIndexOf("@");
    if (arrobaIndex < 0) {
      return;
    }
    setFilter(filterValue.slice(0, arrobaIndex) + event.target.value);
    setSelected("");
  };

  //* ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇ Column selected for filter ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
  const selectedColumn = columns.find(
    (col) => col.header?.toString() === selectFilter
  );
  const inputType = selectedColumn?.meta?.filterType;
  const dateSelect = selectedColumn?.meta?.dataSelect;
  const thereIsFilterBack = selectedColumn?.meta?.filterBackend;

  //* ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇ Where the inputType of filter changes reset the filter ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
  useEffect(() => {
    setFilter("");
    setDateFilter({
      from: "",
      to: "",
    });
  }, [inputType]);

  //* ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇ Save the filter for backend ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
  const handleSaveDataInput = () => {
    selectedColumn?.meta?.filterBackend?.(dateFilter);
  };

  //* ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇ Display the name of the saved search ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
  const displaySaveSearchName = (saveSearch: SaveSearchType) => {
    const selectedColumn = columns.find(
      (col) => col.header?.toString() === saveSearch.selectFilter
    );
    const inputType = selectedColumn?.meta?.filterType;

    let valueName = saveSearch.val;
    if (inputType === "date" || inputType === "justOneDate") {
      //@ts-ignore
      const [from, to] = [saveSearch.val.from, saveSearch.val.to];
      if (!from) {
        valueName = "Hasta " + to;
      }
      if (!to) {
        valueName = "Desde " + from;
      }
      if (from && to) {
        valueName = from + " a " + to;
      }
    }

    return `${saveSearch.selectFilter}: ${valueName}`;
  };

  //* ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇ JSX ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
  return (
    <div className="flex justify-between gap-4">
      <div className="flex">
        <div className="w-40">
          <select
            value={selectFilter}
            onChange={handleSelectFilter}
            className="w-full px-2 py-1 pr-1 mr-5 rounded-lg text-sm border outline-none border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-300 bg-white disabled:bg-gray-100 dark:bg-gray-300"
          >
            {columns.map((v: ColumnDef<any, any>) => (
              <option key={v.header?.toString()} value={v.header?.toString()}>
                {v.header?.toString()}
              </option>
            ))}
          </select>
        </div>

        <div key={selectFilter} className="flex w-80">
          {inputType === "date" && (
            <>
              <div className="max-w-40 ">
                <Input
                  size="small"
                  icon={<IconSearch />}
                  placeholder="Buscar..."
                  value={dateFilter.from}
                  onChange={(e) =>
                    setDateFilter((old) => ({
                      ...old,
                      from: e.target.value,
                    }))
                  }
                  selectedValue={selected}
                  handleSelectMentions={handleSelectMentions}
                  minWidth="160px"
                  type="date"
                />
              </div>
              <div className="max-w-40 ">
                <Input
                  size="small"
                  icon={<IconSearch />}
                  placeholder="Buscar..."
                  value={dateFilter.to}
                  onChange={(e) =>
                    setDateFilter((old) => ({
                      ...old,
                      to: e.target.value,
                    }))
                  }
                  selectedValue={selected}
                  handleSelectMentions={handleSelectMentions}
                  minWidth="160px"
                  type="date"
                />
              </div>
            </>
          )}

          {inputType == undefined && (
            <Input
              size="small"
              icon={<IconSearch />}
              placeholder="Buscar..."
              value={filterValue}
              onChange={(e) => setFilter(e.target.value)}
              selectedValue={selected}
              handleSelectMentions={handleSelectMentions}
            />
          )}

          {inputType === "justOneDate" && (
            <>
              <div className="max-w-40 ">
                <Input
                  size="small"
                  icon={<IconSearch />}
                  placeholder="Buscar..."
                  value={dateFilter.from}
                  onChange={(e) =>
                    setDateFilter((old) => ({
                      ...old,
                      from: e.target.value,
                    }))
                  }
                  minWidth="320px"
                  type="date"
                />
              </div>
            </>
          )}

          {inputType === "select" && (
            <select
              value={filterValue}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full px-2 py-1 pr-10 text-sm border outline-none  border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-300 bg-white disabled:bg-gray-100 dark:bg-gray-300"
            >
              <option value="">Seleccionar...</option>
              {dateSelect?.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* show the button to filter in the back */}
        {thereIsFilterBack && (
          <Button
            type="button"
            borderRadius="0"
            size="inputSmall"
            btnType="quaternary"
            icon={<IconSearch />}
            onClick={handleSaveDataInput}
          />
        )}

        {(filterValue || dateFilter.from || dateFilter.to) && (
          <>
            <Button
              type="button"
              borderRadius="0"
              size="inputSmall"
              btnType="quaternary"
              icon={<IconX />}
              onClick={() => {
                setFilter("");
                setDateFilter({
                  from: "",
                  to: "",
                });
              }}
            />
            <Button
              type="button"
              borderRadius="0"
              size="inputSmall"
              btnType="quaternary"
              icon={<IconFilterAdd />}
              onClick={() =>
                handleSaveSearch(
                  selectFilter,
                  inputType === "date" ? dateFilter : filterValue
                )
              }
            />
          </>
        )}
      </div>

      <div className="flex gap-2 flex-1 overflow-auto justify-end">
        {saveSearch.map((v, i) => (
          <Button
            type="button"
            key={i}
            btnType="quaternary"
            size="inputSmall"
            width="160px"
            title={displaySaveSearchName(v)}
            icon={<IconX />}
            onClick={() => hanldeDeleteSavaedSearch(i)}
          >
            {displaySaveSearchName(v)}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TableSearch;
