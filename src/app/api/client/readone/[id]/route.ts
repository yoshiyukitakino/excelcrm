/**
 * 顧客単品取得API.
 */
import { Client } from '@/app/type/clientType';
import { NextRequest, NextResponse } from 'next/server'
import { getBook, getSheet, saveBook, myWorkbook, myExcelMessage } from "@/app/utils/myExcelJs";
import { clientColumnsMap } from '@/app/api/client/clientColumnsMap';

export async function GET(request: NextRequest, context: any) {

    try {
        const id = context.params.id;
        console.log(`id:${id}`)

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
                console.log(`### ${row} ${worksheet.getCell(row, col).value}### ${id}`);
                break;
            }
        }
        if (row === maxRows) {
            return NextResponse.json({ message: 'NG NOT FOUND', client: {} }, { status: 202 })
        }

        // clientColumnsMapの内容をコンソールに出力
        /*        Object.entries(clientColumnsMap).forEach(([key, value]) => {
                    // console.log(`Key: ${key}, Value:`, value);
                    //    Key: firstName, Value: { name: 'firstName', col: 2 }
                    worksheet.getCell(row, value.col).value = reqBody[key];
                });
        */
        const client: Client = {
            id: worksheet.getCell(row, 2).text,
            firstName: worksheet.getCell(row, 3).text,
            lastName: worksheet.getCell(row, 4).text,
            email1: worksheet.getCell(row, 5).text,
            email2: worksheet.getCell(row, 6).text,
            mobPhone: worksheet.getCell(row, 7).text,
            fixedPhone: worksheet.getCell(row, 8).text,
            pref: worksheet.getCell(row, 9).text,
            city: worksheet.getCell(row, 10).text,
            address1: worksheet.getCell(row, 11).text,
            address2: worksheet.getCell(row, 12).text,
            birthday: worksheet.getCell(row, 13).text,
        }
        console.log("complete readone");
        return NextResponse.json({ message: 'OK', client: client })
    } catch (e) {
        console.error(e);
        console.error("Error, load data");
        return NextResponse.json({ message: 'NG', client: {} }, { status: 202 })
    }
}


