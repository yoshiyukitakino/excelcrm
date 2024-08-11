/**
 * 顧客検索API.
 */
import { Client } from '@/app/type/clientType';
import { NextRequest, NextResponse } from 'next/server'
import { getBook, getSheet, saveBook, myWorkbook, myExcelMessage } from "@/app/utils/myExcelJs";

export async function POST(request: NextRequest, response: NextResponse) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const reqBody = await request.json();
    console.log("###### SEARCH ######");
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
        const endRow = 3000;
        let row = worksheet.getRow(1);
        for (let i = startRow; i < endRow; i++) {
            row = worksheet.getRow(i);
            if (row.getCell(2).value === null) {
                break;
            }
            const client: Client = {
                id: row.getCell(2).text,
                firstName: row.getCell(3).text,
                lastName: row.getCell(4).text,
                email1: row.getCell(5).text,
                email2: row.getCell(6).text,
                mobPhone: row.getCell(7).text,
                fixedPhone: row.getCell(8).text,
                pref: row.getCell(9).text,
                city: row.getCell(10).text,
                address1: row.getCell(11).text,
                address2: row.getCell(12).text,
                birthday: row.getCell(13).text,
            }
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


