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
        <div className="navbar top-0 bg-white flex justify-between md:px-5 w-full border-b-2 sticky z-50">
            <div className="flex-none">
                <Link href="/" className="btn btn-ghost normal-case text-xl no-animation">
                    <img
                        src='/bookOnly.png'
                        className='h-full rounded-md'
                    />
                </Link>
                <ul className="menu menu-horizontal px-1">

                    <li><div className='relative indicator md:mr-5'>
                        <Link href="/library/">Library {pending > 0 &&
                            <span className="indicator-item badge badge-sm badge-secondary mt-2">+{pending}
                            </span>
                        }</Link>

                    </div>
                    </li>
                    {/* <li><Link href="/booksearch/">Add Book</Link></li> */}
                    <li>
                        <form>
                            <div className='flex'>
                                <input
                                    className="input input-bordered md:w-full w-20 md:input-mdinput-sm"
                                    id="searchInput"
                                    name="searchInput"
                                    type="text"
                                    placeholder="Enter a title..."
                                    value={searchValue}
                                    onChange={handleChange}
                                // value={searchInput}
                                // onChange={handleFormChange}
                                />
                                <Link href={{ pathname: '/booksearch/', query: { myProp: searchValue } }} as="/booksearch/"><button type="submit" className='btn btn-primary md:btn-md w-16 btn-sm'>Search</button></Link>
                            </div>
                        </form>
                    </li>
                </ul>
            </div>
            <li><UserButton afterSignOutUrl="/" /></li>
        </div>
    );
}