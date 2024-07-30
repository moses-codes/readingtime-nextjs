import { useState } from 'react';
import Dashboard from '@/components/Library/Dashboard';
import Layout from '../../components/Layout'
import BookShelf from '../../components/Library/BookShelf'
// import Dashboard from '../../components/Dashboard'

import { timeChecker } from '@/utils/timeChecker';

import useSWR, { useSWRConfig } from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export async function getServerSideProps(context) {
    try {
        const data = await fetcher('/api/getData');
        return {
            props: {
                libraryData: data,
            },
        };
    } catch (error) {
        return {
            props: {
                libraryData: null,
            },
        };
    }
}

export default function Home({ libraryData, toggleAlert }) {

    const { mutate } = useSWRConfig()

    const { data, error, isLoading } = useSWR('/api/getData', fetcher, {
        libraryData,
    });


    let totalPages

    async function handleUpdatePageCount(value) {
        //console.log('changing page count to ', value)
        const response = await fetch('/api/book/updatePageCount', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(value),
        });

        //console.log(response)

        if (response.ok) {
            //console.log('Book page count updated successfully');
            toggleAlert({
                status: true,
                type: 'updated',
                title: value.title
            })
            setTimeout(() => {
                toggleAlert({
                    status: false,
                    type: null,
                    title: null,
                });
            }, 2800);
            mutate('/api/getData')

        } else {
            console.error(response);
            toggleAlert({
                status: true,
                type: 'failed',
                title: 'Invalid page count entered.'
            })
            setTimeout(() => {
                toggleAlert({
                    status: false,
                    type: null,
                    title: null,
                });
            }, 2800);
        }
    }
    async function handleDelete({ _id, title }) {
        //console.log(_id, title)
        const response = await fetch('/api/book/deleteBook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ _id }),
        });

        //console.log(response)

        if (response.ok) {

            toggleAlert({
                status: true,
                type: 'deleted',
                title: title,
            })
            setTimeout(() => {
                toggleAlert({
                    status: false,
                    type: null,
                    title: null,
                });
            }, 2800);
            console.log('Document removed successfully');
            mutate('/api/getData')
        } else {
            console.error('Failed to remove document');
        }
    }
    async function handleSaveChanges(formData) {
        //console.log(formData)
        const response = await fetch('/api/book/updateBook', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ formData }),
        });

        // console.log(response)

        if (response.ok) {
            mutate('/api/getData')
            toggleAlert({
                status: true,
                type: 'updated',
                title: formData.title,
            })
            setTimeout(() => {
                toggleAlert({
                    status: false,
                    type: null,
                    title: null,
                });
            }, 2800);
            console.log('Book updated successfully');
        } else {
            toggleAlert({
                status: true,
                type: 'failed',
                title: formData.title,
            })
            setTimeout(() => {
                toggleAlert({
                    status: false,
                    type: null,
                    title: null,
                });
            }, 2800);
            console.error('Failed to update book');
        }
    }


    let shelfSection;

    // console.log(data)

    if (isLoading || !data) {
        totalPages = "loading library..."
        shelfSection = (
            <div role="status" className='flex justify-center'>
                <svg
                    aria-hidden="true" className="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading books...</span>
            </div>
        )
    } else if (error) {
        shelfSection = (<div>Error retrieving books</div>)
    }
    else if (!data.updatedBooksReading || data.updatedBooksReading.length === 0) {
        //console.log('library loaded')
        shelfSection = (
            <>
                <div className='flex '>
                    <Dashboard shelf={[]} totalPages={''} />
                    <h2 className='mt-10 text-center'>You have no books in your library.</h2>
                </div>
            </>
        )
    } else if (data) {
        totalPages = data.updatedBooksReading
            .filter(book => book.lastUpdated).length === 0 ? null : calculateTotalPages(data.updatedBooksReading);

        //console.log(data)
        shelfSection = (
            <>
                <BookShelf
                    className="fade-in"
                    shelf={data.updatedBooksReading}
                    handleDelete={handleDelete}
                    handleSaveChanges={handleSaveChanges}
                    handleUpdatePageCount={handleUpdatePageCount}
                    totalPages={totalPages}
                />
            </>
        )
    }

    return (
        <Layout>
            <main
                className="px-12 py-32">
                <div
                // className='flex justify-start items-center'
                >
                    <h1 className=' md:text-5xl text-4xl mb-10  mx-5 font-light text-center'>Your Library</h1>
                    {/* <div className='w-1/2'> */}

                    {/* </div> */}
                </div>

                <section className='flex md:flex-row flex-col flex-shrink-0 md:justify-center items-center'>

                    <div className='md:mx-auto md:w-10/12'>{shelfSection}</div>
                </section>


            </main>
        </Layout>
    )
}



function calculateTotalPages(arr) {
    //console.log('the arr is', (arr))
    const now = new Date()

    //check if goalAchieved === today
    //filter out the books whose goalAchieved === today


    let totalPages = arr.filter(book => {
        if (book.isDateGoal) {
            //console.log(book.book.title, 'is date goal.')
            const daysLeft = book.dateOfCompletion ? Math.ceil((new Date(book.dateOfCompletion) - new Date()) / (1000 * 60 * 60 * 24)) : 0
            return timeChecker(new Date(book.goalAchievedAt), now, 'days') === false && daysLeft > 0;
        }
        else {
            return book.progress !== book.pageCount;
        }
    })
        // //iterate thru the array and reduce to the total number of pages
        .reduce((acc, c) => {
            // console.log(c)
            if (c.isDateGoal) {
                //get the remaining pages
                const daysLeft = c.dateOfCompletion ? Math.ceil((new Date(c.dateOfCompletion) - new Date()) / (1000 * 60 * 60 * 24)) : 0
                return acc + Math.ceil((c.pageCount - c.progress) / daysLeft)
            } else {
                const isGoalCompleted = timeChecker(new Date(c.goalAchievedAt), now, 'days')
                // console.log(c.book.title, c.goalAchievedAt, isGoalCompleted)
                return isGoalCompleted ? acc + 0 : acc + c.paceGoal
            }
        }, 0)

    // console.log('total pages is', totalPages)

    return totalPages

}