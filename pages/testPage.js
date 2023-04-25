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