import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { Header, Row, flexRender } from "@tanstack/react-table";
import { tailwindColors } from "../../../../utils/tailwindConfig";
import { receiveData } from "../utils/receiveData";

interface Props {
  headers: Header<any, unknown>[];
  data: Row<any>[];
  filter: string;
}

const TablePDFFooter = ({ headers, data, filter }: Props) => {
  return (
    <View style={styles.row}>
      {headers.map((header) => (
        <Text key={header.id} style={styles.header}>
          {flexRender((e) => {
            if (!header.column.columnDef.footer) return <></>;
            if (typeof header.column.columnDef.footer === "function") {
              return receiveData(
                {
                  ...e,
                  pageData: data,
                  filter,
                  isPDF: true,
                },
                header.column.columnDef.footer
              );
            }
            return <>{header.column.columnDef.footer}</>;
          }, header.getContext())}
        </Text>
      ))}
    </View>
  );
};

export default TablePDFFooter;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: tailwindColors.gray["300"],
    backgroundColor: tailwindColors.gray["200"],
  },
  header: {
    flex: 1,
    fontSize: 10,
    paddingVertical: 2,
    color: tailwindColors.gray["800"],
  },
});
