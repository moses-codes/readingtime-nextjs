import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import BookShelf from '../../components/BookShelf'
import { getAuth, clerkClient, buildClerkProps } from '@clerk/nextjs/server'
import { connectMongo } from "@/utils/connectMongo"

export default function Home(props) {
    const [shelf, setShelf] = useState([])
    useEffect(() => {
        fetch('/api/getData')
            .then(res => res.json())
            .then(data => setShelf(data.books))
    }, [])

    console.log(props)

    return (
        <Layout>
            <main
                className="p-12">
                <BookShelf
                    shelf={shelf}
                />
            </main>
        </Layout>
    )
}

export const getServerSideProps = async ctx => {
    // const { userId } = getAuth(ctx.req)
    // if (!userId) {
    //     return {
    //         redirect: {
    //             destination: "/sign-in?redirect_url=" + ctx.resolvedUrl,
    //             permanent: false,
    //         },
    //     };
    // }
    // const user = userId ? await clerkClient.users.getUser(userId) : undefined;

    return {
        props: { message: "hello" }
    }
}

// export async function getServerSideProps() {
//     // Make an API call
//     const data = await fetch('http://localhost:3000/api/getData')

//     console.log(data)

//     const shelf = await data.json()


//     // Return the data as props
//     return {
//         props: {
//             shelf
//         },
//     };
// }