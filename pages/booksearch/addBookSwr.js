import { useState, useEffect, use } from 'react';

import Layout from '../../components/Layout'

import SearchBook from "../../components/SearchBook"

import useSWR, { mutate } from 'swr'
const fetcher = (...args) => fetch(...args).then(res => res.json())


export default function BookSearch() {
    const api_key = process.env.NEXT_PUBLIC_GOOGLE_API_KEY

    const [formData, setFormData] = useState({
        searchInput: ''
    });

    // const [currUser, setUser] = useState('')

    const [searchResults, setSearchResults] = useState({})

    const [pendingCount, setPendingCount] = useState(0)

    const { data, error, isLoading } = useSWR('/api/getData', fetcher)
    let inUserLibrary

    if (!isLoading) {
        console.log('swr fetched', data.updatedBooksReading)
        inUserLibrary = data.updatedBooksReading.map(el => el.book.google_id)
        console.log(inUserLibrary)
    }

    // useEffect(() => {
    //     if (currUser === '') {
    //         fetch("/api/auth/getUser")
    //             .then(res => res.json())
    //             .then(data => setUser(data))
    //     }
    // }, [])

    function handleFormChange(e) {
        let { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const searchInput = formData.searchInput.toLowerCase().split(' ').join('%20')

        const baseUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchInput}&maxResults=10&key=${api_key}`

        //https://www.googleapis.com/books/v1/volumes?q=toni%20morrison&maxResults=10&key=AIzaSyA7pTNMuie-Y3bSwqLji3cOgWahZSU3RvY

        // TODO: Submit the form data to the server
        try {
            const response = await fetch(baseUrl)
            const data = await response.json()
            setSearchResults(data)

            console.log(searchResults)
        } catch (error) {
            console.error(error);
            throw new Error('Failed to fetch data');
        }


    };

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

    let { searchInput } = formData

    return (
        <>
            <Layout
                pending={pendingCount}
            >
                {/* <SetGoal /> */}
                < div
                    className="">
                    <section className='m-6'>
                        <form className='form-control w-full max-w-xs mx-auto' onSubmit={handleSubmit}>
                            <div className='flex'>
                                <input
                                    className="input input-bordered w-full max-w-xs"
                                    id="searchInput"
                                    name="searchInput"
                                    type="text"
                                    placeholder="Search by title, author, or ISBN"
                                    value={searchInput}
                                    onChange={handleFormChange}
                                />
                                <button type="submit" className='btn btn-primary'>Submit</button>
                            </div>
                            <label className="label">
                                <span className="label-text-alt">Search for a book!</span>
                            </label>
                        </form>
                        <div className=''>
                            {searchResults.items && searchResults.items.map(b => <SearchBook
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
                    </section>
                </div>
            </Layout >
        </>
    );
}