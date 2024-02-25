import { connectMongo } from "../../../utils/connectMongo"
import { getAuth, clerkClient } from "@clerk/nextjs/server";
import { useUser } from "@clerk/nextjs";

const User = require('../../../models/User')

export default async function handler(req, res) {
    console.log('kijiji')
    
    try {
        await connectMongo();
        const { userId } = getAuth(req)
        const formData = req.body; // Assuming the target is passed in the request body
        let { pageCount, _id } = formData
        if (isNaN(pageCount)){
            console.log("Invalid Input")
            throw new Error("Page count should be a valid number.");
        }
        const currUser = await User.findOneAndUpdate(
            { clerkId: userId, 'booksReading.bookId': _id },
            {
                $set: {
                    'booksReading.$.pageCount': pageCount, // Update the progress field of the matched bookId
                },
            },
        );
        // console.log(formData, currUser)
        //   // Handle successful deletion and return the updated user or appropriate response
        return res.status(200).json({ message: "Book's page count updated successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
}