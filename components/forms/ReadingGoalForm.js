import { useState } from 'react'

export default function ReadingGoalForm(props) {

    const [formPages, setFormPages] = useState(true)

    function handleSubmit(e) {
        console.log(e)
    }

    return (
        <>
            <PagesForm
                handleSubmit={handleSubmit}
                pageCount={props.pageCount}
            />

        </>
    )
}

export function PagesForm(props) {
    const [formData, setFormData] = useState({
        daysGoal: 0,
        bookProgress: 0,
    })
    let dailyGoal = Math.ceil((props.pageCount - formData.bookProgress) / formData.daysGoal)
    let percentProgress = Math.floor((formData.bookProgress / props.pageCount) * 100) <= 100 ? Math.floor((formData.bookProgress / props.pageCount) * 100) : 100

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }


    function handleClick(e) {
        e.preventDefault()

        if (e.target.name === "dailyGoal") {
            console.log("goal is " + dailyGoal)
            let newProgress = Number(formData.bookProgress) + Number(dailyGoal)
            let newDaysGoal = Number(formData.daysGoal) - 1
            if (newProgress > props.pageCount) newProgress = props.pageCount;
            setFormData({
                daysGoal: newDaysGoal,
                bookProgress: newProgress
            })
        }
    }




    let { handleSubmit } = props
    return (
        <>
            <form onSubmit={handleSubmit}>

                <div className='flex align-center'>
                    <progress className="progress progress-info w-56 my-auto mr-2" value={Math.floor((formData.bookProgress / props.pageCount) * 100)} max="100">
                    </progress>
                    <p>{percentProgress}% {percentProgress === 100 && <span>&#127881;</span>}</p>
                </div>

                <div className='flex justify-between'>
                    <label htmlFor="">Current progress:</label>
                    <input
                        type='number'
                        max={props.pageCount}
                        onChange={handleChange}
                        name='bookProgress'
                        value={formData.bookProgress}
                        className='border-black border-2 rounded-md mx-2 px-2 w-16'
                    />
                </div>

                <div className='flex justify-between'>
                    <label htmlFor="">Number of days to finish:</label>
                    <input
                        type='number'
                        onChange={handleChange}
                        name='daysGoal'
                        value={formData.daysGoal}
                        className='border-black border-2 rounded-md mx-2 px-2 w-16'
                    />
                </div>
            </form>
            {formData.daysGoal > 0 && <p> Your daily goal is {dailyGoal} pages a day!</p>}
            {formData.daysGoal > 0 && <button onClick={handleClick} name="dailyGoal" className="btn btn-xs btn-accent">I've reached my goal!</button>}
            <br />
            <button className="btn btn-sm btn-primary">save changes</button>
        </>
    )
}

