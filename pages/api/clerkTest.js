import { getAuth } from "@clerk/nextjs/server";

export default async function handler(req, res) {
    const { userId } = getAuth(req);
    // Load any data your application needs for the API route
    console.log(getAuth(req))
    return res.status(200).json({ data: 'data' });
}