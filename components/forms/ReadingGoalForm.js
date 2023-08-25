import { useState } from 'react'
import Image from 'next/image'
import Checkmark from '../../public/seal_checked.svg'
import WarningTriangle from '../../public/exc_triangle.svg'

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { parseISO } from 'date-fns';

export default function ReadingGoalForm({ _id, pageCount, handleSaveChanges, progress, goal,
    title, goalAchievedAt, lastUpdated, goalStatus, dateOfCompletion }) {

    // const { pageCount, handleSaveChanges, progress, goal, title, goalAchievedAt, lastUpdated, goalStatus, dateOfCompletion } = props
    // const [goalReached, setGoalReached] = useState(false);

    const [formData, setFormData] = useState({
        pageCount: pageCount,
        dateOfCompletion: parseISO(dateOfCompletion),
        bookProgress: progress,
        title: title
    })

    const [initialBookProgress, setBookProgress] = useState(progress)
    // useEffect(() => {
    //     setBookProgress(progress);
    // }, [progress]);


    console.log(['current progress is', formData.bookProgress], ['old progress is', initialBookProgress])

    const [saveChanges, toggleSaveChanges] = useState(false)

    const daysLeft = dateOfCompletion ? Math.ceil((new Date(dateOfCompletion) - new Date()) / (1000 * 60 * 60 * 24)) : 0
    let dailyGoal = formData.bookProgress >= 0 ? Math.ceil((pageCount - formData.bookProgress) / daysLeft) : 0

    // console.log(['days remaining:', daysLeft], ['goal', dailyGoal])
    // console.log(dailyGoal)
    let currPercent = Math.ceil((formData.bookProgress / pageCount) * 100)

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
        <div className=' tooltip tooltip-bottom tooltip-accent' data-tip={dailyGoal !== Infinity && dailyGoal > 0 ? `Click this when you've read ${dailyGoal} pages today!` : `Click this when you've met your goal!`}>
            <button
                onClick={handleClick}
                name="dailyGoal"
                type="button"

                className={`btn btn-sm btn-accent  ml-2 ${daysLeft <= 0 || formData.bookProgress >= pageCount ? " btn-disabled" : ""}`}

            >Goal Achieved!</button>
        </div>
    )

    const daysGoal = daysLeft > 0 && dailyGoal > 0 ? <p className="mr-2 ">{dailyGoal} pages for {daysLeft} days.</p> :
        progress === pageCount ? "Finished!" : 'No goal set.'


    return (
        <div className='px-5 py-5 flex flex-col h-full'>
            <div className='h-1/2  border-b-2 border-slate-300'>
                <div className=''>
                    <div className='flex items-center'>
                        <h3 className="lg:text-2xl text-lg card-title pt-2 inline-block text-ellipsis truncate whitespace-nowrap w-10/12">{title}
                        </h3>
                        {goalStatus === "goalAchieved" && <Image src={Checkmark} className='' alt="Checkmark: Task Completed" />}
                        {goalStatus === "goalBehind" && <Image className='w-1/12' src={WarningTriangle} alt='Warning: Behind goal' />}
                    </div>
                    <div className='flex align-center mt-1'>
                        <progress className="progress progress-info w-3/4 my-auto mr-2" value={currPercent} min="0" max="100">
                        </progress>
                        <p>{currPercent}% {currPercent === 100 && <span>&#127881;</span>}</p>
                    </div>
                </div>
                <div className='flex justify-start mt-5 md:text-lg text-xs px-0'>
                    <div className='w-1/2'>{daysLeft > 0 ? daysGoal : <p className='text-gray-600 mr-2 '>No goal set.</p>}</div>

                    <div className='w-1/2'>{goalButton}</div>
                </div>
            </div>

            <form className='text-left relative h-1/2 mt-5' >

                <div className='flex mt-4 justify-start md:text-lg text-xs'>
                    <label className='w-1/2' htmlFor="">I&#8217;m on page...</label>
                    <input
                        type='number'
                        max={pageCount}
                        min='0'
                        onChange={(e) => {
                            toggleSaveChanges(true)
                            handleChange(e)
                        }
                        }
                        name='bookProgress'
                        value={formData.bookProgress}
                        className='border-black border-2 rounded-md mx-2 px-2 w-20'
                    />
                    <span> / {pageCount} </span>
                </div>

                <div className='flex mt-4 justify-start md:text-lg text-xs'>
                    <label className='w-1/2 ' htmlFor="finish date selection">
                        I&#8217;d like to finish by...
                    </label>
                    <DatePicker
                        selected={formData.dateOfCompletion}
                        onChange={(date) => {
                            toggleSaveChanges(true)
                            handleDateChange(date)
                        }}
                        className='border-black border-2 rounded-md mx-2 px-2 w-32'
                        minDate={new Date()} // Set the minimum date to the current date
                    />
                </div>



                <div className='flex items-center justify-start mt-4'>
                    <div className='w-1/2'></div>
                    <button
                        type='submit'
                        onClick={(e) => {
                            let now = Date.now()
                            let goalStatus;

                            //if the user manually reduces page count, the goalStatus should reset to white
                            if (formData.bookProgress < initialBookProgress || dailyGoal === -Infinity) {
                                //if we're going backwards in the book, reset the goalStatus
                                console.log('condition1')
                                goalStatus = null
                            } else if (formData.bookProgress - initialBookProgress > dailyGoal) {
                                goalStatus = now
                                console.log('condition2', dailyGoal, formData.bookProgress, initialBookProgress)
                            } else {
                                goalStatus = null
                                console.log('condition3')
                            }

                            toggleSaveChanges(!saveChanges)
                            e.preventDefault()
                            handleSaveChanges({
                                ...formData,
                                lastUpdated: now,
                                goalAchievedAt: goalStatus,
                                _id: _id,
                            })
                        }}
                        className={`btn btn-sm w-40 mr-2 mx-2 btn-primary 
                    ${saveChanges && 'wiggle-alert'}
                    ${!saveChanges && 'btn-disabled'}
                    
                    `}>
                        Update Info</button>
                </div>
            </form >

        </div>
    )
}


