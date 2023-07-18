

export default function Book(props) {
    let { google_id, title, authors, cover, pageCount, handleAdd, isReading } = props

    if (!cover) cover = '/bookPlaceholder.png';

    let authorsDisplay
    if (authors) {
        authorsDisplay = authors.length === 1 ? authors[0] : authors.slice(0, 3).join(', ') + " et al."
    } else {
        authorsDisplay = 'No information found'
    }

    console.log(props.isReading)

    return (
        <div key={google_id} className='mx-auto card card-side bg-base-100 my-3 lg:w-1/2 w-full flex shadow-lg rounded-md cardHover border-2 border-slate-500'>
            <div className=''>
                <img
                    src={cover}
                    alt={`The cover of ${title}`}
                    className="h-full w-32 max-w-lg "
                />
            </div>
            <div className='my-4 mx-5 flex flex-col justify-between'>
                <div>
                    <p className='md:text-xl text-lg font-bold'>{title}</p>
                    <p>{authorsDisplay}</p>
                    <p>{pageCount} p.</p>
                </div>
                <button
                    className={`btn btn-outline btn-primary btn-sm w-32 ${isReading ? 'btn-disabled' : ''}`}
                    onClick={() => handleAdd({
                        google_id: google_id,
                        title: title,
                        authors: authors,
                        pageCount: pageCount,
                        cover: cover,
                    })}
                >
                    {isReading ? <span>In Library</span> : <span>Add Book</span>}
                </button></div>
        </div>
    )
}