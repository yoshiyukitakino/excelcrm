import ExcelJS from "exceljs";
import path from "path";
import fs from 'fs';

export let myExcelMessage: string;
export let myWorkbook: ExcelJS.Workbook;
let filePath: string;

export async function getBook(): Promise<ExcelJS.Worksheet | undefined> {

    const workbook: ExcelJS.Workbook = new ExcelJS.Workbook();
    //console.log("new ExcelJS.Workbook()");

    filePath = path.join(`${process.env.EXCEL_PATH}`, `${process.env.EXCEL_FILE}`);
    //console.log(`filepath:::${filePath}`);
    if (!fs.existsSync(filePath)) {
        console.error('getBook:File not found:', filePath);
        myExcelMessage = 'Excel not found';
        return;
    }

    await workbook.xlsx.readFile(filePath);
    myWorkbook = workbook;
    //console.log("workbook.xlsx.readFile");
}

export async function getSheet(sheetName: string): Promise<ExcelJS.Worksheet | undefined> {
    const worksheet: ExcelJS.Worksheet | undefined = myWorkbook.getWorksheet(sheetName);
    if (!worksheet) {
        console.log("getSheet:worksheet error");
        myExcelMessage = 'Excel not found';
        return;
    }
    return worksheet;
}

export async function saveBook() {
    await myWorkbook.xlsx.writeFile(filePath);
}

