import { connectMongo } from "../../../utils/connectMongo"
import { getAuth, clerkClient } from "@clerk/nextjs/server";
import { useUser } from "@clerk/nextjs";

const User = require('../../../models/User')

export default async function handler(req, res) {
    console.log(req.body)
    try {
        await connectMongo();
        const { userId } = getAuth(req)
        const { _id } = req.body; // Assuming the target is passed in the request body
        const currUser = await User.findOneAndUpdate(
            { clerkId: userId },
            { $pull: { booksReading: { bookId: _id } } },
        );
        //   // Handle successful deletion and return the updated user or appropriate response
        return res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}