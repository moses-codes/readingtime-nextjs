import connectMongo from '@/utils/connectMongo'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })



export default function Home({ props }) {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>it's time for to be reading</h1>
    </main>
  )
}
export async function getStaticProps() {
  const uri = process.env.MONGO_URI
  console.log(uri, 'it goes here')
  return {
    props: {
      uri: uri,
    }
  }
}