export default function Alert({ type, title = 'Book' }) {

    if (type === 'deleted') {
        return (
            <div className='relative'>
                <div className='alert-pop z-50'>
                    <div className="animate-alert-pop alert alert-warning fixed bottom-4 left-1/2 transform -translate-x-1/2 min-w-min max-w-max  text-black py-2 px-4 rounded-lg z-50 flex justify-start items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        <p className='italic'><span className='italic'>{title}</span>removed from library.</p>
                    </div>
                </div>
            </div>
        )
    } else if (type === 'added') {
        return (
            <div className='z-50 ease-in-out'>
                <div className="animate-alert-pop alert alert-info fixed bottom-4 left-1/2 transform -translate-x-1/2 min-w-min max-w-max bg-blue-500 text-white py-2 px-4 rounded-lg z-50 flex justify-start items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <p ><span className='italic'>{title}</span>added to library.</p>
                </div>
            </div>
        )
    } else if (type === 'updated') {
        return (
            <div className='alert-pop z-50'>
                <div className="animate-alert-pop alert alert-warning fixed bottom-4 left-1/2 transform -translate-x-1/2 min-w-min max-w-max  text-black  py-2 px-4 rounded-lg z-50 flex justify-start items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <p ><span className='italic'>{title}</span> has been updated in your library.</p>
                </div>
            </div>
        )
    }
}