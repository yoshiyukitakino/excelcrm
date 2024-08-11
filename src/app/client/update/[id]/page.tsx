import { redirect } from 'next/navigation';
import Link from 'next/link';

const READONE_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/client/readone`;
const UPDATE_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/client/update`;

export async function formAction(formData: FormData, context: any) {
    "use server";
    console.log("### UpdateClientPage formAction ###");
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

    try {
        const response = await fetch(`${UPDATE_API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
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
        if (jsonData.success) {
            return redirect(`/client/readOne/${id}`);
        } else {
            throw new Error(jsonData.message);
        }
    } catch (error) {
        return {
            props: {
                error: `商品変更失敗: ${error.message}` as string,
            },
        };
    }
}

async function UpdateClientPage({ params }: { params: { id: string } }) {
    console.log("### UpdateClientPage ###");
    const { id } = params;

    // サーバーサイドでデータをフェッチ
    const response = await fetch(`${READONE_API_URL}/${id}`, { cache: "no-store" });
    const jsonData = await response.json();
    const client = jsonData.client;
    console.log(jsonData);
    console.log(client);
    return (
        <div>
            <h1 className="page-tilte">顧客変更</h1>
            <form action={formAction}>
                <input type="text" name="id" defaultValue={client.id} placeholder="id" required />
                <br />
                <input type="text" name="lastName" defaultValue={client.lastName} placeholder="姓" required />
                <br />
                <input type="text" name="firstName" defaultValue={client.firstName} placeholder="名" required />
                <br />
                <input type="text" name="email1" defaultValue={client.email1} placeholder="メール1" required />
                <br />
                <input type="text" name="email2" defaultValue={client.email2} placeholder="メール2" />
                <br />
                <input type="text" name="mobPhone" defaultValue={client.mobPhone} placeholder="携帯電話" />
                <br />
                <input type="text" name="fixedPhone" defaultValue={client.fixedPhone} placeholder="固定電話" />
                <br />
                <input type="text" name="pref" defaultValue={client.pref} placeholder="都道府県" />
                <br />
                <input type="text" name="city" defaultValue={client.city} placeholder="市区町村" />
                <br />
                <input type="text" name="address1" defaultValue={client.address1} placeholder="住所" />
                <br />
                <input type="text" name="address2" defaultValue={client.address2} placeholder="ビルマンション" />
                <br />
                <input type="date" name="birthday" defaultValue={client.birthday} placeholder="生年月日" />
                <br />
                <button type="submit">変更</button>
            </form>
        </div>
    );
}

export default UpdateClientPage;
