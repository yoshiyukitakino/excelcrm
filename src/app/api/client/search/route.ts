/**
 * 顧客検索API.
 */
import { Client } from '@/app/type/clientType';
import { NextRequest, NextResponse } from 'next/server'
import { getBook, getSheet, saveBook, myWorkbook, myExcelMessage } from "@/app/utils/myExcelJs";
import { clientColumnsMap } from '@/app/api/client/clientColumnsMap';

export async function POST(request: NextRequest, response: NextResponse) {

    console.log("###### SEARCH API ######");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const reqBody = await request.json();
    console.log(reqBody);

    const clientList: Client[] = [];

    try {
        await getBook();
        const worksheet = await getSheet("Client");
        if (worksheet === undefined) {
            return NextResponse.json({ message: myExcelMessage });
        }

        console.log("workbook.getWorksheet");
        worksheet.pageSetup = { orientation: 'portrait' };
        const startRow = 1;
        let row = 1;
        const maxRows: number = parseInt(process.env.EXCEL_CLIENT_MAX_ROWS as string);
        for (; row < maxRows; row++) {
            const col = clientColumnsMap.id.col;
            if (worksheet.getCell(row, 2).value === null) {
                break;
            }
            const client = {};
            Object.entries(clientColumnsMap).forEach(([key, value]) => {
                //console.log(`Key: ${key}, Value:`, value);
                //    Key: firstName, Value: { name: 'firstName', col: 2 }
                client[key] = worksheet.getCell(row, value.col).value;
            });
            clientList.push(client);
        }
        console.log("complete load data");
        return NextResponse.json({ message: 'OK', clientList: clientList })
    } catch (e) {
        console.error(e);
        console.error("Error, load data");
        return NextResponse.json({ message: 'NG', clientList: clientList }, { status: 202 })
    }
}


