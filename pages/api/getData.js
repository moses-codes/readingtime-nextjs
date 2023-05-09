import { connectMongo } from "@/utils/connectMongo"
import { getAuth, clerkClient } from "@clerk/nextjs/server";
import { useUser } from "@clerk/nextjs";

const Book = require('../../models/Book')

//TODO: replace Clerk User metadata object with PROFILE schema;
// match Clerk userId with MongoDB "Profile" Id

export default async function handler(req, res) {
    const { userId } = getAuth(req)
    const user = await clerkClient.users.getUser(userId);
    const currentlyReading = user.publicMetadata.books_reading
    try {
        // Connect to the database
        const db = await connectMongo();

        // Use the db object to query the database
        const books = await db.collection('books').find({
            google_id: { $in: currentlyReading }
        }).toArray();
        // console.log(books)

        // Return the query result
        res.status(200).json({ books });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}