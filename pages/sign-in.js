import { SignIn } from "@clerk/nextjs";

export default async function Signup() {
    return (
        <section>
            <div className='container'>
                <SignIn redirectUrl="/" />
            </div>
        </section>
    )
}