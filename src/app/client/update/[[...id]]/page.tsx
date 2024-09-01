import { redirect } from 'next/navigation';
import Link from 'next/link';
import { CreateDetail } from '@/app/client/detail';

/**
 * 顧客追加更新ページ.
 */
const READONE_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/client/readone`;
const UPDATE_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/client/update`;
async function UpdateClientPage({ params }: { params: { id: string } }) {
    console.log("### UpdateClientPage ###");

    const formAction = async (formData: FormData) => {
        "use server";
        const id = formData.get("id");
        const firstName = formData.get("firstName");
        const lastName = formData.get("lastName");
        const email1 = formData.get("email1");
        const email2 = formData.get("email2");
        const mobPhone = formData.get("mobPhone");
        const fixedPhone = formData.get("fixedPhone");
        const pref = formData.get("pref");
        const city = formData.get("city");
        const address1 = formData.get("address1");
        const address2 = formData.get("address2");
        const birthday = formData.get("birthday");
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
                body: JSON.stringify({
                    id: id,
                    firstName: firstName,
                    lastName: lastName,
                    email1: email1,
                    email2: email2,
                    mobPhone: mobPhone,
                    fixedPhone: fixedPhone,
                    pref: pref,
                    city: city,
                    address1: address1,
                    address2: address2,
                    birthday: birthday
                })
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
    return (


        <div>
            <CreateDetail formAction={formAction} process={process} client={client} />
        </div>
    );
}

export default UpdateClientPage;
