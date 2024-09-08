import { Button } from "@/app/components/Button";
import { InputAll } from "@/app/components/InputAll";
import { ClientColumns } from "@/app/api/client/clientColumnsObj";

export const CreateDetail = ({ formAction, client, clientColumnsObj }) => (

    <div>
        <div className="bg-white py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                <div className="mb-10 md:mb-16">
                    <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">顧客登録</h2>

                    <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">message.</p>
                </div>
                <form action={formAction} className="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-4">
                    {/*
                    <div className="sm:col-span-4">
                        <label htmlFor="id" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">ID*</label>
                        <input name="id" defaultValue={client?.id} className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
                    </div>
*/}

                    {
                        Object.entries(clientColumnsObj).map(([key, value]) => {
                            const column = value as ClientColumns;  // 型アサーションを使用
                            return (
                                <>
                                    <InputAll
                                        key={key}
                                        inputType={column.inputType}
                                        label={column.title}
                                        name={column.name}
                                        defaultValue={client ? client[column.name] : ''}
                                        required={column?.required}  // required は boolean かと思いますので、{} を囲む
                                        readOnly={column?.readonly}
                                        colSpan={column.colSpan ? `sm:col-span-${column.colSpan}` : "sm:col-span-4"}
                                    />
                                    {column.filSpan ?
                                        <div className={`sm:col-span-${column.filSpan}`}>
                                        </div>
                                        : <></>}
                                </>
                            );
                        })
                    }
                    {/*

                    <InputAll label="ID" name="id" defaultValue={client?.id} readOnly />
                    <div className="sm:col-span-3">
                    </div>
                    <InputAll label="姓" name="lastName" defaultValue={client?.lastName} required colSpan={"sm:col-span-2"} />
                    <InputAll label="名" name="firstName" defaultValue={client?.firstName} required colSpan={"sm:col-span-2"} />
                    <InputAll label="メール1" name="email1" defaultValue={client?.email1} required colSpan={"sm:col-span-4"} />
                    <InputAll label="メール2" name="email2" defaultValue={client?.email2} colSpan={"sm:col-span-4"} />
                    <InputAll label="携帯電話" name="mobPhone" defaultValue={client?.mobPhone} colSpan={"sm:col-span-2"} />
                    <InputAll label="固定電話" name="fixedPhone" defaultValue={client?.fixedPhone} colSpan={"sm:col-span-2"} />
                    <InputAll label="都道府県" name="pref" defaultValue={client?.pref} colSpan={"sm:col-span-2"} />
                    <InputAll label="市区町村" name="city" defaultValue={client?.city} colSpan={"sm:col-span-2"} />
                    <InputAll label="住所" name="address1" defaultValue={client?.address1} colSpan={"sm:col-span-4"} />
                    <InputAll label="ビル・マンション" name="address2" defaultValue={client?.address2} colSpan={"sm:col-span-4"} />
                    <InputAll label="生年月日" name="birthday" defaultValue={client?.birthday} />
                    <div className="sm:col-span-3">
                    </div>

                    <div className="sm:col-span-4">
                        <label htmlFor="notes" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">そのた</label>
                        <textarea name="notes" className="h-64 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"></textarea>
                    </div>
*/}

                    <div className="flex items-center justify-between sm:col-span-2">
                        <Button variant={client ? "update" : "create"}>{client ? "UPDATE" : "CREATE"}</Button>
                        <span className="text-sm text-gray-500">*Required</span>
                    </div>

                    <p className="text-xs text-gray-400">By signing up to our newsletter you agree to our <a href="#" className="underline transition duration-100 hover:text-indigo-500 active:text-indigo-600">Privacy Policy</a>.</p>
                </form>
            </div>
        </div>
    </div>

);
