import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function PaceForm({ pageCount, formData, initialBookProgress, dailyGoal,
    toggleSaveChanges, handleChange, handleSaveChanges, handleDateChange, saveChanges, _id,
    isDateGoal = false, paceGoal = 1
}) {
    return (<form className='text-left relative h-1/2 mt-5' >

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
                I will read...
            </label>
            <input
                type='number'
                max={pageCount}
                min='1'
                onChange={(e) => {
                    toggleSaveChanges(true)
                    handleChange(e)
                }
                }
                name='paceGoal'
                value={formData.paceGoal}
                className='border-black border-2 rounded-md mx-2 px-2 w-20'
            />
            <span className='text-md'> p. / day </span>
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
                        isDateGoal: false,
                        paceGoal: paceGoal,
                    })
                }}
                className={`btn btn-sm w-40 mr-2 mx-2 btn-primary 
        ${saveChanges && 'wiggle-alert'}
        ${!saveChanges && 'btn-disabled'}
        
        `}>
                Update Info</button>
        </div>
    </form >)
}