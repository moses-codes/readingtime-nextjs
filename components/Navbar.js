import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar(props) {

    let { pending } = props

    console.log(pending)
    return (
        <div className="navbar bg-base-100 flex justify-between md:px-5 w-full">
            <div className="flex-none">
                <Link href="/" className="btn btn-ghost normal-case text-xl"><img
                    src='/readingTimeLogo.png'
                    className='h-full'
                /></Link>
                <ul className="menu menu-horizontal px-1">

                    <li><div><Link href="/library/dashboard">Library</Link>
                        {pending > 0 &&
                            <span className="badge badge-secondary badge-sm">{pending}
                            </span>
                        }
                    </div>
                    </li>
                    <li><Link href="/booksearch/addBook">Add Book</Link></li>
                    {/* <li>
                        <div className='flex '>
                            <input
                                className="input input-bordered w-full max-w-xs"
                                id="searchInput"
                                name="searchInput"
                                type="text"
                                placeholder="Search by title, author, or ISBN"
                            />
                            <Link href="/booksearch/addBook">
                                <button type="submit" className='btn btn-outline btn-primary'>Submit</button></Link>
                        </div>
                    </li> */}
                </ul>
            </div>
            <li><UserButton afterSignOutUrl="/" /></li>
        </div>
    );
}