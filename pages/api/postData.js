import { connectMongo } from "@/utils/connectMongo";
import Book from '../../models/Book'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Connect to the database
        await connectMongo();

        const { title, author, page_count, isbn } = req.body;

        // Insert the document into the collection
        try {
            const book = new Book({
                title, author, page_count, isbn
            });

            //instantiate a new book object thru the imported schema

            const result = await book.save()
            //mongoose will try to save that book into the collection

            res.status(201).json({ success: true, data: result });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: 'Server Error' });
        }
    } else {
        res.status(404).json({ success: false, error: 'Not Found' });
    }
}