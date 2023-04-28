import { useState, useEffect } from 'react'

export default function BookShelf() {
    const [shelf, setShelf] = useState([])
    useEffect(() => {
        fetch('/api/getData')
            .then(res => res.json())
            .then(data => setShelf(data.books))
    }, [])

    console.log(shelf)

    return (<>

        <h1 className='md:text-5xl text-3xl'>Here's your bookshelf</h1>

        <ul className='mt-10'>
            {shelf && shelf.map(b => <li key={b._id} className='my-5'>
                <p>{b.title} by {b.authors[0]}</p>
                <p>{b.pageCount} pages</p>
            </li>)}
        </ul>

    </>
    )
}