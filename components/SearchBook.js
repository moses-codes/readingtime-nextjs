

export default function Book(props) {
    let { google_id, title, authors, cover, pageCount, handleAdd } = props

    if (!cover) cover = '/bookPlaceholder.png';

    return (
        <div key={google_id} className='my-3 lg:w-1/2 w-full flex border-2 border-black rounded-md'>
            <div className=''>
                <img
                    src={cover}
                    alt="A placeholder image for books"
                    className="h-full w-32 max-w-lg"
                />
            </div>
            <div className='my-4 mx-5 flex flex-col justify-between'>
                <div>
                    <p className='md:text-xl text-lg font-bold'>{title}</p>
                    <p>{authors}</p>
                    <p>{pageCount} p.</p>
                </div>
                <button
                    className='btn btn-outline btn-primary btn-sm w-32'
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