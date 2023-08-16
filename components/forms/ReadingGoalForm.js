import { useState } from 'react'

export default function ReadingGoalForm(props) {

    const { handleSaveChanges, progress, goal, title, goalAchievedAt, lastUpdated } = props
    // const [goalReached, setGoalReached] = useState(false);

    const [formData, setFormData] = useState({
        daysGoal: goal,
        bookProgress: progress,
        title: title
    })

    const [saveChanges, toggleSaveChanges] = useState(false)

    let dailyGoal = Math.ceil((props.pageCount - formData.bookProgress) / formData.daysGoal)
    // console.log(dailyGoal)
    let currPercent = Math.floor((formData.bookProgress / props.pageCount) * 100)

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

    //this function updates the form if the user has met their day goal
    function handleClick(e) {
        let now = Date.now()
        e.preventDefault()
        // toggleSaveChanges(p => p = true)
        if (e.target.name === "dailyGoal") {
            // console.log("goal is " + dailyGoal)
            let newProgress = Number(formData.bookProgress) + Number(dailyGoal)
            // let newDaysGoal = Number(formData.daysGoal) - 1
            if (newProgress > props.pageCount) newProgress = props.pageCount;
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
                _id: props._id
            })
        }
    }

    const goalButton = (
        <div className=' tooltip tooltip-bottom tooltip-accent' data-tip={dailyGoal !== Infinity ? `Click this when you've read ${dailyGoal} pages today!` : `Click this when you've met your goal!`}>
            <button
                onClick={handleClick}
                name="dailyGoal"
                type="button"

                className={`btn btn-sm btn-accent  ml-2 ${formData.daysGoal <= 0 || formData.bookProgress >= props.pageCount ? " btn-disabled" : ""}`}

            >Goal Achieved!</button>
        </div>
    )

    const daysGoal = (<p className="mr-2 ">{dailyGoal} pages a day</p>)
    return (
        <div className='px-5 py-5 flex flex-col h-full'>
            <div className='h-1/2  border-b-2 border-slate-300'>
                <div className=''>
                    <h3 className="lg:text-2xl text-lg card-title pt-2 truncate">{title} {lastUpdated && `last updated on ${lastUpdated}`}</h3>
                    <div className='flex align-center mt-1'>
                        <progress className="progress progress-info w-3/4 my-auto mr-2" value={currPercent} min="0" max="100">
                        </progress>
                        <p>{currPercent}% {currPercent === 100 && <span>&#127881;</span>}</p>
                    </div>
                </div>
                <div className='flex justify-start mt-5 md:text-lg text-xs px-0'>
                    <div className='w-1/2'>{formData.daysGoal > 0 ? daysGoal : <p className='text-gray-600 mr-2 '>No goal set.</p>}</div>

                    <div className='w-1/2'>{goalButton}</div>
                </div>
            </div>

            <form className='text-left relative h-1/2 mt-5' >

                <div className='flex mt-4 justify-start md:text-lg text-xs'>
                    <label className='w-1/2' htmlFor="">Current Page:</label>
                    <input
                        type='number'
                        max={props.pageCount}
                        min='0'
                        onChange={handleChange}
                        onKeyDown={() => toggleSaveChanges(true)}
                        name='bookProgress'
                        value={formData.bookProgress}
                        className='border-black border-2 rounded-md mx-2 px-2 w-20'
                    />
                    <span> / {props.pageCount} p.</span>
                </div>

                <div className='flex mt-4 justify-start md:text-lg text-xs'>
                    <label className='w-1/2' htmlFor="">Days to finish:</label>
                    <input
                        type='number'
                        onChange={handleChange}
                        onKeyDown={() => toggleSaveChanges(true)}
                        name='daysGoal'
                        min='0'
                        value={formData.daysGoal}
                        className='border-black border-2 rounded-md mx-2 px-2 w-20'
                    />
                </div>



                <div className='flex items-center justify-start mt-4'>
                    <div className='w-1/2'></div>
                    <button
                        type='submit'
                        onClick={(e) => {
                            let now = Date.now()
                            toggleSaveChanges(!saveChanges)
                            e.preventDefault()
                            handleSaveChanges({
                                ...formData,
                                lastUpdated: now,
                                goalAchievedAt: goalAchievedAt,
                                _id: props._id
                            })
                        }}
                        className={`btn btn-sm w-40 mr-2 mx-2 btn-primary 
                    ${saveChanges && 'wiggle-alert'}
                    ${!saveChanges && 'btn-disabled'}
                    
                    `}>
                        Update Progress</button>
                </div>
            </form >

        </div>
    )
}


