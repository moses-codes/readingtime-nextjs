import User from "@models/User";
import { connectToDB } from "@utils/connectMongo";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch prompts created by user", { status: 500 })
    }
}

export const POST = async (request, { params }) => {
    try {
        await connectToDB()

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch prompts created by user", { status: 500 })
    }
} 