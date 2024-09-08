/**
 * 顧客単品取得API.
 */
import { Client } from '@/app/type/clientType';
import { NextRequest, NextResponse } from 'next/server'
import { getBook, getSheet, saveBook, myWorkbook, myExcelMessage } from "@/app/utils/myExcelJs";
import { getClientFormat } from '@/app/api/clientFormat/readall/route';

export async function GET(request: NextRequest, context: any) {

    try {
        const id = context.params.id;
        console.log(`###### READONE API ###### id:${id}`)
        const clientColumnsMap = await getClientFormat();

        await getBook();
        const worksheet = await getSheet("Client");
        if (worksheet === undefined) {
            return NextResponse.json({ message: myExcelMessage });
        }
        let row = 1;
        const maxRows: number = parseInt(process.env.EXCEL_CLIENT_MAX_ROWS as string);
        for (; row < maxRows; row++) {
            const col = clientColumnsMap.id.col;
            if (worksheet.getCell(row, col).value == id) {
                //console.log(`### ${row} ${worksheet.getCell(row, col).value}### ${id}`);
                break;
            }
        }
        if (row === maxRows) {
            return NextResponse.json({ message: 'NG NOT FOUND', client: {} }, { status: 202 })
        }

        // clientColumnsMapの内容をコンソールに出力
        const client = {};
        Object.entries(clientColumnsMap).forEach(([key, value]) => {
            client[key] = worksheet.getCell(row, value.col).value;
        });
        console.log("complete readone");
        //console.log(JSON.stringify(client));
        return NextResponse.json({ message: 'OK', client: client })
    } catch (e) {
        console.error(e);
        console.error("Error, load data");
        return NextResponse.json({ message: 'NG', client: {} }, { status: 202 })
    }
}


