/**
 * 顧客単品取得API.
 */
import { NextRequest, NextResponse } from 'next/server'
import { getBook, getSheet, saveBook, myWorkbook, myExcelMessage } from "@/app/utils/myExcelJs";
import { getClientFormat } from '@/app/api/clientFormat/readall/[screenType]/route';

export async function GET(request: NextRequest, context: any) {

    try {
        const id = context.params.id;
        console.log(`#(API) CLIENT READONE id:${id}`)
        const clientColumnsObj = await getClientFormat("INPUT");

        await getBook();
        const worksheet = await getSheet("Client");
        if (worksheet === undefined) {
            return NextResponse.json({ message: myExcelMessage });
        }
        let row = 1;
        const maxRows: number = parseInt(process.env.EXCEL_CLIENT_MAX_ROWS as string);
        for (; row < maxRows; row++) {
            const col = clientColumnsObj.id.col;
            if (worksheet.getCell(row, col).value == id) {
                //console.log(`### ${row} ${worksheet.getCell(row, col).value}### ${id}`);
                break;
            }
        }
        if (row === maxRows) {
            return NextResponse.json({ message: 'NG NOT FOUND', client: {} }, { status: 202 })
        }

        // clientColumnsObjの内容をコンソールに出力
        const client = {};
        Object.entries(clientColumnsObj).forEach(([key, value]) => {
            client[key] = worksheet.getCell(row, value.col).value;
        });
        console.log("#(API) CLIENT READONE SUCCESS");
        //console.log(JSON.stringify(client));
        return NextResponse.json({ message: 'OK', client: client })
    } catch (e) {
        console.error(e);
        console.log("#(API) READONE ERROR");
        return NextResponse.json({ message: 'NG', client: {} }, { status: 202 })
    }
}


