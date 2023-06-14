import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
    return (
        <div className="navbar bg-base-100 flex justify-between md:px-5">
            <div className="flex-none">
                <Link href="/" className="btn btn-ghost normal-case text-xl">ReadingTime</Link>
                <ul className="menu menu-horizontal px-1">

                    <li><Link href="/library/dashboard">Library</Link></li>
                    <li><Link href="/booksearch/addBook">Add Book</Link></li>
                </ul>
            </div>
            <li><UserButton /></li>
        </div>
    );
}