import { connectMongo } from "../../../utils/connectMongo"
import { getAuth, clerkClient } from "@clerk/nextjs/server";
import { useUser } from "@clerk/nextjs";

const User = require('../../../models/User')

export default async function handler(req, res) {
    try {
        await connectMongo();
        const { userId } = getAuth(req)
        const { formData } = req.body; // Assuming the target is passed in the request body
        const {
            // daysGoal, 
            bookProgress, _id, goalAchievedAt, lastUpdated, dateOfCompletion, pageCount, isDateGoal, paceGoal } = formData


        if (bookProgress > pageCount) {
            console.log('bad input')
            return res.status(400).json({ message: "Invalid form data." })
        }

        const currUser = await User.findOneAndUpdate(
            { clerkId: userId, 'booksReading.bookId': _id },
            {
                $set: {
                    'booksReading.$.progress': bookProgress, // Update the progress field of the matched bookId
                    // 'booksReading.$.goal': daysGoal, // Update the goal field of the matched bookId
                    'booksReading.$.goalAchievedAt': goalAchievedAt,
                    'booksReading.$.lastUpdated': lastUpdated,
                    'booksReading.$.dateOfCompletion': dateOfCompletion,
                    'booksReading.$.isDateGoal': isDateGoal,
                    'booksReading.$.paceGoal': paceGoal,
                },
            },
        );

        //   // Handle successful deletion and return the updated user or appropriate response
        return res.status(200).json({ message: "Book updated successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}