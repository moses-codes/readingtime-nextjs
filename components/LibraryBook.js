import { useState, useEffect } from 'react'
import ReadingGoalForm from './forms/ReadingGoalForm'

export default function LibraryBook({ _id,
    title, cover, pageCount, progress, goal,
    handleDelete, handleSaveChanges }) {

    return (

        <div
            key={_id} className="card sm:card-side bg-base-100 shadow-xl rounded-md my-5 flex lg:mx-10 max-w-2xl w-full relative pt-5 pb-5 px-5 border-2 border-gray-400">
            <div className="dropdown dropdown-bottom dropdown-left absolute right-0 top-0 ">
                <label tabIndex={0} className="btn btn-error btn-xs font-extrabold text-white m-1">. . .</label>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow rounded-box w-52 bg-red-100">
                    <li >
                        <a onClick={() => handleDelete(_id)}>
                            <span>Remove <span className='italic'>{title}</span></span>
                        </a>
                    </li>
                </ul>
            </div>


            <figure className='h-max min-w-1/4 mx-auto'><img className='rounded-md' src={cover} alt={"The book cover for " + title} /></figure>

            <div className='max-w-4xl md:text-left md:w-3/4 w-full md:ml-5 ml-3'>
                <h3 className="lg:text-2xl text-lg card-title pt-2 truncate">{title}</h3>
                <ReadingGoalForm
                    pageCount={pageCount}
                    _id={_id}
                    progress={progress}
                    goal={goal}
                    handleSaveChanges={handleSaveChanges}
                />

            </div>
        </div>
    )
}