/**
 * 顧客検索ページ.
 */
"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Client } from "@/app/type/clientType";
import useAuth from "@/app/utils/useAuth";

const READ_FORMAT_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/clientFormat/readall/SEARCH`;
const READALL_API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/client/search`;
const ReadClientList = () => {

  const [clientList, setClientList] = useState([]);
  const [clientColumnsObj, setClientColumnsObj] = useState([]);
  const [searchCondition, setSearchCondityon] = useState({
    name: "",
    email: "",
    phoneNo: ""
  });
  const [isSearch, setIsSearch] = useState(false);
  const [image, setImage] = useState("");
  //  const loginUserEmail = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setSearchCondityon({
      ...searchCondition,
      [name]: value,
    })
  }

  useEffect(() => {
    console.log();
  }, [isSearch]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log("###検索###");

      await (async () => {
        // サーバーサイドでデータをフェッチ
        const response = await fetch(`${READ_FORMAT_API_URL}`, { cache: "no-store" });
        const jsonData = await response.json();
        console.log(clientColumnsObj);
        setClientColumnsObj(jsonData.clientColumnsObj)
      })();
      const response = await fetch(`${READALL_API_URL}`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          name: searchCondition.name,
          email: searchCondition.email,
          phonNo: searchCondition.phoneNo
        })
      });
      const jsonData = await response.json();
      alert(jsonData.message);

      if (jsonData.clientList) {
        setClientList(jsonData.clientList)
      }
    } catch (error) {
      alert("顧客取得失敗" + error);
    }
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={searchCondition.name} onChange={handleChange} placeholder="名前" />
        <br />
        <input type="text" name="email" value={searchCondition.email} onChange={handleChange} placeholder="メール" />
        <br />
        <input type="text" name="phoneNo" value={searchCondition.phoneNo} onChange={handleChange} placeholder="電話番号" />
        <br />
        <button className="bg-blue-600 py-2 px-3 rounded-lg text-white hover:bg-blue-700 transion">
          検索</button>
        <a href={`/client/update`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">追加</a>

      </form>


      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
              </div>
            </th>

            {
              Object.entries(clientColumnsObj).map(([key, value]) => {
                const column = value as ClientColumns;  // 型アサーションを使用
                return (
                  <p >{column.name}</p>
                );
              })
            }
            <th scope="col" className="px-6 py-3">
              id
            </th>
            <th scope="col" className="px-6 py-3">
              姓名
            </th>
            <th scope="col" className="px-6 py-3">
              カナ
            </th>
            <th scope="col" className="px-6 py-3">
              Email1
            </th>
            <th scope="col" className="px-6 py-3">
              Email2
            </th>
            <th scope="col" className="px-6 py-3">
              MobPhone
            </th>
            <th scope="col" className="px-6 py-3">
              FixedPhone
            </th>
            <th scope="col" className="px-6 py-3">
              住所
            </th>
          </tr>
        </thead>
        <tbody>
          {
            clientList.map((client: Client) =>
              <tr key={client.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                  </div>
                </td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {client.id}
                </th>
                <td className="px-6 py-4">
                  {client.lastName}{client.firstName}
                </td>
                <td className="px-6 py-4">
                  カナ
                </td>
                <td className="px-6 py-4">
                  {client.email1}
                </td>
                <td className="px-6 py-4">
                  {client.email2}
                </td>
                <td className="px-6 py-4">
                  {client.mobPhone}
                </td>
                <td className="px-6 py-4">
                  {client.fixedPhone}
                </td>
                <td className="px-6 py-4">
                  {client.pref}{client.city}{client.address1}{client.address2}
                </td>
                <td className="flex items-center px-6 py-4">
                  <a href={`/client/update/${client.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">更新</a>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>


  );
}

export default ReadClientList;