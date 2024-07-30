import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import BookShelf from '../../components/Library/BookShelf'

import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

// import { getAuth, clerkClient, buildClerkProps } from '@clerk/nextjs/server'
// import { connectMongo } from "@/utils/connectMongo"

export default function Home(props) {
    // const [shelf, setShelf] = useState([])

    const { data, error, isLoading } = useSWR('/api/getData', fetcher)

    console.log('swr fetched', data)

    // async function fetchData() {
    //     fetch('/api/getData')
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data);
    //             setShelf(data.updatedBooksReading);
    //         });
    // }
    // useEffect(() => {
    //     fetchData();
    // }, [])



    async function handleDelete(target) {
        // console.log() the _id
        console.log(target)
        // TODO: Submit the form data to the server
        const response = await fetch('/api/book/deleteBook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ target }),
        });

        console.log(response)

        if (response.ok) {
            fetchData();
            console.log('Document removed successfully');
        } else {
            console.error('Failed to remove document');
        }
    }

    async function handleSaveChanges(formData) {
        // console.log() the _id
        console.log(formData)

        // TODO: Submit the form data to the server
        const response = await fetch('/api/book/updateBook', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ formData }),
        });

        console.log(response)

        if (response.ok) {
            // fetchData();
            console.log('Book updated successfully');
        } else {
            console.error('Failed to remove document');
        }
    }

    let section

    if (isLoading) {
        section = (<div>Loading...</div>)
    } else if (error) {
        section = (<div>Error retrieving books</div>)
    } else if (data) {
        section = (
            <BookShelf
                shelf={data.updatedBooksReading}
                handleDelete={handleDelete}
                handleSaveChanges={handleSaveChanges}
            />

        )
    }

    return (
        <Layout>
            <main
                className="p-12">

                <h1 className='md:text-5xl text-2xl'>Your Library</h1>

                {section}

            </main>
        </Layout>
    )
}