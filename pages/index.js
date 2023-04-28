import connectMongo from '@/utils/connectMongo'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import BookShelf from '../components/BookShelf'

const inter = Inter({ subsets: ['latin'] })

// function BookShelf() {
//   const [shelf, setShelf] = useState([])
//   useEffect(() => {
//     fetch('/api/getData')
//       .then(res => res.json())
//       .then(data => setShelf(data.books))
//   }, [])

//   console.log(shelf)

//   return (<>

//     <h1 className='md:text-5xl text-3xl'>Here's your bookshelf</h1>

//     <ul className='mt-10'>
//       {shelf && shelf.map(b => <li key={b._id} className='my-5'>
//         <p>{b.title} by {b.authors[0]}</p>
//         <p>{b.pageCount} pages</p>
//       </li>)}
//     </ul>

//   </>
//   )
// }

export default function Home({ props }) {

  return (
    <Layout>
      <main
        className="p-12">
        <BookShelf />
      </main>
    </Layout>
  )
}
