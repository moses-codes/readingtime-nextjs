import User from "../../../models/User";
import { connectMongo } from "../../../utils/connectMongo";
import { getAuth, clerkClient } from "@clerk/nextjs/server";

//the api returns the userId. 

//create a USER object in MongoDB if one matching the current userID doesn't exist

export default async function handler(req, res) {
    const { userId } = getAuth(req);
    const { createdAt, firstName, lastName, username } = await clerkClient.users.getUser(userId)

    // Load any data your application needs for the API route
    try {
        // Connect to the database
        await connectMongo();

        // Use the db object to query the database
        // console.log('looking for user')
        // let user
        let currUser = await User.findOne({
            clerkId: userId
        })

        if (currUser) {
            // console.log('user found:', currUser)
        } else {
            const newUser = new User({
                clerkId: userId,
                firstName: firstName,
                lastName: lastName,
                username: username,
                booksReading: [],
                booksCompleted: [],
                createdOn: createdAt,
            })
            const result = await newUser.save()
            // console.log("New user created: ", result)
        }

        // Return the query result
        res.status(200).json({ currUser: currUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}