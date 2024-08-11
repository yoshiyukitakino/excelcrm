/**
 * 顧客追加ページ.
 */
const CREATE_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/client/create`;
const CreateClientPage = () => {

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
        try {
            const response = await fetch(CREATE_API_URL, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
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
            alert(jsonData.message);
        } catch (error) {
            console.log("顧客登録失敗" + error);
        }
    }


    return (
        <div>
            <h1 className="page-tilte">顧客登録</h1>
            <form action={formAction}>
                <input type="text" name="lastName" placeholder="姓" required />
                <br />
                <input type="text" name="firstName" placeholder="名" required />
                <br />
                <input type="text" name="email1" placeholder="メール1" required />
                <br />
                <input type="text" name="email2" placeholder="メール2" />
                <br />
                <input type="text" name="mobPhone" placeholder="携帯電話" />
                <br />
                <input type="text" name="fixedPhone" placeholder="固定電話" />
                <br />
                <input type="text" name="pref" placeholder="都道府県" />
                <br />
                <input type="text" name="city" placeholder="市区町村" />
                <br />
                <input type="text" name="address1" placeholder="住所" />
                <br />
                <input type="text" name="address2" placeholder="ビルマンション" />
                <br />
                <input type="date" name="birthday" placeholder="生年月日" />
                <br />
                <button type="submit">作成</button>

            </form>
        </div>
    );

}


export default CreateClientPage;