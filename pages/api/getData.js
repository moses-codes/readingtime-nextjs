import { connectMongo } from "@/utils/connectMongo"
import { getAuth, clerkClient } from "@clerk/nextjs/server";
import { useUser } from "@clerk/nextjs";

const Book = require('../../models/Book')
const User = require('../../models/User')

//TODO: replace Clerk User metadata object with PROFILE schema;
// match Clerk userId with MongoDB "Profile" Id

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
        console.log(bookShelf)
        res.status(200).json({ bookShelf });
    } catch (error) {
        console.error('books not found');
        res.status(500).json({ error: 'books not found' });
    }
}