import { useState, useEffect } from 'react'
// import Image from 'next/image'
import { motion, AnimatePresence } from "framer-motion"
import ReadingGoalForm from '../forms/ReadingGoalForm'

export default function LibraryBook({
    _id, title, cover, pageCount, progress, goal,
    setSelectedId, z_index
    //  handleDelete, handleSaveChanges, handleUpdatePageCount 
}) {

    //change the page count from coming from the book schema to the booksreading array in the user schema

    function handleClick(e) {
        toggleShowBook(!showBook)
    }

    console.log(title, z_index)

    let dailyGoal = Math.ceil(pageCount / goal) !== Infinity ? `${Math.ceil(pageCount / goal)} pages per day` : "No goal yet"

    return (
        <motion.div
            style={{
                zIndex: z_index,
            }}
            layout
            key='_id'
            className={`card w-60 min-h-min bg-slate-700 
            shadow-xl mx-2 mt-2 z-0`}
            layoutId={_id}
            onClick={() => {
                setSelectedId(p => {
                    return {
                        currentId: _id,
                        lastSelectedId: _id,
                    }
                })
            }}
            whileHover={{
                scale: 1.05,
                transition: { duration: .2 },
            }}

            exit={{ opacity: 0 }}
        >
            <motion.img src={cover}
                layout
                className='w-full h-full rounded-t-xl'
            />
            <motion.div
                className='relative bottom-0 bg-base-100 text-black w-full rounded-b-xl px-2 py-2'
            >
                <motion.h3
                    className='italic font-bold'
                >{title}</motion.h3>
                <motion.h5
                    className='font-light'
                >{dailyGoal}</motion.h5>
            </motion.div>
        </motion.div>
    )
}
