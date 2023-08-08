import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import ReadingGoalForm from './forms/ReadingGoalForm'

export default function LibraryBook({ _id,
    title, cover, pageCount, progress, goal,
    handleDelete, handleSaveChanges, handleUpdatePageCount }) {

    //change the page count from coming from the book schema to the booksreading array in the user schema

    const [changePageCount, toggleChangePageCount] = useState(false)

    const [showBook, toggleShowBook] = useState(false)

    function handleClick(e) {
        toggleShowBook(!showBook)
    }

    return (
        <div
            layout
            initial={{ opacity: 0, y: 20, scale: 0.9 }} // Initial animation state
            animate={{ opacity: 1, y: 0, scale: 1 }} // Animation when component is shown
            exit={{ opacity: 0, y: -20, scale: 0.9 }} // Animation when component is removed from the DOM
            transition={{ duration: 0.4, type: 'spring' }} // Duration of the animation

        >
            {/* fix motion div to make the book expand and contract smoothly*/}
            <div
                key={_id} className="card sm:card-side bg-base-100 shadow-xl rounded-md my-5 flex lg:mx-10 w-full min-w-min relative pt-5 pb-5 px-5 border-2 border-gray-400 active-book transition-all"
                onClick={handleClick}
            >

                <div layout='position' className='flex items-center'>
                    <figure className='h-max max-h-52 min-w-1/4 mx-auto'><img className='rounded-md' src={cover} alt={"The book cover for " + title} /></figure>
                </div>

                {showBook &&
                    <div
                        initial={{ opacity: 0, x: -20, scale: 0.9 }} // Initial animation state
                        animate={{ opacity: 1, x: 0, scale: 1 }} // Animation when component is shown
                        layout='position'
                        className='max-w-4xl md:text-left md:w-3/4 w-full md:ml-5 ml-3'
                    >
                        <div className="dropdown dropdown-bottom dropdown-left absolute right-0 top-0 bg-base-100 rounded-xl">
                            <label tabIndex={0} className="btn btn-error btn-xs font-extrabold text-white m-1 hover:bg-red-300 ">. . . <span className='sr-only'>Click here for more options</span></label>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-lg rounded-box w-52  bg-slate-100 border-2 border-slate-400">
                                <li>
                                    <ChangePageCount
                                        _id={_id}
                                        pageCount={pageCount}
                                        toggleForm={toggleChangePageCount}
                                        displayForm={changePageCount}
                                        handleUpdatePageCount={handleUpdatePageCount}
                                        title={title}
                                    />
                                </li>
                                <li className=' bg-red-100'>
                                    <a onClick={() => handleDelete({
                                        _id: _id,
                                        title: title
                                    })}>
                                        <span>Remove this book </span>
                                    </a>
                                </li>

                            </ul>
                        </div>
                        {/* <h3 className="lg:text-2xl text-lg card-title pt-2 truncate">{title}</h3> */}

                        <ReadingGoalForm
                            title={title}
                            pageCount={pageCount}
                            _id={_id}
                            progress={progress}
                            goal={goal}
                            handleSaveChanges={handleSaveChanges}
                            showBook={showBook}
                        />
                    </div>
                }
            </div >
        </div>
    )
}

export function ChangePageCount({ displayForm, pageCount, toggleForm, handleUpdatePageCount, _id, title }) {

    const [pageCountValue, setPageCountValue] = useState(pageCount)

    function handlePageCountChange(e) {
        console.log(e.target.value)
        setPageCountValue(e.target.value)
    }

    if (!displayForm) {
        return (
            <div onClick={() => toggleForm(p => true)}>
                Change page count
            </div>
        )
    }

    return (
        <div>
            <input onChange={handlePageCountChange} type="text" value={pageCountValue} className="input input-bordered input-sm w-1/2 max-w-xs" />
            <button
                onClick={() => {
                    toggleForm(p => false)
                    handleUpdatePageCount({
                        pageCount: pageCountValue,
                        _id: _id,
                        title: title,
                        alertInfo: "Page count"
                    })
                }}
                className="btn btn-outline btn-secondary btn-sm">save</button>
        </div>
    )
}