import { connectMongo } from "@/utils/connectMongo"
import { getAuth, clerkClient } from "@clerk/nextjs/server";

const Book = require('../../models/Book')
const User = require('../../models/User')

export default async function handler(req, res) {
    const { userId } = getAuth(req)
    await connectMongo();
    try {
        // Connect to the database
        console.log('trying...')

        // const user = await clerkClient.users.getUser(userId);
        let { booksReading } = await User.findOne({
            clerkId: userId
        }).exec()

        console.log(booksReading)

        if (!booksReading || booksReading.length === 0) {
            // If the library is empty or booksReading is not an array,
            // return an empty array.
            return res.status(200).json({ updatedBooksReading: [] });
        }

        console.log(booksReading)
        //console.log(user)
        //create an array of JUSt the book ids
        const ids = booksReading.map(el => el.bookId)
        const bookShelf = await Book.find({ _id: { $in: ids } })
        const updatedBooksReading = booksReading.map(el => {
            const matchingBook = bookShelf.find(book => book._id.equals(el.bookId));
            return {
                book: matchingBook,
                progress: el.progress,
                goal: el.goal,
                pageCount: el.pageCount
            };
        });

        res.status(200).json({ updatedBooksReading });
    } catch (error) {
        console.error('books not found');
        res.status(500).json({ error: 'books not found' });
    }
}