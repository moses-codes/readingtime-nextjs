import { getAuth, clerkClient } from "@clerk/nextjs/server";

export default async function handler(req, res) {
    const { userId } = getAuth(req);

    //take the added ID from the req body

    //create a new ...array containing the requested ID to be added

    //set books reading to that new array

    const bookshelf = {
        publicMetadata: {

            books_reading: ['345fdfh4hfh']
        }
    }

    const user = await clerkClient.users.updateUser(userId, bookshelf)
    // Load any data your application needs for the API route
    console.log(user)
    return res.status(200).json({ data: user });
}