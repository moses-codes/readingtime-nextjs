import Layout from '@/components/Layout';
import '@/styles/globals.css'
// import { ClerkProvider, SignedIn, SignedOut, SignIn, UserButton } from "@clerk/nextjs";

import { useState, useEffect } from 'react'

import { ClerkProvider } from '@clerk/nextjs';

import Alert from '@/components/Alert';

import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

import { AnimatePresence } from 'framer-motion';

export default function MyApp({ Component, pageProps }) {

  const { data, error, isLoading } = useSWR('/api/auth/getUser', fetcher)

  const [showAlert, toggleAlert] = useState({
    status: false,
    title: null,
    type: null,
  })

  return (
    <ClerkProvider {...pageProps} appearance={
      {
        variables: {
          colorPrimary: "#5e3fa2",
          colorText: "black"
        }
      }
    }>
      <div className='relative z-auto  bg-base-100'>
        <AnimatePresence>
          {showAlert.status && <Alert type={showAlert.type} title={showAlert.title} />}
        </AnimatePresence>
        <Component {...pageProps}

          toggleAlert={toggleAlert}
        />
      </div>
    </ClerkProvider>
  );
}