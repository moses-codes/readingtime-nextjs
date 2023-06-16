import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import BookShelf from '../../components/BookShelf'
// import { getAuth, clerkClient, buildClerkProps } from '@clerk/nextjs/server'
// import { connectMongo } from "@/utils/connectMongo"

export default function Home(props) {
    const [shelf, setShelf] = useState([])
    useEffect(() => {
        fetch('/api/getData')
            .then(res => res.json())
            .then(data => {
                console.log(data.bookShelf)
                setShelf(data.bookShelf)
            })
    }, [])

    console.log(shelf)

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