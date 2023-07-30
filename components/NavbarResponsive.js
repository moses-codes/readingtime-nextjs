import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";
// import readingTimeLogo from '/default.png'

export default function Navbar(props) {

    const [searchValue, setSearchValue] = useState(props.searchVal || '')

    function handleChange(e) {
        setSearchValue(e.target.value)
    }

    let { pending } = props

    return (
        <div className="navbar bg-base-100">
            {/*the mobile navbar*/}
            <div className="navbar-start">
                <div className="dropdown relative indicator ">
                    {pending > 0 &&
                        <span className="indicator-item badge badge-sm badge-secondary mt-2">+{pending}
                        </span>
                    }
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-10 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <Link href="/">
                            <li>
                                <div className='md:mr-5'>
                                    Home
                                </div>
                            </li>
                        </Link>
                        <Link href="/library/">
                            <li>
                                <div className='md:mr-5'>
                                    Library
                                </div>
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className='flex'>
                    <input
                        className="input input-bordered md:w-full w-20 md:input-md input-sm"
                        id="searchInput"
                        name="searchInput"
                        type="text"
                        placeholder="Enter a title..."
                        value={searchValue}
                        onChange={handleChange}
                    // value={searchInput}
                    // onChange={handleFormChange}
                    />
                    <Link href={{ pathname: '/booksearch/', query: { myProp: searchValue } }} as="/booksearch/">
                        <button type="submit" className='btn btn-primary w-20 md:btn-md btn-sm' onClick={() => console.log('clicked')}>Search</button>
                    </Link>
                </div>
            </div>

            {/*the desktop navbar*/}
            <div className="navbar-start hidden lg:flex">
                <ul className="menu menu-horizontal px-1">

                    <li><a>Home</a></li>
                    <li><a>Library</a></li>
                </ul>
            </div>
            <div className="navbar-end">
                <UserButton afterSignOutUrl="/" />
            </div>
        </div >)
}