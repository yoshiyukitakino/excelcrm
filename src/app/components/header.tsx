import Image from "next/image"
import Link from "next/link"

const Header = () => {
    return (
        <header className="flex items-center justify-between py-4 md:py-8">
            {/* logo - start */}
            <a href="/" className="inline-flex items-center gap-2.5 text-2xl font-bold text-black md:text-3xl" aria-label="logo">
                <svg width="95" height="94" viewBox="0 0 95 94" className="h-auto w-6 text-indigo-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M96 0V47L48 94H0V47L48 0H96Z" />
                </svg>

                顧客管理
            </a>
            {/* logo - end */}

            {/* nav - start */}
            <nav className="hidden gap-12 lg:flex">
                <a href={`/client/`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">検索</a>

                <a href="#" className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700"></a>
                <a href="#" className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700">About</a>
            </nav>
            {/* nav - end */}

            {/* buttons - start */}
            <div className="-ml-8 hidden flex-col gap-2.5 sm:flex-row sm:justify-center lg:flex lg:justify-start">
                <a href="#" className="inline-block rounded-lg px-4 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:text-indigo-500 focus-visible:ring active:text-indigo-600 md:text-base">Sign in</a>

                <a href="#" className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Sign up</a>
            </div>

            {/* buttons - end */}
            <nav>
                <ul className="flex justify-center items-center gap-4">
                </ul>
            </nav>

        </header>

    )
}

export default Header
