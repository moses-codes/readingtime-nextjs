import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
// import readingTimeLogo from '/default.png'

export default function Navbar(props) {

    let { pending } = props

    // console.log(pending)
    return (
        <div className="navbar bg-base-100 flex justify-between md:px-5 w-full">
            <div className="flex-none">
                <Link href="/" className="btn btn-ghost normal-case text-xl no-animation">
                    <img
                        src='/bookOnly.png'
                        className='h-full rounded-md'
                    />
                </Link>
                <ul className="menu menu-horizontal px-1">

                    <li><div className='relative indicator md:mr-5'><Link href="/library/">Library {pending > 0 &&
                        <span className="indicator-item badge badge-sm badge-secondary mt-2">+{pending}
                        </span>
                    }</Link>

                    </div>
                    </li>
                    <li><Link href="/booksearch/addBook">Add Book</Link></li>
                </ul>
            </div>
            <li><UserButton afterSignOutUrl="/" /></li>
        </div>
    );
}