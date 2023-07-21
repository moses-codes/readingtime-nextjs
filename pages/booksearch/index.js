import { useState, useEffect, use } from 'react';

import { useRouter } from 'next/router';

import Layout from '../../components/Layout'

import SearchBook from "../../components/SearchBook"

import useSWR, { mutate } from 'swr'
function fetcher(...urls) {
    const f = (u) => fetch(u).then((r) => r.json());

    if (urls.length > 1) {
        return Promise.all(urls.map(f));
    }
    return f(urls);
}


export default function BookSearch(props) {
    const router = useRouter();
    const searchInput = router.query.myProp || '';

    const api_key = process.env.NEXT_PUBLIC_GOOGLE_API_KEY

    const [pendingCount, setPendingCount] = useState(0)

    const { data: data1, error: error1, isLoading: isLoading1 } = useSWR('/api/getData', fetcher);
    const { data: data2, error: error2, isLoading: isLoading2 } = useSWR(`https://www.googleapis.com/books/v1/volumes?q=${searchInput}&maxResults=10&key=${api_key}`, fetcher);

    let inUserLibrary

    if (!isLoading1) {
        console.log('swr fetched', data1.updatedBooksReading)
        inUserLibrary = data1.updatedBooksReading.map(el => el.book.google_id)

    }

    let searchResults
    if (isLoading2) {
        searchResults = (
            <>
                <p>Loading search results...</p>
                <div role="status" className='flex justify-center'>
                    <svg aria-hidden="true" className="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span class="sr-only">Loading books...</span>
                </div>
            </>
        )
    } else if (data2.error) {
        searchResults = (
            <p>Enter something into the search bar! Try a title, author, or ISBN.</p>
        )
    } else if (data2 && !isLoading2 && !isLoading1) {
        searchResults = (
            <div className=''>
                <h2 className='font-bold'>Search results for <span className='italic'>{searchInput}</span></h2>
                {data2.items && data2.items.map(b => <SearchBook
                    isReading={inUserLibrary.includes(b.id) ? true : false}
                    key={b.id}
                    google_id={b.id}
                    title={b.volumeInfo.title}
                    authors={b.volumeInfo.authors}
                    cover={b.volumeInfo.imageLinks?.thumbnail}
                    pageCount={b.volumeInfo.pageCount}
                    handleAdd={handleAdd}
                />)}
            </div>
        )
    } else {
        searchResults = (
            <p>error</p>
        )
    }


    async function handleAdd(bookInfo) {
        // console.log('clicked')
        console.log(bookInfo)
        // TODO: Submit the form data to the server
        const response = await fetch('/api/postData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...bookInfo }),
        });

        console.log(response)

        if (response.ok) {
            console.log('Document added successfully');
            mutate('/api/getData')
            setPendingCount(prevCount => prevCount + 1)
        } else {
            console.error('Failed to add document');
        }
    };

    return (
        <>
            <Layout pending={pendingCount} >
                < div
                    className="">
                    <section className='m-6'>
                        {searchResults}
                    </section>
                </div>
            </Layout >
        </>
    );
}