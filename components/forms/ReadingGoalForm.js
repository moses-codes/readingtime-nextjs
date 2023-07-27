import { useState } from 'react'

export default function ReadingGoalForm(props) {
    const { handleSaveChanges, progress, goal } = props
    // const [goalReached, setGoalReached] = useState(false);

    const [formData, setFormData] = useState({
        daysGoal: goal,
        bookProgress: progress,
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
        toggleSaveChanges(p => p = true)
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    //this function updates the form if the user has met their day goal
    function handleClick(e) {
        e.preventDefault()
        toggleSaveChanges(p => p = true)
        if (e.target.name === "dailyGoal") {
            // console.log("goal is " + dailyGoal)
            let newProgress = Number(formData.bookProgress) + Number(dailyGoal)
            let newDaysGoal = Number(formData.daysGoal) - 1
            if (newProgress > props.pageCount) newProgress = props.pageCount;
            setFormData({
                daysGoal: newDaysGoal,
                bookProgress: newProgress
            })
        }
    }

    const goalButton = (
        <div className=' tooltip tooltip-bottom tooltip-accent' data-tip={dailyGoal !== Infinity ? `Click this when you've read ${dailyGoal} pages today!` : `Click this when you've met your goal!`}>
            <button
                onClick={handleClick}
                name="dailyGoal"
                type="button"

                className={`btn btn-sm btn-accent ${formData.daysGoal <= 0 || formData.bookProgress >= props.pageCount ? " btn-disabled" : ""}`}

            >Goal Achieved!</button>
        </div>
    )

    const daysGoal = (<p className="mr-2 "> Read {dailyGoal} pages a day.</p>)
    return (
        <>
            <form className='text-left relative' >

                <div className='flex align-center mt-2'>
                    <progress className="progress progress-info w-56 my-auto mr-2" value={currPercent} min="0" max="100">
                    </progress>
                    <p>{currPercent}% {currPercent === 100 && <span>&#127881;</span>}</p>
                </div>

                <div className='flex mt-2 justify-start md:text-lg text-xs'>
                    <label className='w-1/2' htmlFor="">Current Page:</label>
                    <input
                        type='number'
                        max={props.pageCount}
                        min='0'
                        onChange={handleChange}
                        name='bookProgress'
                        value={formData.bookProgress}
                        className='border-black border-2 rounded-md mx-2 px-2 w-16'
                    />
                    <span> / {props.pageCount} p.</span>
                </div>

                <div className='flex mt-2 justify-start md:text-lg text-xs'>
                    <label className='w-1/2' htmlFor="">Days left to finish:</label>
                    <input
                        type='number'
                        onChange={handleChange}
                        name='daysGoal'
                        min='0'
                        value={formData.daysGoal}
                        className='border-black border-2 rounded-md mx-2 px-2 w-16'
                    />
                </div>

                <div className='flex justify-start mt-2 md:text-lg text-xs px-0'>
                    <div className='w-1/2'>{formData.daysGoal > 0 ? daysGoal : <p className='text-gray-600 mr-2 '>Your daily goal will go here!</p>}</div>
                    <div className='w-1/2'>{goalButton}</div>
                </div>


                <button
                    type='submit'
                    onClick={(e) => {
                        toggleSaveChanges(!saveChanges)
                        e.preventDefault()
                        handleSaveChanges({
                            ...formData,
                            _id: props._id
                        })
                    }}
                    className={`btn btn-sm w-40 mt-3 btn-primary 
                    ${saveChanges && 'wiggle-alert'}
                    ${!saveChanges && 'btn-disabled'}
                    
                    `}>
                    save changes</button>
            </form >
        </>
    )
}


