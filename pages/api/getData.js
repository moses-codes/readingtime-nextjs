import { connectMongo } from "@/utils/connectMongo"
import { getAuth, clerkClient } from "@clerk/nextjs/server";
import { useUser } from "@clerk/nextjs";

const Book = require('../../models/Book')
const User = require('../../models/User')

export default async function handler(req, res) {
    const { userId } = getAuth(req)

    // const currentlyReading = user.publicMetadata.books_reading
    try {
        // Connect to the database
        await connectMongo();
        // const user = await clerkClient.users.getUser(userId);
        const { booksReading } = await User.findOne({ clerkId: userId })
        //create an array of JUSt the book ids
        const ids = booksReading.map(el => el.bookId)
        const bookShelf = await Book.find({ _id: { $in: ids } })
        const updatedBooksReading = booksReading.map(el => {
            const matchingBook = bookShelf.find(book => book._id.equals(el.bookId));
            return {
                book: matchingBook,
                progress: el.progress,
                goal: el.goal,
            };
        });

        res.status(200).json({ updatedBooksReading });
    } catch (error) {
        console.error('books not found');
        res.status(500).json({ error: 'books not found' });
    }
}