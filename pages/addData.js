import { useState } from 'react';

export default function BookSearch() {
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
        } catch (error) {
            console.error(error);
            throw new Error('Failed to fetch data');
        }


    };

    async function handleAdd(e) {
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
                    key={b.id}
                    title={b.volumeInfo.title}
                    authors={b.volumeInfo.authors}
                    // cover={b.volumeInfo.imageLinks.thumbnail ? b.volumeInfo.imageLinks.thumbnail : 'no cover found'}
                    handleAdd={() => handleAdd}
                />)}
            </div>
        </section>
    );
}

export function Book(props) {
    let { title, authors, handleAdd } = props

    return (
        <div className='my-3 w-1/2 flex justify-between border-2 border-black'>
            <div className='mr-10 w-1/4'>
                {/* <img className='w-full'
                    src={cover}
                    alt={`The cover of ${title}`} /> */}
            </div>
            <div className='w-3/4 my-10'>
                <p>{title}</p>
                <p>{authors}</p>
                <button
                    className='border-2 my-4 p-2'
                    onClick={() => handleAdd()}
                >
                    Add Book
                </button></div>
        </div>
    )
}