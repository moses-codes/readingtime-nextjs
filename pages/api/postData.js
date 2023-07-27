import { connectMongo } from "@/utils/connectMongo";
import { getAuth, clerkClient } from "@clerk/nextjs/server";
const Book = require('../../models/Book');
// const GoalBook = require('../../models/GoalBook');
const User = require('../../models/User');
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

            try {

                let mongoUser = await User.findOne({ clerkId: userId })
                let { username, booksReading } = mongoUser
                let bookToAdd = await Book.findOne({ google_id: google_id })

                //Push bookToAdd to the booksReading array in the User object
                mongoUser.booksReading.push({
                    bookId: bookToAdd._id,
                    google_id: google_id,
                    progress: 0,
                    goal: 0,
                    pageCount: bookToAdd.pageCount,
                    thing: 'thing',
                })

                const savedUser = await mongoUser.save();
                console.log(savedUser)

            } catch (error) {
                console.error(error);
            }
            console.log(`added ${title} to user ${userId}'s reading shelf. `)
            return res.status(200).json({ data: `added ${title} to user ${userId}'s reading shelf` });
        } catch (error) {
            res.status(500).json({ success: false, error: 'Server Error' });
        }

    } else {
        res.status(404).json({ success: false, error: 'Not Found' });
    }
}