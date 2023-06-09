import Layout from '@/components/Layout';
import '@/styles/globals.css'
// import { ClerkProvider, SignedIn, SignedOut, SignIn, UserButton } from "@clerk/nextjs";

import { ClerkProvider } from '@clerk/nextjs';



export default function MyApp({ Component, pageProps }) {

  return (
    <ClerkProvider {...pageProps} appearance={
      {
        variables: {
          colorPrimary: "#89b0ae",
          colorText: "black"
        }
      }
    }>
      <Component {...pageProps} />
    </ClerkProvider>
  );
}

// import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
// import { useRouter } from 'next/router';

// //  List pages you want to be publicly accessible, or leave empty if
// //  every page requires authentication. Use this naming strategy:
// //   "/"              for pages/index.js
// //   "/foo"           for pages/foo/index.js
// //   "/foo/bar"       for pages/foo/bar.js
// //   "/foo/[...bar]"  for pages/foo/[...bar].js
// const publicPages = ['/', "/sign-in/[[...index]]", "/sign-up/[[...index]]"];

// function MyApp({ Component, pageProps }) {
//   // Get the pathname
//   const { pathname } = useRouter();

//   // Check if the current route matches a public page
//   const isPublicPage = publicPages.includes(pathname);

//   // If the current route is listed as public, render it directly
//   // Otherwise, use Clerk to require authentication
//   return (
//     <ClerkProvider {...pageProps}>
//       {isPublicPage ? (
//         <Component {...pageProps} />
//       ) : (
//         <>
//           <SignedIn>
//             <Component {...pageProps} />
//           </SignedIn>
//           <SignedOut>
//             <RedirectToSignIn />
//           </SignedOut>
//         </>
//       )}
//     </ClerkProvider>
//   );
// }

// export default MyApp;