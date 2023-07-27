import { useState, useEffect } from 'react'
import ReadingGoalForm from './forms/ReadingGoalForm'
import LibraryBook from "./LibraryBook"

export default function BookShelf(props) {

    const { shelf, handleDelete, handleSaveChanges, handleUpdatePageCount } = props

    const [goalReached, setGoalReached] = useState(false)

    console.log(shelf)


    return (<>
        <main className='flex flex-wrap justify-start'>

            {shelf && shelf.map(b => (

                <LibraryBook
                    key={b.book._id}
                    _id={b.book._id}
                    title={b.book.title}
                    cover={b.book.cover}
                    pageCount={b.pageCount}
                    progress={b.progress}
                    goal={b.goal}
                    handleDelete={handleDelete}
                    handleSaveChanges={handleSaveChanges}
                    handleUpdatePageCount={handleUpdatePageCount}
                />

            ))}
        </main >
    </>
    )
}

