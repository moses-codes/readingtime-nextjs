// import { withClerkMiddleware, getAuth } from '@clerk/nextjs/server'
// import { NextResponse } from 'next/server'

// // Set the paths that don't require the user to be signed in
// const publicPaths = ['/', '/sign-in*', '/sign-up*']

// const isPublic = (path) => {
//     return publicPaths.find(x =>
//         path.match(new RegExp(`^${x}$`.replace('*$', '($|/)')))
//     )
// }

// export default withClerkMiddleware((request) => {
//     if (isPublic(request.nextUrl.pathname)) {
//         return NextResponse.next()
//     }
//     // if the user is not signed in redirect them to the sign in page.
//     const { userId } = getAuth(request)

//     if (!userId) {
//         // redirect the users to /pages/sign-in/[[...index]].ts

//         const signInUrl = new URL('/sign-in', request.url)
//         signInUrl.searchParams.set('redirect_url', request.url)
//         return NextResponse.redirect(signInUrl)
//     }
//     return NextResponse.next()
// })

// export const config = { matcher: '/((?!_next/image|_next/static|favicon.ico).*)' };

import { useState, useEffect } from 'react'

export default function testPage() {
    const [data, setData] = useState({})
    useEffect(() => {
        async function fetchDocuments() {
            const response = await fetch('/api/getData');
            const results = await response.json();
            setData(results);
        }
        fetchDocuments();
    }, []);

    const { books } = data
    console.log(data)

    return (<>
        <h1>Some Data can be seen here.</h1>
        <ul>
            {books && books.map(r => <li key={r._id}>{r.title}</li>)}
        </ul>
    </>
    )
}