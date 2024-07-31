import Image from "next/image"
import Link from "next/link"

const Header = () => {
    return (
        <header>
            <div>
                顧客管理
            </div>
            <nav>
                <ul className="flex justify-center items-center gap-4">
                    <li><Link href="/user/register">登録</Link></li>
                    <li><Link href="/user/login">ログイン</Link></li>
                    <li><Link href="/item/create">アイテム作成</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
