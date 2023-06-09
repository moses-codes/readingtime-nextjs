import { useState, useEffect } from 'react'
import ReadingGoalForm from './forms/ReadingGoalForm'
import LibraryBook from "./LibraryBook"

export default function BookShelf(props) {

    const { shelf, handleDelete, handleSaveChanges } = props

    const [goalReached, setGoalReached] = useState(false)


    return (<>

        <h1 className='md:text-5xl text-xl mb-12'>Your Library</h1>

        <main className='flex flex-wrap justify-start'>
            {shelf && shelf.map(b => (

                <LibraryBook
                    key={b.book._id}
                    _id={b.book._id}
                    title={b.book.title}
                    cover={b.book.cover}
                    pageCount={b.book.pageCount}
                    progress={b.progress}
                    goal={b.goal}
                    handleDelete={handleDelete}
                    handleSaveChanges={handleSaveChanges}

                />

            ))}
        </main >
    </>
    )
}

