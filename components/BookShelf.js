import { useState, useEffect } from 'react'
import ReadingGoalForm from './forms/ReadingGoalForm'
import LibraryBook from "./Library/LibraryBookTEST"
import LibraryBookModal from './Library/LibraryBookTESTModal'
import Dashboard from './Dashboard'

import { timeChecker } from '@/utils/timeChecker'

import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'

export default function BookShelf({ shelf, handleDelete, handleSaveChanges, handleUpdatePageCount, totalPages }) {


    const [selectedId, setSelectedId] = useState({
        currentId: null,
        lastSelectedId: null,
    })

    const [sortBy, setSortBy] = useState(null)

    // <option>A-Z</option>
    //                 <option>Progress</option>
    //                 <option>Goal not met</option>

    if (sortBy) {

        if (sortBy === "alpha") {
            shelf = [...shelf].sort((a, b) => a.book.title.localeCompare(b.book.title))
        } else if (sortBy === "date-added") {
            shelf = shelf
        } else if (sortBy === "progress") {
            shelf = [...shelf].sort((a, b) => (a.progress / a.pageCount) - (b.progress / b.pageCount))
        } else if (sortBy === "goal-status") {
            let now = new Date()
            function checkGoal(n) {
                // console.log(n.book.title, timeChecker(new Date(n.goalAchievedAt), now, "days"))
                //return if timeChecker is true (goal completed w/in 12 hrs) OR if the user has completed the book. 
                return timeChecker(new Date(n.goalAchievedAt), now, "days") || n.progress === n.pageCount
            }
            shelf = [...shelf].sort((a, b) => {
                // console.log(checkGoal(a), checkGoal(b))
                return checkGoal(a) - checkGoal(b)
            })
            // console.log(shelf)
        }
    }


    function findObjectById(array, idToFind) {
        return array.find(obj => obj.book._id === idToFind);
    }

    let currBook

    if (selectedId.currentId) {
        let item = findObjectById(shelf, selectedId.currentId)
        currBook = item
    } else {
        currBook = null
    }


    const handleParentClick = () => {
        // Do something when the parent div is clicked
        // console.log('parent clicked')
        setSelectedId(p => {
            return {
                ...p,
                currentId: null,
            }
        })
    };

    const handleButtonClick = (e) => {
        // Do something when the button inside the child div is clicked

        // e.stopPropagation(); // Stop event propagation to the parent div
        // console.log('parent clicked')
        setSelectedId(p => {
            return {
                ...p,
                currentId: null,
            }
        })
    };




    return (<>
        <motion.main
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.3,
                delay: 0.2,
                ease: [0, 0.71, 0.2, 1.01]
            }}
            className='flex mx-auto relative  '>

            <LayoutGroup>
                <motion.div
                    className='z-0 flex flex-wrap xl:justify-start justify-center'

                >
                    <Dashboard
                        totalPages={totalPages}
                        shelf={shelf}
                        setSortBy={setSortBy}
                    />
                    <AnimatePresence >
                        {shelf &&
                            shelf.map(b => {
                                // if (selectedId.currentId !== b.book._id) {
                                return (<LibraryBook
                                    key={b.book._id}
                                    _id={b.book._id}
                                    title={b.book.title}
                                    pageCount={b.pageCount}
                                    cover={`https://books.google.com/books/publisher/content/images/frontcover/${b.book.google_id}?fife=w400-h600&source=gbs_api`}
                                    setSelectedId={setSelectedId}
                                    selectedId={selectedId}
                                    // goal={b.goal}
                                    z_index={selectedId.lastSelectedId === b.book._id ? 1 : -1}
                                    progress={b.progress}
                                    goalAchievedAt={b.goalAchievedAt}
                                    lastUpdated={b.lastUpdated}
                                    dateOfCompletion={b.dateOfCompletion}
                                    handleSaveChanges={handleSaveChanges}
                                    isDateGoal={b.isDateGoal}
                                    paceGoal={b.paceGoal}
                                />)
                            })
                        }
                    </AnimatePresence>
                </motion.div>
            </LayoutGroup>

            {/*Animate modal-to-card when user clicks the 'close' button or outside of the modal's active area*/}
            {currBook && (
                <div className='h-screen w-screen bg-black bg-opacity-40 fixed top-0 left-0 flex items-center z-40'
                    onClick={handleParentClick}
                >
                    {/*The Animate Presence only works with direct children*/}
                    <AnimatePresence key={currBook.book._id}>
                        <LibraryBookModal
                            _id={currBook.book._id}
                            title={currBook.book.title}
                            pageCount={currBook.pageCount}
                            progress={currBook.progress}
                            // cover={`https://books.google.com/books/publisher/content/images/frontcover/${currBook.book.google_id}?fife=w400-h600&source=gbs_api`}
                            // goal={currBook.goal}
                            handleButtonClick={handleButtonClick}
                            selectedId={selectedId.currentId}
                            setSelectedId={setSelectedId}
                            handleDelete={handleDelete}
                            handleSaveChanges={handleSaveChanges}
                            handleUpdatePageCount={handleUpdatePageCount}
                            goalAchievedAt={currBook.goalAchievedAt}
                            lastUpdated={currBook.lastUpdated}
                            dateOfCompletion={currBook.dateOfCompletion}
                            isDateGoal={currBook.isDateGoal}
                            paceGoal={currBook.paceGoal}
                        />
                    </AnimatePresence>
                </div>
            )}

        </motion.main >
    </>
    )

}