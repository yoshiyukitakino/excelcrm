/**
 * 顧客追加API.
 */
import { NextRequest, NextResponse } from 'next/server';
import { getBook, getSheet, saveBook, myWorkbook, myExcelMessage } from "@/app/utils/myExcelJs";
import { clientColumnsMap } from '@/app/api/client/clientColumnsMap';

interface Item {
    message: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
    console.log("###### CREATE API ######");
    const reqBody = await request.json();
    // console.log(reqBody);

    try {
        await getBook();
        const worksheet = await getSheet("Client");
        if (worksheet === undefined) {
            return NextResponse.json<Item>({ message: myExcelMessage });
        }
        let row = 1;
        const maxRows: number = parseInt(process.env.EXCEL_CLIENT_MAX_ROWS as string);
        for (; row < maxRows; row++) {
            const col = clientColumnsMap.id.col;
            if (worksheet.getCell(row, col).value === null) {
                break;
            }
        }
        //文字を入れる（行・列指定）
        worksheet.getCell(row, clientColumnsMap["id"].col).value = row;

        // clientColumnsMapの内容をコンソールに出力
        Object.entries(clientColumnsMap).forEach(([key, value]) => {
            // console.log(`Key: ${key}, Value:`, value);
            //    Key: firstName, Value: { name: 'firstName', col: 2 }
            worksheet.getCell(row, value.col).value = reqBody[key];
        });
        await saveBook();

        console.log("###### CREATED SUCCESS ######");
        return NextResponse.json<Item>({ message: 'Create Item' });
    } catch (err) {
        console.log(err);
        return NextResponse.json<Item>({ message: 'Fail Create Item' });
    }
}

