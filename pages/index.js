
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'
import Layout from '../components/Layout'

const inter = Inter({ subsets: ['latin'] })


export default function Home(props) {
  const [currUser, setUser] = useState('')
  useEffect(() => {
    if (currUser === '') {
      fetch("/api/auth/getUser")
        .then(res => res.json())
        .then(data => setUser(data))
    }
  }, [])



  console.log(currUser)

  return (<Layout>
    <main
      className="p-12">

      <h1>Welcome to readingtime!</h1>


    </main></Layout>
  )
}