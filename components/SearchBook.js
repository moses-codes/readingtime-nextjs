import { useState } from "react";

export default function Book(props) {
    let { google_id, title, authors, cover, pageCount, handleAdd, isReading } = props

    const [added, toggleAdded] = useState(false)

    // console.log(added)

    if (!cover) cover = '/bookPlaceholder.png';

    let authorsDisplay
    if (authors) {
        authorsDisplay = authors.length === 1 ? authors[0] : authors.slice(0, 3).join(', ') + " et al."
    } else {
        authorsDisplay = 'No information found'
    }

    return (
        <div key={google_id} className={`z-0 mx-auto card card-side bg-base-100 my-3 lg:w-1/2 w-full flex shadow-lg rounded-md cardHover border-2 border-slate-500 md:items-start items-center
        ${added && 'button-press bg-blue-100'}
        `}>
            <div className=''>
                <img
                    src={cover}
                    alt={`The cover of ${title}`}
                    className="h-auto md:w-32 max-w-lg  rounded-xl md:rounded-none"
                />
            </div>
            <div className='my-4 mx-5'>
                <div>
                    <p className='md:text-xl text-lg font-bold'>{title}</p>
                    <p>{authorsDisplay}</p>
                    <p>{pageCount} p.</p>
                </div>
                <button
                    className={` mt-5 block btn btn-outline btn-primary btn-sm mw-1/2 md:w-32 ${isReading ? 'btn-disabled' : ''}`}
                    onClick={() => {
                        toggleAdded(p => p = true)
                        handleAdd({
                            google_id: google_id,
                            title: title,
                            authors: authors,
                            pageCount: pageCount,
                            cover: cover,
                        })
                    }}
                >
                    {isReading ? <span>In Library</span> : <span>Add</span>}
                </button>
            </div>
        </div >
    )
}