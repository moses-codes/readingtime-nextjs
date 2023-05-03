import { useState } from 'react'

export default function ReadingGoalForm(props) {

    const [formPages, setFormPages] = useState(true)

    function handleClick() {
        setFormPages(!formPages)
    }

    function handleSubmit(e) {
        console.log(e)
    }

    return (
        <>
            <h1>Which form would you like?</h1>

            <button
                onClick={handleClick}
                className="border-black border-2"
            >
                change form
            </button>

            <form>

                {formPages ? <PagesForm
                    handleSubmit={handleSubmit}
                    pageCount={props.pageCount}
                /> : <DailyForm
                    handleSubmit={handleSubmit} />}

            </form>
        </>
    )
}

export function PagesForm(props) {
    const [formData, setFormData] = useState({
        daysGoal: 0
    })
    function handleChange(e) {
        setFormData({
            daysGoal: e.target.value
        })
    }
    console.log(formData)
    let { handleSubmit } = props
    return (
        <>
            <h2>pagesForm</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="bookTitle">How many days would you like to finish this book?</label>
                <input
                    onChange={handleChange}
                    name='daysGoal'
                />

            </form>
            {formData.daysGoal > 0 && <p>Read {Math.ceil(props.pageCount / formData.daysGoal)} pages a day.</p>}
        </>
    )
}

export function DailyForm(props) {
    let { handleSubmit } = props
    return (
        <>
            <h2>dailyForm</h2>
            <form>

            </form>
        </>
    )
}