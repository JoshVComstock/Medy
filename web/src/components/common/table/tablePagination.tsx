import Button from "../button/button";
import IconChevronLeft2 from "@assets/icons/iconChevronLeft2";
import IconChevronLeft from "@assets/icons/iconChevronLeft";
import IconChevronRight from "@assets/icons/iconChevronRight";
import IconChevronRight2 from "@assets/icons/iconChevronRight2";
import { useEffect } from "react";

interface Props {
  pageLength: number;
  rowsPerPage: number;
  currentPage: number;
  dataLength: number;
  pinsInPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

//* ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇ Component for render the pagination ◇◆◇◆◇◆◇◆◇◆◇◆◇◆◇
const TablePagination = ({
  rowsPerPage,
  currentPage,
  pageLength,
  dataLength,
  pinsInPage,
  setCurrentPage,
}: Props) => {
  const pageCount = Math.ceil(dataLength / rowsPerPage);
  const initialIndex = rowsPerPage * (currentPage - 1) + 1;
  const lastIndex = rowsPerPage * (currentPage - 1) + pageLength;

  useEffect(() => {
    if (currentPage > pageCount) {
      setCurrentPage(pageCount === 0 ? 1 : pageCount);
    }
  }, [pageCount]);

  return (
    <div className="sticky bg-gray-200 left-0 bottom-0 flex items-center justify-between px-2 w-full min-h-10 border border-gray-300 dark:bg-gray-500">
      <div>
        <small className="text-text/70 text-[12px] dark:text-white">
          {lastIndex === 0 ? 0 : initialIndex} - {lastIndex} de {dataLength}
        </small>
      </div>
      <div className="flex gap-4 items-center">
        <small className="text-text/70 text-[12px] dark:text-white">
          Filas: {rowsPerPage}{" "}
          {pinsInPage
            ? `(+${pinsInPage} fijado${pinsInPage > 1 ? "s" : ""})`
            : ""}
        </small>
        <div className="flex gap-1">
          {/* Button to navigate to the first page */}
          <Button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage <= 1}
            size="small"
            title="Primera página"
            icon={<IconChevronLeft2 />}
          />
          {/* Button to navigate to the previous page */}
          <Button
            onClick={() => setCurrentPage((old) => old - 1)}
            disabled={currentPage <= 1}
            size="small"
            title="Página anterior"
            icon={<IconChevronLeft />}
          />
        </div>
        <div className="flex gap-[2px]">
          {/* Generate an array of 5 page numbers centered around the current page */}
          {Array.from({ length: 5 }, (_, i) => currentPage - 3 + i).map(
            (pageNumber) => {
              // Only display the page number if it's valid
              const isValid = pageNumber >= 0 && pageNumber < pageCount;
              return (
                <Button
                  key={pageNumber}
                  className="dark:bg-zinc-600"
                  onClick={() => setCurrentPage(pageNumber + 1)}
                  size="small"
                  toggle={currentPage === pageNumber + 1}
                  disabled={!isValid}
                  icon={<p>{isValid ? pageNumber + 1 : "..."}</p>}
                  noAnimate
                />
              );
            }
          )}
        </div>
        <div className="flex gap-1">
          {/* Button to navigate to the next page */}
          <Button
            onClick={() => setCurrentPage((old) => old + 1)}
            disabled={currentPage >= pageCount}
            size="small"
            title="Página siguiente"
            icon={<IconChevronRight />}
          />
          {/* Button to navigate to the last page */}
          <Button
            onClick={() => setCurrentPage(pageCount)}
            disabled={currentPage >= pageCount}
            size="small"
            title="Última página"
            icon={<IconChevronRight2 />}
          />
        </div>
      </div>
    </div>
  );
};

export default TablePagination;
