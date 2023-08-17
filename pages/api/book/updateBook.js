import { connectMongo } from "../../../utils/connectMongo"
import { getAuth, clerkClient } from "@clerk/nextjs/server";
import { useUser } from "@clerk/nextjs";

const User = require('../../../models/User')

export default async function handler(req, res) {
    try {
        await connectMongo();
        const { userId } = getAuth(req)
        const { formData } = req.body; // Assuming the target is passed in the request body
        const { daysGoal, bookProgress, _id, goalAchievedAt, lastUpdated } = formData

        function computeDateOfCompletion(daysToAdd, lastUpdated) {
            // Original date
            const originalDate = new Date(lastUpdated);

            // Calculate the new timestamp by adding the days in milliseconds
            const newTimestamp = originalDate.getTime() + (daysToAdd * 24 * 60 * 60 * 1000);

            // Create a new Date object using the new timestamp
            const newDate = new Date(newTimestamp);

            return newDate.toISOString(); // Output: "2023-08-27T19:27:38.269Z"
        }

        const dateOfCompletion = computeDateOfCompletion(daysGoal, lastUpdated)

        const currUser = await User.findOneAndUpdate(
            { clerkId: userId, 'booksReading.bookId': _id },
            {
                $set: {
                    'booksReading.$.progress': bookProgress, // Update the progress field of the matched bookId
                    'booksReading.$.goal': daysGoal, // Update the goal field of the matched bookId
                    'booksReading.$.goalAchievedAt': goalAchievedAt,
                    'booksReading.$.lastUpdated': lastUpdated,
                    'booksReading.$.dateOfCompletion': dateOfCompletion,
                },
            },
        );
        console.log()
        //   // Handle successful deletion and return the updated user or appropriate response
        return res.status(200).json({ message: "Book updated successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}