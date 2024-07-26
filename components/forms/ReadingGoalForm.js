import { useState } from 'react'
import Image from 'next/image'
import Checkmark from '../../public/seal_checked.svg'
import WarningTriangle from '../../public/exc_triangle.svg'

import DateByForm from './DateByForm'
import PaceForm from './PaceForm'

// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
import { parseISO } from 'date-fns';
import { AnimatePresence } from 'framer-motion'

export default function ReadingGoalForm({ _id,
    pageCount,
    handleSaveChanges,
    progress,
    title,
    goalAchievedAt,
    lastUpdated,
    goalStatus,
    dateOfCompletion,
    isDateGoal,
    paceGoal = 1 }) {

    // console.log(title, paceGoal)

    // const { pageCount, handleSaveChanges, progress, goal, title, goalAchievedAt, lastUpdated, goalStatus, dateOfCompletion } = props
    // const [goalReached, setGoalReached] = useState(false);

    const [formData, setFormData] = useState({
        pageCount: pageCount,
        dateOfCompletion: parseISO(dateOfCompletion),
        bookProgress: progress,
        title: title,
        paceGoal: paceGoal,
    })

    const [initialBookProgress, setBookProgress] = useState(progress)
    const [isDateForm, toggleDateForm] = useState(isDateGoal)

    const [saveChanges, toggleSaveChanges] = useState(false)



    const daysLeft = dateOfCompletion ? Math.ceil((new Date(dateOfCompletion) - new Date()) / (1000 * 60 * 60 * 24)) : 0
    const now = new Date();
    const daysLeftAtPace = Math.floor((pageCount - progress) / paceGoal)
    const projectedDateOfCompletion = new Date(now);
    projectedDateOfCompletion.setDate(now.getDate() + daysLeftAtPace)

    let dailyGoal = (isDateForm ?
        formData.bookProgress >= 0 ? Math.ceil((pageCount - formData.bookProgress) / daysLeft) : 0
        : paceGoal
    )

    let currPercent = Math.floor((formData.bookProgress / pageCount) * 100)

    //format currPercent 
    if (currPercent >= 100) {
        currPercent = 100
    } else if (currPercent <= 0) {
        currPercent = 0
    }


    function handleChange(e) {
        // toggleSaveChanges(p => p = true)
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleDateChange = (date) => {
        let newDate = parseISO(date)
        console.log('the new date is', date)
        setFormData((prevData) => ({
            ...prevData,
            dateOfCompletion: date,
        }));
    };

    //this function updates the form if the user has met their day goal
    function handleClick(e) {
        let now = Date.now()
        e.preventDefault()
        // toggleSaveChanges(p => p = true)
        if (e.target.name === "dailyGoal") {
            // console.log("goal is " + dailyGoal)
            let newProgress = Number(formData.bookProgress) + Number(dailyGoal)
            // let newDaysGoal = Number(formData.daysGoal) - 1
            if (newProgress > pageCount) newProgress = pageCount;
            setFormData(prevData => {
                return {
                    ...prevData,
                    bookProgress: newProgress
                }
            })
            // toggleSaveChanges(!saveChanges)
            e.preventDefault()
            handleSaveChanges({
                ...formData,
                bookProgress: newProgress,
                lastUpdated: now,
                goalAchievedAt: now,
                _id: _id
            })
        }
    }

    const goalButton = (
        <div className=' tooltip tooltip-bottom tooltip-accent' data-tip={dailyGoal !== Infinity && dailyGoal > 0 ? `Click this when you've read ${dailyGoal} ${dailyGoal === 1 ? 'page' : 'pages'} today!` : `Click this when you've met your goal!`}>
            <button
                onClick={handleClick}
                name="dailyGoal"
                type="button"

                className={`btn btn-sm btn-accent  ml-2 ${daysLeft <= 0 || formData.bookProgress >= pageCount ? " btn-disabled" : ""}`}

            >Goal Achieved!</button>
        </div>
    )

    let daysGoal

    if (daysLeft > 0 && dailyGoal > 0) {
        if (isDateForm) {
            daysGoal = (
                <>
                    <p className="mr-2 md:text-sm text-xs">
                        <span className='font-bold'>{dailyGoal} pages </span> a day,
                    </p>
                    <p className="mr-2 md:text-xs text-2xs">
                        Finish on <span className='font-bold'>{new Date(dateOfCompletion).toDateString()}. </span>
                    </p>
                    {/* <span className='font-extra light'>{daysLeft} more {daysLeft > 1 ? 'days' : 'day'}</span>! */}
                </>
            );
        } else {
            daysGoal = (
                <>
                    <p className="mr-2 md:text-sm text-xs">
                        <span className='font-bold'>{paceGoal} {paceGoal === 1 ? 'page' : 'pages'} </span> daily. Will finish on <span className='font-bold'>{new Date(projectedDateOfCompletion).toDateString()}. </span>
                    </p>
                </>
            );
        }
    } else if (paceGoal > 0 && !isDateForm) {
        daysGoal = (
            <>
                <p className="mr-2 md:text-sm text-xs">
                    <span className='font-bold'>{paceGoal} pages </span> daily, will finish on <span className='font-bold'>{new Date(projectedDateOfCompletion).toDateString()}. </span>
                </p>
            </>
        );
    } else if (progress === pageCount) {
        daysGoal = "Finished!";
    } else {
        daysGoal = 'No goal set.';
    }


    return (
        <div className='px-5 py-5 flex flex-col h-full'>
            <div className='min-h-min pb-5  border-b-2 border-slate-300'>
                <div className=''>
                    <div className='flex items-center'>
                        <h3 className="lg:text-2xl text-lg card-title mt-4 mb-2 inline-block text-ellipsis truncate whitespace-nowrap w-10/12">{title}
                        </h3>
                        {goalStatus === "goalAchieved" && <Image src={Checkmark} className='' alt="Checkmark: Task Completed" />}
                        {goalStatus === "goalBehind" && <Image className='w-1/12' src={WarningTriangle} alt='Warning: Behind goal' />}
                    </div>
                    <div className='flex align-center mb-2'>
                        <progress className="progress progress-info w-3/4 my-auto mr-2" value={currPercent} min="0" max="100">
                        </progress>
                        <p>{currPercent}% {currPercent === 100 && <span>&#127881;</span>}</p>
                    </div>
                </div>
                <div className='flex justify-start my-4 md:text-lg text-xs px-0 items-center'>
                    <div className='w-1/2'>
                        {daysGoal}
                    </div>

                    <div className='w-1/2'>{goalButton}</div>
                </div>
            </div>

            <div className='flex items-center mt-5'>
                <input
                    onChange={() => {
                        toggleSaveChanges(!saveChanges)
                        toggleDateForm(!isDateForm)
                    }
                    }
                    type="checkbox" className="toggle toggle-sm mr-2"
                    checked={isDateForm} unchecked={!isDateForm}
                />
                <span className='md:text-md text-sm'>{isDateForm ? 'I want to finish by a certain date.' : 'I want to set my own pace.'}</span>
            </div>
            <AnimatePresence initial={false}>
                {
                    isDateForm ?
                        <DateByForm
                            pageCount={pageCount}
                            formData={formData}
                            initialBookProgress={initialBookProgress}
                            dailyGoal={dailyGoal}
                            toggleSaveChanges={toggleSaveChanges}
                            handleChange={handleChange}
                            handleSaveChanges={handleSaveChanges}
                            handleDateChange={handleDateChange}
                            // goal={goal}
                            goalAchievedAt={goalAchievedAt}
                            lastUpdated={lastUpdated}
                            saveChanges={saveChanges}
                            _id={_id}
                        />
                        :
                        <PaceForm
                            pageCount={pageCount}
                            formData={formData}
                            initialBookProgress={initialBookProgress}
                            dailyGoal={dailyGoal}
                            toggleSaveChanges={toggleSaveChanges}
                            handleChange={handleChange}
                            handleSaveChanges={handleSaveChanges}
                            handleDateChange={handleDateChange}
                            // goal={goal}
                            goalAchievedAt={goalAchievedAt}
                            lastUpdated={lastUpdated}
                            saveChanges={saveChanges}
                            _id={_id}
                            paceGoal={formData.paceGoal}
                        />
                }
            </AnimatePresence>
        </div>
    )
}