/**
 * 顧客フォーマット取得API.
 */
import { NextRequest, NextResponse } from 'next/server'
import { getBook, getSheet, myExcelMessage } from "@/app/utils/myExcelJs";
import { ClientColumns, ifClientColumnsObj } from '@/app/api/client/clientColumnsObj';

export async function GET(request: NextRequest, context: any) {

    const screenType = context.params.screenType;
    console.log(`#(API) CLIENT FORMAT READ  screenType:${screenType}`);
    await new Promise((resolve) => setTimeout(resolve, 100));

    const clientColumnsObj = await getClientFormat(screenType);
    if (clientColumnsObj) {
        console.log(`#(API) CLIENT FORMAT SUCCESS`);
        return NextResponse.json({ message: 'OK', clientColumnsObj: clientColumnsObj })
    } else {
        console.log(`#(API) CLIENT FORMAT ERROR`);
        return NextResponse.json({ message: 'NG', clientColumnsObj: clientColumnsObj }, { status: 202 })
    }
}

export async function getClientFormat(screenType: string) {
    const clientColumnsObj: ifClientColumnsObj = {};
    try {
        await getBook();
        const worksheet = await getSheet("ClientFormat");
        if (worksheet === undefined) {
            return NextResponse.json({ message: myExcelMessage });
        }

        worksheet.pageSetup = { orientation: 'portrait' };
        let row = 2;
        const maxRows: number = parseInt(process.env.EXCEL_CLIENT_MAX_ROWS as string);
        const columnsMap = [];
        for (; row < maxRows; row++) {
            if (worksheet.getCell(row, 1).value === null) {
                break;
            }
            const clientFormat = {};
            let col = 1;
            let key = "";
            for (; col < 20; col++) {
                if (worksheet.getCell(1, col).value === null) {
                    break;
                }
                if (col === 1) {
                    key = worksheet.getCell(row, 1).value as string;
                }
                const param: string = worksheet.getCell(1, col).value as string;
                clientFormat[param] = worksheet.getCell(row, col).value as string;
            };
            columnsMap.push(clientFormat);
        }
        if (screenType === "SEARCH") {
            columnsMap.sort((a, b) => a.sortedSearch > b.sortedSearch ? 1 : -1);
            columnsMap.forEach(function (clientFormat) {
                if (clientFormat.sortedSearch) {
                    clientColumnsObj[clientFormat.name] = clientFormat;
                }
            });

        } else {
            columnsMap.sort((a, b) => a.sortedInput > b.sortedInput ? 1 : -1);
            columnsMap.forEach(function (clientFormat) {
                if (clientFormat.sortedInput) {
                    clientColumnsObj[clientFormat.name] = clientFormat;
                }
            });
        }
        /*
        Object.entries(clientColumnsObj).forEach(([key0, value0]) => {
            console.log(`aaaa ${key0} ${value0}`);
            Object.entries(value0).forEach(([key1, value1]) => {
                console.log(`bbb ${key1} ${value1} `);
            });
        });
        */
    } catch (e) {
        console.error(e);
    }
    return clientColumnsObj;
}

