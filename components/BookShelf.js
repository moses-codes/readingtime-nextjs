import { useState } from 'react'
import ReadingGoalForm from './forms/ReadingGoalForm'
import LibraryBook from "./Library/LibraryBookTEST"
import LibraryBookModal from './Library/LibraryBookTESTModal'

import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'

export default function BookShelf(props) {


    const [selectedId, setSelectedId] = useState(null)


    console.log(selectedId)
    const { shelf, handleDelete, handleSaveChanges, handleUpdatePageCount } = props

    console.log(shelf)

    function findObjectById(array, idToFind) {
        return array.find(obj => obj.book._id === idToFind);
    }

    let currBook

    if (selectedId) {
        let item = findObjectById(shelf, selectedId)
        console.log(item)
        currBook = item
        console.log('the current book is ', currBook.book.title)
    } else {
        currBook = null
    }

    console.log(currBook ? currBook : 'no book selected')


    const handleParentClick = () => {
        // Do something when the parent div is clicked
        console.log('parent clicked')
        setSelectedId(null)
    };

    const handleButtonClick = (e) => {
        // Do something when the button inside the child div is clicked

        // e.stopPropagation(); // Stop event propagation to the parent div
        console.log('button clicked')
        setSelectedId(null)
    };


    return (<>
        <main className='flex flex-wrap justify-start relative'>

            <LayoutGroup>
                <div className='z-0 flex flex-wrap'>

                    {/*Animate card - to - modal when a book is selected*/}

                    {shelf && shelf.map((b, i) => (

                        <LibraryBook
                            _id={b.book._id}
                            title={b.book.title}
                            pageCount={b.pageCount}
                            cover={`https://books.google.com/books/publisher/content/images/frontcover/${b.book.google_id}?fife=w400-h600&source=gbs_api`}
                            setSelectedId={setSelectedId}
                            goal={b.goal}
                            z_index={shelf.length - i}
                        />
                    ))}
                </div>
            </LayoutGroup>
            {/*Animate modal-to-card when user clicks the 'close' button or outside of the modal's active area*/}
            {currBook && (
                <div className='h-screen w-screen bg-black bg-opacity-40 fixed top-0 left-0 flex items-center z-40'
                    onClick={handleParentClick}
                >
                    <AnimatePresence>
                        {/*The Animate Presence only works with direct children*/}
                        <LibraryBookModal
                            _id={currBook.book._id}
                            title={currBook.book.title}
                            pageCount={currBook.pageCount}
                            progress={currBook.progress}
                            cover={`https://books.google.com/books/publisher/content/images/frontcover/${currBook.book.google_id}?fife=w400-h600&source=gbs_api`}
                            goal={currBook.goal}
                            handleButtonClick={handleButtonClick}
                            selectedId={selectedId}
                            setSelectedId={setSelectedId}
                            handleDelete={handleDelete}
                            handleSaveChanges={handleSaveChanges}
                            handleUpdatePageCount={handleUpdatePageCount}
                        />
                    </AnimatePresence>
                </div>
            )}

        </main >
    </>
    )

}

/* <LibraryBook
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
                    /> */