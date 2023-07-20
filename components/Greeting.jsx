// `use client` required for app router
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Example() {
    const { isLoaded, isSignedIn, user } = useUser();

    if (!isLoaded) {
        return null
    }

    console.log(user)

    if (!isSignedIn) {
        return (
            <div className='fade-in'>
                <h1 className="mb-5 md:text-5xl text-3xl font-medium">It's reading time!</h1>
                <Link href='/sign-in/'><button className="btn btn-primary mr-5">Sign in</button></Link>
                <Link href='/sign-up/'><span className="font uppercase underline font-medium">Sign up</span></Link>
            </div>
        )
    } else {
        return (
            <div className='fade-in'>
                <h1 className="mb-5 md:text-5xl text-3xl font-medium">It's reading time, {user.firstName}!</h1>
                <p className="mb-5">Find some books to add to your library.</p>
                <button className="btn btn-primary">{'Discover Books'}</button>
            </div>
        )
    }
}