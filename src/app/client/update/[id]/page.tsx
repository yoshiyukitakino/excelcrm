import { redirect } from 'next/navigation';
import Link from 'next/link';
import { CreateDetail } from '@/app/client/detail';

/**
 * 顧客更新ページ.
 */
const READONE_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/client/readone`;
const UPDATE_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/client/update`;
async function UpdateClientPage({ params }: { params: { id: string } }) {
    console.log("### UpdateClientPage ###");
    const process = "UPDATE";

    const formAction = async (formData: FormData, context: any) => {
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
                    process: process,
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

    const { id } = params;

    // サーバーサイドでデータをフェッチ
    const response = await fetch(`${READONE_API_URL}/${id}`, { cache: "no-store" });
    const jsonData = await response.json();
    const client = jsonData.client;
    //    console.log(jsonData);
    //    console.log(client);
    return (

        <div>

            <div className="bg-white py-6 sm:py-8 lg:py-12">
                <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                    <div className="mb-10 md:mb-16">
                        <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">顧客登録</h2>

                        <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">message.</p>
                    </div>
                    <form action={formAction} className="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2">

                        <div>
                            <label htmlFor="id" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">ID*</label>
                            <input name="id" defaultValue={client.id} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
                        </div>
                        <div>
                            <label htmlFor="lastame" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">姓*</label>
                            <input name="lastName" defaultValue={client.lastName} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
                        </div>

                        <div>
                            <label htmlFor="firstName" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">名*</label>
                            <input name="firstName" defaultValue={client.fistName} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="email1" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">メール1*</label>
                            <input name="email1" defaultValue={client.email1} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="email2" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">メール2</label>
                            <input name="email2" defaultValue={client.email2} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="mobPhone" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">携帯電話*</label>
                            <input name="mobPhone" defaultValue={client.mobPhone} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="fixedPhone" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">固定電話</label>
                            <input name="fixedPhone" defaultValue={client.fixedPhone} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="pref" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">都道府県</label>
                            <input name="pref" defaultValue={client.pref} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="city" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">市区町村</label>
                            <input name="city" defaultValue={client.city} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="address1" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">住所</label>
                            <input name="address1" defaultValue={client.address1} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="address2" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">ビル・マンション等</label>
                            <input name="address2" defaultValue={client.address2} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="birthday" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">生年月日</label>
                            <input name="birthday" defaultValue={client.birthday} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="notes" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">そのた</label>
                            <textarea name="notes" className="h-64 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"></textarea>
                        </div>

                        <div className="flex items-center justify-between sm:col-span-2">
                            <button className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">{process}</button>

                            <span className="text-sm text-gray-500">*Required</span>
                        </div>

                        <p className="text-xs text-gray-400">By signing up to our newsletter you agree to our <a href="#" className="underline transition duration-100 hover:text-indigo-500 active:text-indigo-600">Privacy Policy</a>.</p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateClientPage;
