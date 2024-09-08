import { redirect } from 'next/navigation';
import Link from 'next/link';
import { CreateDetail } from '@/app/client/detail';
import { ifClientColumnsObj } from '@/app/api/client/clientColumnsMap';

/**
 * 顧客追加更新ページ.
 */
const READ_FORMAT_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/clientFormat/readall`;
const READONE_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/client/readone`;
const UPDATE_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/client/update`;
async function UpdateClientPage({ params }: { params: { id: string } }) {
    console.log("### UpdateClientPage ###");
    // サーバーサイドでデータをフェッチ
    const response = await fetch(`${READ_FORMAT_API_URL}`, { cache: "no-store" });
    const jsonData = await response.json();
    const clientColumnsMap = jsonData.clientColumnsMap;

    const formAction = async (formData: FormData) => {
        "use server";
        const postData: ifClientColumnsObj = {};
        Object.entries(clientColumnsMap).forEach(([key0, value0]) => {
            console.log(`formAction ${key0} ${value0}`);
            postData[key0] = formData.get(key0) as string;
        });
        let url: string = '';
        let updateId;
        let message;
        try {
            const response = await fetch(`${UPDATE_API_URL}`, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData)
            });
            const jsonData = await response.json();
            updateId = jsonData.client.id;
            message = jsonData.message;
        } catch (error) {
            return {
                props: {
                    error: `顧客変更失敗: ${error.message}` as string,
                },
            };
        }
        console.log(`redirect ${updateId} ${message}`);
        //alert(`${updateId} ${message}`);
        if (message === 'OK') {
            return redirect(`/client/update/${updateId}`);
        } else {
            throw new Error(message);
        }
    }

    const { id } = params;
    const process = id ? "UPDATE" : "CRATE";
    let client = null;
    console.log(`id = ${id}`);

    if (id) {
        // サーバーサイドでデータをフェッチ
        const response = await fetch(`${READONE_API_URL}/${id}`, { cache: "no-store" });
        const jsonData = await response.json();
        client = jsonData.client;
        //console.log(client);
    }
    /*
    Object.entries(clientColumnsMap).forEach(([key0, value0]) => {
        console.log(`load ${key0} ${value0}`);
        Object.entries(value0).forEach(([key1, value1]) => {
            console.log(`load ${key1} ${value1}`);
        });
    });
    */
    return (

        <div>
            <CreateDetail formAction={formAction} process={process} client={client} clientColumnsMap={clientColumnsMap} />
        </div >
    );
}

export default UpdateClientPage;
