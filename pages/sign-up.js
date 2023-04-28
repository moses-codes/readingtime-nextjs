import { SignUp } from "@clerk/nextjs";

export default async function Signup() {
    return (
        <section>
            <div className='container'>
                <SignUp />
            </div>
        </section>
    )
}