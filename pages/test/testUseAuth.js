import { useAuth } from '@clerk/nextjs';

export default function Page() {


    const { isLoaded, userId, sessionId, getToken } = useAuth();

    // In case the user signs out while on the page.
    if (!isLoaded || !userId) {
        return null;
    }

    async function handleClick() {
        console.log('clicked')
        const response = await fetch('/api/clerkTest');
        const result = await response.json()
        console.log(result)
    }

    return (
        <>
            <h1>Hello, {userId}</h1>
            <button onClick={handleClick}>
                Get Data
            </button>
        </>
    );
};