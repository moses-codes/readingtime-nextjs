

export default function Book(props) {
    let { google_id, title, authors, cover, pageCount, handleAdd } = props

    if (!cover) cover = '/bookPlaceholder.png';

    return (
        <div key={google_id} className='my-3 lg:w-1/2 w-full flex justify-between border-2 border-black'>
            <div className='mr-10 w-1/4'>
                <img
                    src={cover}
                    alt="A placeholder image for books"
                    className="h-46 w-full"
                />
            </div>
            <div className='w-3/4 my-10'>
                <p>{title}</p>
                <p>{authors}</p>
                <p>{pageCount} p.</p>
                <button
                    className='border-2 my-4 p-2'
                    onClick={() => handleAdd({
                        google_id: google_id,
                        title: title,
                        authors: authors,
                        pageCount: pageCount,
                        cover: cover,
                    })}
                >
                    Add Book
                </button></div>
        </div>
    )
}