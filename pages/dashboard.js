import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import BookShelf from '../components/BookShelf'
import { connectMongo } from "@/utils/connectMongo"

export default function Home({ props }) {
    console.log("these are my props: ", props)
    return (
        <Layout>
            <main
                className="p-12">
                <BookShelf />
            </main>
        </Layout>
    )
}
