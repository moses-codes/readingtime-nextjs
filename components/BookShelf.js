import { useState, useEffect } from 'react'
import ReadingGoalForm from './forms/ReadingGoalForm'

export default function BookShelf(props) {

    const { shelf } = props
    // const [shelf, setShelf] = useState([])
    // useEffect(() => {
    //     fetch('/api/getData')
    //         .then(res => res.json())
    //         .then(data => setShelf(data.books))
    // }, [])



    return (<>

        <h1 className='md:text-5xl text-3xl'>Here's your bookshelf</h1>

        {shelf && shelf.map(b => (

            <div key={b._id} className="bg-base-100 shadow-xl rounded-md my-5 flex max-w-2xl ">
                <div className="dropdown dropdown-bottom absolute ml-1">
                    <label tabIndex={0} className="btn m-1">...</label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 ">
                        <li><a>Remove from shelf</a></li>
                    </ul>
                </div>
                <div className='border-black border-2  rounded-md h-max w-max mr-5'><img className='' src={b.cover} alt={"The book cover for " + b.title} /></div>
                <div className="">
                    <p className="card-title pt-2">{b.title}</p>
                    <ReadingGoalForm
                        pageCount={b.pageCount}
                    />
                </div>
            </div>


        ))}

    </>
    )
}

