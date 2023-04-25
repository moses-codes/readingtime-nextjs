import { useState } from 'react';

export default function AddDocument() {
    const api_key = process.env.NEXT_PUBLIC_GOOGLE_API_KEY

    const [formData, setFormData] = useState({
        searchInput: ''
    });

    const [searchResults, setSearchResults] = useState({})

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

        const baseUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchInput}&maxResults=20&key=${api_key}`

        //https://www.googleapis.com/books/v1/volumes?q=toni%20morrison&maxResults=10&key=AIzaSyA7pTNMuie-Y3bSwqLji3cOgWahZSU3RvY

        // TODO: Submit the form data to the server
        try {
            const response = await fetch(baseUrl)
            const data = await response.json()
            setSearchResults(data)

            console.log(searchResults)
        } catch {
            console.error(error);
            throw new Error('Failed to fetch data');
        }


    };

    async function handleAdd(e) {

        //https://www.googleapis.com/books/v1/volumes?q=toni%20morrison&maxResults=10&key=AIzaSyA7pTNMuie-Y3bSwqLji3cOgWahZSU3RvY
        e.preventDefault();
        // TODO: Submit the form data to the server
        const response = await fetch('/api/postData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...formData }),
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
        <section className='m-5'>
            <form onSubmit={handleSubmit}>
                <div >
                    <label htmlFor="searchInput">Search Input:</label>
                    <input
                        className='pl-2 m-2'
                        id="searchInput"
                        name="searchInput"
                        type="text"
                        value={searchInput}
                        onChange={handleFormChange}
                    />
                    <button type="submit" className='border-2 border-black px-2 rounded-md my-3'>Submit</button>
                </div>
            </form>
            <div>
                <h3>Search results</h3>
                {searchResults.items && searchResults.items.map(b => <Book
                    title={b.volumeInfo.title}
                    authors={b.volumeInfo.authors}
                />)}
            </div>
        </section>
    );
}

export function Book(props) {
    let { title, authors } = props
    return (
        <div className='my-3'>
            <p>{title}</p>
            <p>{authors}</p>
        </div>
    )
}