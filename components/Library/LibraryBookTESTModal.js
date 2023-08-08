import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import ReadingGoalForm from '../forms/ReadingGoalForm'

export default function LibraryBook({ _id,
    title, cover, pageCount, progress, goal,
    handleDelete, handleSaveChanges, handleUpdatePageCount, selectedId, setSelectedId }) {

    //change the page count from coming from the book schema to the booksreading array in the user schema

    const [changePageCount, toggleChangePageCount] = useState(false)

    const [showBook, toggleShowBook] = useState(false)

    // function handleClick(e) {
    //     toggleShowBook(!showBook)

    // }

    return (
        <AnimatePresence>
            <motion.div
                layout
                className='card w-full md:w-96 h-96 bg-base-100 absolute inset-x-0 mx-auto z-50'
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
                onClick={(e) => e.stopPropagation()}
                layoutId={selectedId}
            >
                {/* fix motion div to make the book expand and contract smoothly*/}
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
                            <a onClick={() => {
                                handleDelete({
                                    _id: _id,
                                    title: title
                                })
                                setSelectedId(null)
                            }
                            }>
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
            </motion.div >
        </AnimatePresence>
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
            <motion.div onClick={() => toggleForm(p => true)}>
                Change page count
            </motion.div>
        )
    }

    return (
        <motion.div>
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
        </motion.div>
    )
}

// motion.div
//                             layout
//                             className='card w-full md:w-96 h-96 bg-base-100 absolute inset-x-0 mx-auto z-50'
//                             initial={{ opacity: 1 }}
//                             animate={{ opacity: 1 }}
//                             exit={{ opacity: 0 }}
//                             onClick={(e) => e.stopPropagation()}
//                             layoutId={selectedId}>
//                             <motion.h5 layout>{title}</motion.h5>
//                             <motion.h2>{_id}</motion.h2>
//                             <motion.button className='btn' onClick={() => {
//                                 // setSelectedId(null)
//                                 handleButtonClick()
//                             }
//                             } >Button</motion.button>
//                         </motion.div>