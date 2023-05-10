import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className='mt-10 ml-10'>
            <UserButton />
            <ul className='flex'>
                <li className='mx-2 border-2 border-black rounded-md px-2'>
                    <Link href="/">
                        Home
                    </Link>
                </li>
                <li className='mx-2 border-2 border-black rounded-md px-2'>
                    <Link href="/dashboard">
                        Library
                    </Link>
                </li>
                <li className='mx-2 border-2 border-black rounded-md px-2'>
                    <Link href="/booksearch/addBook">
                        Add a book
                    </Link>
                </li>
            </ul>
        </nav>
    );
}