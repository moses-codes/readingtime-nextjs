import { useState, useEffect } from 'react'

import { isLoaded, useUser, SignIn } from "@clerk/clerk-react";

export default function Greeting() {
    // Use the useUser hook to get the Clerk.user object
    // This hook causes a re-render on user changes
    const { isLoaded, isSignedIn, user } = useUser();

    if (!isLoaded || !isSignedIn) {
        // You can handle the loading or signed state separately
        return null;
    }

    console.log(user)

    return <div>Hello, {user.firstName}!</div>;
}

// export default function testPage() {
//     const [data, setData] = useState({})
//     useEffect(() => {
//         async function fetchDocuments() {
//             const response = await fetch('/api/getData');
//             const results = await response.json();
//             setData(results);
//         }
//         fetchDocuments();
//     }, []);

//     const { books } = data
//     console.log(data)

//     return (<>
//         <h1>Some Data can be seen here.</h1>
//         <ul>
//             {books && books.map(r => <li key={r._id}>{r.title}</li>)}
//         </ul>
//     </>
//     )
// }