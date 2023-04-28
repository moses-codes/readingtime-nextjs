import Link from "next/link";

export default function Navbar() {
    return (
        <nav className='mt-10 ml-10'>
            <ul className='flex'>
                <li className='mx-2 border-2 border-black rounded-md px-2'>
                    <Link href="/">
                        Home
                    </Link>
                </li>
                <li className='mx-2 border-2 border-black rounded-md px-2'>
                    <Link href="/addData">
                        Add a book
                    </Link>
                </li>
            </ul>
        </nav>
    );
}