/**
 * 顧客更新API.
 */
import { NextRequest, NextResponse } from 'next/server';
import { getBook, getSheet, saveBook, myWorkbook, myExcelMessage } from "@/app/utils/myExcelJs";
import { getClientFormat } from '../../clientFormat/readall/[screenType]/route';

interface Item {
    message: string;
}

export async function PUT(request: NextRequest, context: any) {

    try {
        console.log("#(API) CLIENT UPDATE");
        const clientColumnsObj = await getClientFormat("INPUT");
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
            const col = clientColumnsObj.id.col;
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
            worksheet.getCell(row, clientColumnsObj["id"].col).value = row;

        } else if (!proc) {
            return NextResponse.json({ message: 'NG NOT FOUND', client: {} }, { status: 202 })
        }

        // clientColumnsObjの内容をコンソールに出力
        Object.entries(clientColumnsObj).forEach(([key, value]) => {
            //console.log(`Key: ${key}, Value:`, value);
            //    Key: firstName, Value: { name: 'firstName', col: 2 }
            if (key !== "id") {
                worksheet.getCell(row, value.col).value = reqBody[key];
            }
        });
        await saveBook();

        // clientColumnsObjの内容をコンソールに出力
        const client = {};
        Object.entries(clientColumnsObj).forEach(([key, value]) => {
            // console.log(`Key: ${key}, Value:`, value);
            //    Key: firstName, Value: { name: 'firstName', col: 2 }
            client[key] = worksheet.getCell(row, value.col).value;
        });
        console.log(`#(API) CLIENT UPDATE SUCCESS ${proc}`);
        return NextResponse.json({ message: 'OK', client: client })
    } catch (err) {
        console.log(err);
        console.log(`#(API) CLIENT UPDATE ERROR`);
        return NextResponse.json<Item>({ message: 'Fail Update Item' });
    }
}


