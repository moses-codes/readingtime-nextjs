import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => (
    <div className="flex justify-center items-center h-screen">
        <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
    </div>
);
export default SignUpPage;