import { redirect } from "next/navigation";
import { CreateDetail } from "../detail";

/**
 * 顧客追加ページ.
 */
const UPDATE_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/client/update`;
const REDIRECT_PAGE_URL = `${process.env.NEXT_PUBLIC_API_URL}/client/update`;
const CreateClientPage = () => {
    const process = "CREATE";
    const formAction = async (formData: FormData) => {
        "use server";
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
        try {
            const response = await fetch(`${UPDATE_API_URL}/0`, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    process: process,
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
            console.log(jsonData.client);
            console.log("4#############################");
            console.log(`${REDIRECT_PAGE_URL}/${jsonData.client.id}`);

            url = `${REDIRECT_PAGE_URL}/${jsonData.client.id}`;

            // redirect関数をreturnで返す
            //    return NextResponse.redirect(new URL(`/client/update/${jsonData.client.id}`))
        } catch (error) {
            console.log("顧客登録失敗" + error);
        }
        //        redirect(url);
    }

    return (
        <CreateDetail formAction={formAction} process={process} />
    )
}


export default CreateClientPage;