/**
 * 顧客検索API.
 */
import { Client } from '@/app/type/clientType';
import { NextRequest, NextResponse } from 'next/server'
import { getBook, getSheet, saveBook, myWorkbook, myExcelMessage } from "@/app/utils/myExcelJs";
import { getClientFormat } from '@/app/api/clientFormat/readall/[screenType]/route';

export async function POST(request: NextRequest, response: NextResponse) {


    try {
        console.log("#(API) CLIENT SEARCH");
        const clientColumnsObj = await getClientFormat("SEARCH");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const reqBody = await request.json();
        //console.log(reqBody);

        const clientList: Client[] = [];

        await getBook();
        const worksheet = await getSheet("Client");
        if (worksheet === undefined) {
            return NextResponse.json({ message: myExcelMessage });
        }

        //console.log("workbook.getWorksheet");
        worksheet.pageSetup = { orientation: 'portrait' };
        const startRow = 1;
        let row = 1;
        const maxRows: number = parseInt(process.env.EXCEL_CLIENT_MAX_ROWS as string);
        for (; row < maxRows; row++) {
            const col = clientColumnsObj.id.col;
            if (worksheet.getCell(row, 2).value === null) {
                break;
            }
            const client = {};
            Object.entries(clientColumnsObj).forEach(([key, value]) => {
                //console.log(`Key: ${key}, Value:`, value);
                //    Key: firstName, Value: { name: 'firstName', col: 2 }
                client[key] = worksheet.getCell(row, value.col).value;
            });
            clientList.push(client);
        }
        console.log("#(API) CLIENT SEARCH SUCCESS");
        return NextResponse.json({ message: 'OK', clientList: clientList })
    } catch (e) {
        console.error(e);
        console.log("#(API) CLIENT SEARCH ERROR");
        return NextResponse.json({ message: 'NG', clientList: clientList }, { status: 202 })
    }
}