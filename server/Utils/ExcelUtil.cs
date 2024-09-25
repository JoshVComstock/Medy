using NPOI.XSSF.UserModel;
using NPOI.SS.UserModel;

namespace UploadExcel.WebApi;


public static class ExcelUtil
{

    private static void SetCellValue(ICell cell, object value, Type propertyType)
    {
        if (value == null)
        {
            cell.SetCellValue("");
        }
        else if (propertyType == typeof(string))
        {
            cell.SetCellValue(value.ToString());
        }
        else if (propertyType == typeof(int) || propertyType == typeof(int?))
        {
            cell.SetCellValue(Convert.ToInt32(value));
        }
        else if (propertyType == typeof(decimal) || propertyType == typeof(decimal?))
        {
            cell.SetCellValue(Convert.ToDouble(value));
        }
        else if (propertyType == typeof(DateTime) || propertyType == typeof(DateTime?))
        {
            var dateValue = (DateTime)value;
            cell.SetCellValue(dateValue.ToString("yyyy-MM-dd"));
        }
        else
        {
            cell.SetCellValue(value.ToString());
        }
    }


    private static void Borders(ICellStyle cellStyle)
    {
        cellStyle.BorderBottom = BorderStyle.Thin;
        cellStyle.BorderTop = BorderStyle.Thin;
        cellStyle.BorderLeft = BorderStyle.Thin;
        cellStyle.BorderRight = BorderStyle.Thin;

    }

    public static byte[] CreateFile<T>(List<T> source, string title, string subtitle)
    {
        var workbook = new XSSFWorkbook();
        var sheet = workbook.CreateSheet("Hoja1");

        // Create a style with centered alignment
        var centeredBorderStyle = workbook.CreateCellStyle();
        centeredBorderStyle.Alignment = HorizontalAlignment.Center;
        Borders(centeredBorderStyle);

        // Create a style with border
        var borderStyle = workbook.CreateCellStyle();
        Borders(borderStyle);

        var properties = typeof(T).GetProperties();

        // Title
        var titleRow = sheet.CreateRow(2);
        var titleCell = titleRow.CreateCell(2);
        titleCell.SetCellValue(title);
        titleCell.CellStyle = centeredBorderStyle; // Apply the centered style to the title cell

        // Merge cells in the title row across the same number of columns as the table
        //sheet.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(0, 0, 0, properties.Length - 1));
        sheet.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(2, 2, 2, 7));

        // Subtitle
        var subtitleRow = sheet.CreateRow(3);
        var subtitleCell = subtitleRow.CreateCell(2);
        subtitleCell.SetCellValue(subtitle);
        subtitleCell.CellStyle = centeredBorderStyle;
        sheet.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(3, 3, 2, 7));

        var rowHeader = sheet.CreateRow(4);

        //header
        var font = workbook.CreateFont();
        font.IsBold = true;
        var style = workbook.CreateCellStyle();
        style.SetFont(font);
        Borders(style);

        var colIndex = 2;

        var subHeaderRow = sheet.CreateRow(5); // Create a new row for sub-headers
        foreach (var property in properties)
        {
            var cell = rowHeader.CreateCell(colIndex);

            if (property.Name == "Codigo")
            {
                cell.SetCellValue("Cuentas del mayor");
                //row 4, row 5, col 2, col 3
                sheet.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(4, 5, colIndex, colIndex + 1));
                colIndex = colIndex + 2;
            }
            if (property.Name == "SUMADeudora")
            {
                cell.SetCellValue("SUMAS");
                sheet.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(4, 4, colIndex, colIndex + 1));

                // Add sub-headers
                var subCell1 = subHeaderRow.CreateCell(colIndex);
                subCell1.SetCellValue("Deudas");
                subCell1.CellStyle = style;

                var subCell2 = subHeaderRow.CreateCell(colIndex + 1);
                subCell2.SetCellValue("Acredoras");
                subCell2.CellStyle = style;

                colIndex = colIndex + 2;
            }
            if (property.Name == "SALDODeudora")
            {
                cell.SetCellValue("SALDOS");
                sheet.AddMergedRegion(new NPOI.SS.Util.CellRangeAddress(4, 4, colIndex, colIndex + 1));
                cell.CellStyle = centeredBorderStyle;

                // Add sub-headers
                var subCell1 = subHeaderRow.CreateCell(colIndex);
                subCell1.SetCellValue("Deudas");
                subCell1.CellStyle = style;

                var subCell2 = subHeaderRow.CreateCell(colIndex + 1);
                subCell2.SetCellValue("Acredoras");
                subCell2.CellStyle = style;

                colIndex = colIndex + 2;
            }
            cell.CellStyle = style;
        }
        //end header

        //content
        var rowNum = 6;
        foreach (var item in source)
        {
            var rowContent = sheet.CreateRow(rowNum);

            var colContentIndex = 2;
            foreach (var property in properties)
            {
                var cellContent = rowContent.CreateCell(colContentIndex);
                var value = property.GetValue(item, null);

                cellContent.CellStyle = borderStyle; // Apply the border style to each cell

                //load the data
                if (value != null) SetCellValue(cellContent, value, property.PropertyType);

                colContentIndex++;
            }

            rowNum++;
        }

        //end content

        // Auto-size columns to fit content
        for (int i = 0; i < properties.Length; i++)
        {
            sheet.AutoSizeColumn(i);
        }

        var stream = new MemoryStream();
        workbook.Write(stream);
        var content = stream.ToArray();

        return content;
    }
}
