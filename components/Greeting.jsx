// `use client` required for app router
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Example() {
    const { isLoaded, isSignedIn, user } = useUser();

    if (!isLoaded) {
        return null
    }


    if (!isSignedIn) {
        return (
            <div className='fade-in bg-base-100 p-5 m-3 rounded-lg text-black'>
                <h1 className="mb-5 md:text-5xl text-3xl font-medium">It&apos;s reading time!</h1>
                <Link href='/sign-in/'><button className="btn btn-primary mr-5">Sign in</button></Link>
                <Link href='/sign-up/'><span className="font uppercase underline font-medium">Sign up</span></Link>
            </div>
        )
    } else {
        return (
            <div className='fade-in bg-base-100 p-5 m-3 rounded-lg text-black'>
                <h1 className="mb-5 md:text-5xl text-3xl font-medium">It&apos;s reading time, {user.firstName ? user.firstName : user.username}!</h1>
                <p className="mb-5">Find some books to add to your library.</p>
                <Link href='/library'><button className="btn btn-primary">Your Library</button></Link>
                <Link href='/booksearch'><button className="btn btn-secondary ml-5">Discover Books</button></Link>
            </div>
        )
    }
}