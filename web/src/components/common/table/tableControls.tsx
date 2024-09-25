import IconAdd from "@assets/icons/iconAdd";
import Button from "../button/button";
import IconDownload from "@assets/icons/iconExport";
import TableSearch from "./tableSearch";
import IconReload from "@assets/icons/iconReload";
import Dropdown from "../dropdown/dropdown";
import IconPDF from "@assets/icons/iconPDF";
import IconXLSX from "@assets/icons/iconXLSX";
import IconBack from "@assets/icons/iconBack";
import { DownloadTableExcel } from "react-export-table-to-excel";
import TableFilters from "./tableFilters";
import IconColumn from "@assets/icons/iconColumn";
import { useTableContext } from "./context/tableContext";

interface Props {
  children: React.ReactNode;
}

//* ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇ Component for show top buttons ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
const TableControls = ({ children }: Props) => {
  const {
    currentTableRef,
    loading,
    reload,
    add,
    view,
    setView,
    reports,
    buttons,
    reloadCount,
    search,
  } = useTableContext();

  //* ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇ JSX ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
  return (
    <div className="h-full w-full flex flex-col gap-2">
      {view === "table" ? (
        <>
          <div className="flex justify-between">
            <div className="h-full">
              {buttons.length > 0 && (
                <div className="h-full flex gap-2 border px-1 rounded-md items-center relative">
                  {buttons.map((button, i) => (
                    <Button
                      type="button"
                      key={i}
                      size="small"
                      btnType={button.active ? "primary" : "secondary"}
                      icon={button.icon}
                      disabled={loading || button.disabled}
                      title={button.title}
                      onClick={button.fn}
                    >
                      {button.title}
                    </Button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex gap-2">
              {reload && (
                <Button
                  type="button"
                  key={reloadCount}
                  onClick={reload}
                  btnType="secondary"
                  icon={
                    <div className="animate-[spin_.3s]">
                      <IconReload />
                    </div>
                  }
                />
              )}
              {reports && (
                <Dropdown
                  toggleElement={(open) => (
                    <Button toggle={open} icon={<IconDownload />} type="button">
                      Exportar
                    </Button>
                  )}
                >
                  <div className="flex gap-2 flex-col">
                    <Button
                      onClick={() => setView("PDF")}
                      btnType="secondary"
                      width="full"
                      icon={<IconPDF />}
                      type="button"
                    >
                      Ver en PDF
                    </Button>
                    <DownloadTableExcel
                      filename="tabla"
                      sheet="tabla"
                      currentTableRef={currentTableRef}
                    >
                      <Button
                        type="button"
                        btnType="secondary"
                        width="full"
                        icon={<IconXLSX />}
                      >
                        Exportar a Excel
                      </Button>
                    </DownloadTableExcel>
                  </div>
                </Dropdown>
              )}
              {/* <Dropdown
                toggleElement={(open) => (
                  <Button toggle={open} icon={<IconColumn />} type="button">
                    Columnas
                  </Button>
                )}
              >
                <TableFilters />
              </Dropdown> */}
              {add && (
                <Button type="button" onClick={add} icon={<IconAdd />}>
                  Añadir
                </Button>
              )}
            </div>
          </div>
          {search && <TableSearch />}
        </>
      ) : (
        <div>
          <Button onClick={() => setView("table")} icon={<IconBack />}>
            Volver
          </Button>
        </div>
      )}
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
};

export default TableControls;
