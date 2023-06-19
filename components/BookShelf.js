import { useState, useEffect } from 'react'
import ReadingGoalForm from './forms/ReadingGoalForm'

export default function BookShelf(props) {

    const { shelf, handleDelete, handleSaveChanges } = props


    return (<>

        <h1 className='md:text-5xl text-xl mb-12'>Your Library</h1>

        <main className='flex flex-wrap justify-start'>
            {shelf && shelf.map(b => (

                <div
                    key={b.book._id} className="card lg:card-side bg-base-100 shadow-xl rounded-md my-5 flex lg:mx-10 max-w-2xl w-full relative pt-5 pb-5 px-5">
                    <div className="dropdown dropdown-bottom dropdown-left absolute right-0 top-0 ">
                        <label tabIndex={0} className="btn btn-error btn-xs font-extrabold text-white m-1">. . .</label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow rounded-box w-52 bg-red-200">
                            <li >
                                <a onClick={() => handleDelete(b.book._id)}>
                                    <span>Remove <span className='italic'>{b.book.title}</span></span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <figure className='h-max w-1/4 md:mx-5 mx-auto'><img className='rounded-md' src={b.book.cover} alt={"The book cover for " + b.title} /></figure>

                    <div className='max-w-5xl md:text-left md:w-3/4'>
                        <h3 className="lg:text-2xl text-lg card-title pt-2">{b.book.title}</h3>
                        <ReadingGoalForm
                            pageCount={b.book.pageCount}
                            _id={b.book._id}
                            progress={b.progress}
                            goal={b.goal}
                            handleSaveChanges={handleSaveChanges}

                        />
                    </div>
                </div>


            ))}
        </main >
    </>
    )
}

