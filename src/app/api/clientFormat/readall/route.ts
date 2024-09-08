/**
 * 顧客フォーマット取得API.
 */
import { NextRequest, NextResponse } from 'next/server'
import { getBook, getSheet, saveBook, myWorkbook, myExcelMessage } from "@/app/utils/myExcelJs";
import { ifClientColumnsObj } from '../../client/clientColumnsMap';

export async function GET(request: NextRequest, response: NextResponse) {

    console.log("###### READ FORMAT API ######");
    await new Promise((resolve) => setTimeout(resolve, 100));

    const clientColumnsMap = await getClientFormat();
    if (clientColumnsMap) {
        return NextResponse.json({ message: 'OK', clientColumnsMap: clientColumnsMap })
    } else {
        return NextResponse.json({ message: 'NG', clientColumnsMap: clientColumnsMap }, { status: 202 })
    }
}

export async function getClientFormat() {
    const clientColumnsMap: ifClientColumnsObj = {};
    try {
        await getBook();
        const worksheet = await getSheet("ClientFormat");
        if (worksheet === undefined) {
            return NextResponse.json({ message: myExcelMessage });
        }

        console.log("workbook.getWorksheet");
        worksheet.pageSetup = { orientation: 'portrait' };
        let row = 2;
        const maxRows: number = parseInt(process.env.EXCEL_CLIENT_MAX_ROWS as string);
        for (; row < maxRows; row++) {
            if (worksheet.getCell(row, 1).value === null) {
                break;
            }
            const clientFormat: ifClientColumnsObj = {};
            let col = 1;
            let key = "";
            for (; col < 20; col++) {
                if (worksheet.getCell(1, col).value === null) {
                    break;
                }
                if (col === 1) {
                    key = worksheet.getCell(row, 1).value as string;
                }
                const param: string = worksheet.getCell(1, col).value as string;
                clientFormat[param] = worksheet.getCell(row, col).value as string;
            };
            clientColumnsMap[key] = clientFormat;
        }
        /*
        Object.entries(clientColumnsMap).forEach(([key0, value0]) => {
            console.log(`aaaa ${key0} ${value0}`);
            Object.entries(value0).forEach(([key1, value1]) => {
                console.log(`bbb ${key1} ${value1} `);
            });
        });
        */
        console.log("complete load data");
    } catch (e) {
        console.error(e);
        console.error("Error, load data");
    }
    return clientColumnsMap;
}

