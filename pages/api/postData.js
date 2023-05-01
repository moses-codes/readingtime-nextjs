import { connectMongo } from "@/utils/connectMongo";
import { getAuth, clerkClient } from "@clerk/nextjs/server";
const Book = require('../../models/Book');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Connect to the database
        await connectMongo();

        const { google_id, title, authors, pageCount, cover } = req.body;
        //object destructuring to make the object properties simpler to work with
        const { userId } = getAuth(req);

        // Insert the document into the collection
        try {
            try {
                const book = new Book({
                    title, authors, pageCount, cover, google_id
                });

                // const indexes = await Book.collection.getIndexes();
                // console.log(indexes)
                //instantiate a new book object thru the imported schema

                const result = await book.save()
                //mongoose will try to save that book into the collection

                console.log(result)
            } catch (error) {
                console.error(error);
            }
            //add the google_id to the user's metadata.
            try {
                const user = await clerkClient.users.getUser(userId);

                //check for the books_reading array
                if (!user.publicMetadata.books_reading) user.publicMetadata.books_reading = [];

                //take the added ID from the req body
                //create a new ...array containing the requested ID to be added
                //set books reading to that new array

                const bookshelf = {
                    publicMetadata: {
                        books_reading: [...user.publicMetadata.books_reading, google_id]
                    }
                }

                const updatedUser = await clerkClient.users.updateUser(userId, bookshelf)
                // Load any data your application needs for the API route
                console.log(updatedUser)

            } catch (error) {
                console.error(error);
            }
            console.log(`added ${title} to user ${userId}'s reading shelf`)
            return res.status(200).json({ data: `added ${title} to user ${userId}'s reading shelf` });
        } catch (error) {
            res.status(500).json({ success: false, error: 'Server Error' });
        }

    } else {
        res.status(404).json({ success: false, error: 'Not Found' });
    }
}