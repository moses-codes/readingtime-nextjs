import Image from 'next/image'
import Checkmark from '../../public/seal_checked.svg'
import Unchecked from '../../public/seal_empty.svg'
import WarningTriangle from '../../public/exc_triangle.svg'
import { motion } from "framer-motion"

import { useState } from 'react'

import { timeChecker } from '@/utils/timeChecker'


export default function LibraryBook({
    _id, title, cover, pageCount, progress,
    dateOfCompletion,
    // goal,
    setSelectedId, z_index, selectedId,
    goalAchievedAt, lastUpdated,
    handleSaveChanges, isDateGoal, paceGoal,
    isAudio
}) {

    const now = new Date().getTime()

    let goalAchieved, goalBehind

    // console.log(goalAchieved, goalBehind)

    const [isHover, toggleHover] = useState(false)

    // console.log(title, isDateGoal, progress, pageCount, Date.parse(dateOfCompletion), lastUpdated)

    // console.log(Date.parse(dateOfCompletion) < now)

    if (pageCount === 0) pageCount = 1;

    let currPercent = Math.floor((progress / pageCount) * 100)

    //format currPercent 
    if (currPercent >= 100) {
        currPercent = 100
    } else if (currPercent <= 0) {
        currPercent = 0
    }


    // let dailyGoal = goalAchieved ? 'Goal achieved!' : Math.ceil(pageCount / goal) !== Infinity ? `${Math.ceil((pageCount - progress) / goal)} pages / day` : "No goal yet"
    const daysLeft = dateOfCompletion ? Math.ceil((new Date(dateOfCompletion) - new Date()) / (1000 * 60 * 60 * 24)) : 0
    let dailyGoalNum = Math.ceil(pageCount / daysLeft) !== Infinity && Math.ceil(pageCount / daysLeft) !== -Infinity ?
        Math.ceil((pageCount - progress) / daysLeft) : 0

    let dailyGoal;

    if (isDateGoal) {
        goalAchieved = timeChecker(new Date(goalAchievedAt).getTime(), now, 'days');
        goalBehind = timeChecker(new Date(lastUpdated).getTime(), now, 'hours');
        if (goalAchieved) {
            if (progress === pageCount) {
                dailyGoal = 'Finished!';
            } else {
                dailyGoal = 'Goal achieved!';
            }
        } else {
            if (progress === pageCount) {
                dailyGoal = 'Finished!';
            } else if (Math.ceil(pageCount / daysLeft) !== Infinity && Math.ceil(pageCount / daysLeft) !== -Infinity) {
                dailyGoal = `${Math.ceil((pageCount - progress) / daysLeft)} pages / day`;
            } else {
                dailyGoal = 'No goal set.';
            }
        }
    } else {

        // console.log(title, goalAchievedAt)

        goalAchieved = timeChecker(new Date(goalAchievedAt).getTime(), now, 'days');

        if (goalAchieved) {
            dailyGoal = "Goal achieved!"
        } else if (progress === pageCount) {
            dailyGoal = 'Finished!'
        } else if (paceGoal > 0) {
            dailyGoal = paceGoal;
        } else {
            dailyGoal = 'No goal set.';
        }
    }

    //unique prompt for if the reader's goal date has passed.

    //if the user has completed the book, goalAchieved is always true. 
    if (Date.parse(dateOfCompletion) < now) {
        if (pageCount === progress) {
            goalAchieved = true
            goalBehind = false

            //Otherwise, the goal date will have been expired.
        } else if (!lastUpdated) {
            goalAchieved = false;
            goalBehind = false;
            dailyGoal = "Set a reading goal!"
        } else {
            goalBehind = true
            goalAchieved = false
            dailyGoal = "Set a new target!"
        }
    }

    let message

    if (dailyGoal > 1) {
        message = `${dailyGoal} pages / day`
    } else if (dailyGoal === 1) {
        message = "One page per day"
    } else {
        message = dailyGoal
    }

    return (
        <motion.div

            onMouseEnter={() => {
                toggleHover(true)
            }}
            onMouseLeave={() => {
                toggleHover(false)
            }}
            style={{
                zIndex: z_index,
            }}
            layout
            key={_id}
            className={`card max-h-96 w-60 bg-slate-100
            shadow-xl mx-5 mt-5 mb-20 z-0 hover:cursor-pointer
            ${selectedId.currentId === _id && 'invisible'}
            `}
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
            <motion.div
                className='min-h-full'
            >
                {isHover && <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }} className="absolute right-2 top-2 
                radial-progress bg-slate-200 text-primary border-4 border-slate-200 text-xs" style={{ "--value": `${currPercent}`, "--size": "2.55rem", "--thickness": "2px" }}>{currPercent}%</motion.div>}

                <Image
                    src={cover}
                    height={400}
                    width={400}
                    priority
                    alt={`cover for ${title}`}
                    className='w-full h-full rounded-t-xl'
                />

            </motion.div>

            <motion.div
                className={`relative bottom-0
                ${goalAchieved && 'bg-emerald-300'} 
                ${goalBehind && 'bg-red-200'}
                ${!goalBehind && !goalAchieved && 'bg-white'}
                 text-black w-full rounded-b-xl px-2 py-2`}
            >
                <div className='flex items-center overflow-hidden'>
                    <motion.span className='inline-block italic font-bold w-10/12 overflow-ellipsis truncate whitespace-nowrap'
                    >

                        {title}</motion.span>
                    <motion.span className='flex justify-end w-3/12'
                    >
                        {goalBehind && <Image
                            className='	'
                            src={WarningTriangle} alt='Warning: Falling behind goal' />}
                        {

                            goalAchieved ?
                                <Image src={Checkmark} alt="Checkmark: Reading goal met"
                                />
                                :
                                <Image src={Unchecked} alt="Pending: Click here if you've met your goal"
                                    className='transition-all hover:scale-125 hover:cursor-pointer	'
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        let now = Date.now()
                                        if (dailyGoal === "No goal yet") {
                                            e.stopPropagation()
                                        } else {
                                            if (isDateGoal) {
                                                handleSaveChanges({
                                                    bookProgress: progress + dailyGoalNum,
                                                    lastUpdated: now,
                                                    goalAchievedAt: now,
                                                    dateOfCompletion: dateOfCompletion,
                                                    _id: _id,
                                                    title: title,
                                                })
                                            } else {
                                                handleSaveChanges({
                                                    bookProgress: progress + paceGoal,
                                                    lastUpdated: now,
                                                    goalAchievedAt: now,
                                                    dateOfCompletion: dateOfCompletion,
                                                    _id: _id,
                                                    title: title,
                                                })
                                            }
                                        }
                                    }}
                                />
                        }
                    </motion.span>
                </div>
                <motion.h5
                    className='font-light'
                >{message} {currPercent === 100 && <span>&#127881;</span>}</motion.h5>
            </motion.div>
        </motion.div >
    )
}
