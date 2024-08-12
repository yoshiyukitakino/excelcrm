export const CreateDetail = (props) => (

    <div>

        <div className="bg-white py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                <div className="mb-10 md:mb-16">
                    <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">顧客登録</h2>

                    <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">message.</p>
                </div>
                <form action={props.formAction} className="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2">

                    <div>
                        <label htmlFor="lastame" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">姓*</label>
                        <input name="lastName" defaultValue={props?.client.lastName} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
                    </div>

                    <div>
                        <label htmlFor="firstName" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">名*</label>
                        <input name="firstName" defaultValue={props?.client.fistName} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="email1" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">メール1*</label>
                        <input name="email1" defaultValue={props?.client.email1} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="email2" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">メール2</label>
                        <input name="email2" defaultValue={props?.client.email2} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="mobPhone" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">携帯電話*</label>
                        <input name="mobPhone" defaultValue={props?.client.mobPhone} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="fixedPhone" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">固定電話</label>
                        <input name="fixedPhone" defaultValue={props?.client.fixedPhone} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="pref" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">都道府県</label>
                        <input name="pref" defaultValue={props?.client.pref} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="city" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">市区町村</label>
                        <input name="city" defaultValue={props?.client.city} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="address1" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">住所</label>
                        <input name="address1" defaultValue={props?.client.address1} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="address2" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">ビル・マンション等</label>
                        <input name="address2" defaultValue={props?.client.address2} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="birthday" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">生年月日</label>
                        <input name="birthday" defaultValue={props?.client.birthday} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="notes" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">そのた</label>
                        <textarea name="notes" className="h-64 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"></textarea>
                    </div>

                    <div className="flex items-center justify-between sm:col-span-2">
                        <button className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">{props.process}</button>

                        <span className="text-sm text-gray-500">*Required</span>
                    </div>

                    <p className="text-xs text-gray-400">By signing up to our newsletter you agree to our <a href="#" className="underline transition duration-100 hover:text-indigo-500 active:text-indigo-600">Privacy Policy</a>.</p>
                </form>
            </div>
        </div>
    </div>

);
