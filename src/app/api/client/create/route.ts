/**
 * 顧客追加API.
 */
import { NextRequest, NextResponse } from 'next/server';
import { getBook, getSheet, saveBook, myWorkbook, myExcelMessage } from "@/app/utils/myExceljs";

interface Item {
    message: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
    console.log("###### CREATE ######");
    const reqBody = await request.json();
    console.log(reqBody);

    try {
        await getBook();
        const worksheet = await getSheet("Client");
        if (worksheet === undefined) {
            return NextResponse.json<Item>({ message: myExcelMessage });
        }
        //文字を入れる（行・列指定）
        worksheet.getCell(1, 1).value = "商品";
        worksheet.getCell(2, 1).value = "りんご";
        worksheet.getCell(3, 1).value = "みかん";
        worksheet.getCell(4, 1).value = "ぶどう";
        await saveBook();

        console.log("#test2-end");
        return NextResponse.json<Item>({ message: 'Create Item' });
    } catch (err) {
        console.log(err);
        return NextResponse.json<Item>({ message: 'Fail Create Item' });
    }
}

