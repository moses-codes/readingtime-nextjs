import { useState, useEffect } from 'react';

import Layout from '../../components/Layout'

import SearchBook from "../../components/SearchBook"


export default function BookSearch() {
    const api_key = process.env.NEXT_PUBLIC_GOOGLE_API_KEY

    const [formData, setFormData] = useState({
        searchInput: ''
    });

    const [currUser, setUser] = useState('')

    const [searchResults, setSearchResults] = useState({})

    useEffect(() => {
        if (currUser === '') {
            fetch("/api/auth/getUser")
                .then(res => res.json())
                .then(data => setUser(data))
        }
    }, [])

    console.log(currUser)

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
        } else {
            console.error('Failed to add document');
        }
    };



    let { searchInput } = formData
    return (
        <Layout>
            {/* <SetGoal /> */}
            <div
                className="">
                <section className='m-5'>
                    <form className='form-control w-full max-w-xs' onSubmit={handleSubmit}>
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
                    <div>
                        {searchResults.items && searchResults.items.map(b => <SearchBook
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
        </Layout>
    );
}