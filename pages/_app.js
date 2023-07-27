import Layout from '@/components/Layout';
import '@/styles/globals.css'
// import { ClerkProvider, SignedIn, SignedOut, SignIn, UserButton } from "@clerk/nextjs";

import { useState, useEffect } from 'react'

import { ClerkProvider } from '@clerk/nextjs';

import Alert from '@/components/Alert';

export default function MyApp({ Component, pageProps }) {

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
      <div className='relative z-auto'>
        {showAlert.status && <Alert type={showAlert.type} title={showAlert.title} />}
        <Component {...pageProps}
          toggleAlert={toggleAlert}
        />
      </div>
    </ClerkProvider>
  );
}