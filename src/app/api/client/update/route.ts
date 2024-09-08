/**
 * 顧客更新API.
 */
import { NextRequest, NextResponse } from 'next/server';
import { getBook, getSheet, saveBook, myWorkbook, myExcelMessage } from "@/app/utils/myExcelJs";
import { getClientFormat } from '../../clientFormat/readall/route';

interface Item {
    message: string;
}

export async function PUT(request: NextRequest, context: any) {

    try {
        console.log("###### UPDATE API ######");
        const clientColumnsMap = await getClientFormat();
        console.log(`###### UPDATE API ######${clientColumnsMap.id.col}`);
        const reqBody = await request.json();

        await getBook();
        const worksheet = await getSheet("Client");
        if (worksheet === undefined) {
            return NextResponse.json<Item>({ message: myExcelMessage });
        }
        let row = 1;
        let proc = "";
        const maxRows: number = parseInt(process.env.EXCEL_CLIENT_MAX_ROWS as string);
        for (; row < maxRows; row++) {
            const col = clientColumnsMap.id.col;
            const id = worksheet.getCell(row, col).value;
            if (!id) {
                proc = "CREATE";
                break;
            } else if (id == reqBody.id) {
                proc = "UPDATE";
                break;
            }
        }
        if (proc === "CREATE") {
            //文字を入れる（行・列指定）
            worksheet.getCell(row, clientColumnsMap["id"].col).value = row;

        } else if (!proc) {
            return NextResponse.json({ message: 'NG NOT FOUND', client: {} }, { status: 202 })
        }

        // clientColumnsMapの内容をコンソールに出力
        Object.entries(clientColumnsMap).forEach(([key, value]) => {
            //console.log(`Key: ${key}, Value:`, value);
            //    Key: firstName, Value: { name: 'firstName', col: 2 }
            if (key !== "id") {
                worksheet.getCell(row, value.col).value = reqBody[key];
            }
        });
        await saveBook();

        console.log(`###### ${proc} SUCCESS ######`);

        // clientColumnsMapの内容をコンソールに出力
        const client = {};
        Object.entries(clientColumnsMap).forEach(([key, value]) => {
            // console.log(`Key: ${key}, Value:`, value);
            //    Key: firstName, Value: { name: 'firstName', col: 2 }
            client[key] = worksheet.getCell(row, value.col).value;
        });
        return NextResponse.json({ message: 'OK', client: client })
    } catch (err) {
        console.log(err);
        return NextResponse.json<Item>({ message: 'Fail Update Item' });
    }
}


