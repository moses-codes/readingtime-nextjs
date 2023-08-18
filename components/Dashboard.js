export default function Dashboard({ totalPages }) {

    // let totalPages = shelf.filter(book => book.lastUpdated).length === 0 ? null : calculateTotalPages(shelf);

    // let name = user.firstName || user.username

    let message

    console.log(totalPages)

    if (totalPages > 1) {
        message = `You have ${totalPages} pages left to read today.`
    } else if (totalPages === 1) {
        message = `You have just ${totalPages} page left to read today!`
    } else if (totalPages === 0) {
        message = "You've achieved all your reading goals today!"
    } else if (totalPages === null) {
        message = "You haven't set any goals yet. Let's do it!"
    } else {
        message = 'Your library is empty. Why not add some books?'
    }

    return (
        <div className="card max-w-96 bg-base-100 shadow-xl mt-5 h-auto">
            <div className="card-body">
                <h2 className="card-title">Hello!</h2>
                <p className='text-xl'>{message}</p>
            </div>
        </div>
    )
}

