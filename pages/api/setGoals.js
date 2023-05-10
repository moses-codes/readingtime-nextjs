import { getAuth, clerkClient } from "@clerk/nextjs/server";

export default async function handler(req, res) {
    const { userId } = getAuth(req)
    const user = await clerkClient.users.getUser(userId)
    try {
        res.status(200).json(user.publicMetadata)
    } catch {

    }
}