import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router"; // Import the useRouter hook
// import readingTimeLogo from '/default.png'

// import dynamic from 'next/dynamic';
// const LibraryPage = dynamic(() => import('../pages/library'));

export default function Navbar(props) {

    const [searchValue, setSearchValue] = useState(props.searchVal || '')

    function handleChange(e) {
        setSearchValue(e.target.value)
    }

    let { pending } = props

    const router = useRouter()

    // Handle form submission for mobile section
    function handleSubmitMobile(e) {
        e.preventDefault(); // Prevent default form submission

        if (searchValue.trim() !== "") {
            // Navigate to the search page with the query parameter
            router.push({
                pathname: "/booksearch/",
                query: { search: searchValue }
            });
        }
    }

    // Handle form submission for desktop section
    function handleSubmitDesktop(e) {
        e.preventDefault(); // Prevent default form submission

        if (searchValue.trim() !== "") {
            // Navigate to the search page with the query parameter
            router.push({
                pathname: "/booksearch/",
                query: { search: searchValue }
            });
        }
    }

    return (
        <div className="navbar bg-white fixed z-50">
            {/*the mobile navbar*/}
            <div className="navbar-start lg:hidden">
                <div className="dropdown relative indicator lg:hidden mr-5">
                    {pending > 0 &&
                        <span className="indicator-item badge badge-sm badge-secondary mt-2">
                        </span>
                    }
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-10 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <Link href="/">
                            <li className='hover:underline'>
                                <div className='md:mr-5'>
                                    Home
                                </div>
                            </li>
                        </Link>
                        <Link href="/library">
                            <li className="hover:underline">

                                <div className='md:mr-5 flex'>
                                    <p>Library</p>
                                    {pending > 0 && <span className="badge badge-secondary">+{pending}</span>}
                                </div>
                            </li>
                        </Link>
                    </ul>
                </div>


                <div className=' lg:hidden'>
                    <form className='flex' onSubmit={handleSubmitMobile}>
                        <input
                            className="input input-bordered md:w-full w-20 sm:input-sm input-sm"
                            id="searchInput"
                            name="searchInput"
                            type="text"
                            placeholder="Enter a title..."
                            value={searchValue}
                            onChange={handleChange}
                        />
                        <button type="submit" className='btn btn-primary w-20 sm:btn-sm btn-sm' onClick={() => console.log('clicked')}>Search</button>
                    </form>
                </div>
            </div>

            {/*the desktop navbar*/}
            <div className="navbar-start hidden lg:flex">
                <div className="menu menu-horizontal px-20 w-full flex">

                    <Link href="/">
                        <li className="pr-14 hover:underline transition-all">Home</li>
                    </Link>

                    <Link href="/library">
                        <div className="indicator w-16">
                            {pending > 0 && <span className="indicator-item indicator-end badge badge-secondary">+{pending}</span>}
                            <li className=" hover:underline">Library</li>
                        </div>
                    </Link>

                </div>
            </div>
            <div className='lg:flex navbar-center justify-center hidden'>
                <form onSubmit={handleSubmitDesktop} className='flex'>
                    <input
                        className="input input-bordered md:w-full w-20 md:input-sm input-sm mx-1"
                        id="searchInput"
                        name="searchInput"
                        type="text"
                        placeholder="Enter a title..."
                        value={searchValue}
                        onChange={handleChange}
                    />
                    <button type="submit"
                        className={`${!searchValue && 'btn-disabled'} btn btn-primary w-20 md:btn-sm btn-sm`}

                        onClick={() => console.log('clicked')}>Search</button>
                </form>
            </div>
            <div className="navbar-end px-5">
                <UserButton afterSignOutUrl="/" />
            </div>
        </div >)
}