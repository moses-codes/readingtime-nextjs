import { connectMongo } from "@/utils/connectMongo"

export default async function handler(req, res) {
    try {
        // Connect to the database
        const db = await connectMongo();

        // Use the db object to query the database
        const books = await db.collection('books').find({}).limit(10).toArray();

        // Return the query result
        res.status(200).json({ books });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}