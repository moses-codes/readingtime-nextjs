import { getAuth, clerkClient } from "@clerk/nextjs/server";

export default async function handler(req, res) {
    const { userId } = getAuth(req);
    const user = await clerkClient.users.getUser(userId)
    // Load any data your application needs for the API route
    console.log(userId, user)
    return res.status(200).json({ data: user });
}