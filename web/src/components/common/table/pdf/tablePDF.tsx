import {
  Document,
  PDFViewer,
  Page,
  StyleSheet,
  View,
} from "@react-pdf/renderer";
import TablePDFRow from "./tablePDFRow";
import TablePDFHeader from "./tablePDFHeader";
import { Row, Table } from "@tanstack/react-table";
import TablePDFFooter from "./tablePDFFooter";

interface Props {
  table: Table<any>;
  filter: string;
  dataFiltered: Row<any>[];
}

//getCoreRowModel -->all files
//getRowModel --> just some data
const TablePDF = ({ table, filter, dataFiltered }: Props) => {
  return (
    <PDFViewer height={"100%"} width={"100%"}>
      <Document>
        <Page orientation="landscape" size="A4">
          <View style={styles.tableContainer}>
            {table.getHeaderGroups().map((group) => (
              <TablePDFHeader key={group.id} headers={group.headers} />
            ))}
            {/* if someone search the pdf shows the filtered data , if nobody search... the table show the full data */}
            <TablePDFRow
              rows={
                filter != ""
                  ? dataFiltered
                  : table.getCoreRowModel().rows.filter((row) => row.original)
              }
            />
          </View>
          {table.getFooterGroups().map((group) => (
            <TablePDFFooter
              key={group.id}
              headers={group.headers}
              data={dataFiltered}
              filter={filter}
            />
          ))}
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default TablePDF;

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 20,
  },
});
