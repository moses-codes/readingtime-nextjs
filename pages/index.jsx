
import { Inter } from 'next/font/google'
import Layout from '../components/Layout'

import Greeting from '../components/Greeting'

import useSWR from 'swr'

const inter = Inter({ subsets: ['latin'] })

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Home(props) {

  const { data, error, isLoading } = useSWR('/api/auth/getUser', fetcher)

  return (<Layout>
    <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1607473332998-e53c0c6f0ab0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80)' }}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <div className="flex justify-center items-center">
            <Greeting />
          </div>

        </div>
      </div>
    </div>
  </Layout >
  )
}