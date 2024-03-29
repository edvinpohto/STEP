import Head from 'next/head'
import signInRedirect from "../utils/signInRedirect"

export default function PleaseSignIn() {
  
  return(
    <div>
      <Head>
          <title>Please Sign In</title>
          <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="grid grid-cols-1 w-full place-items-center mt-4">
          <div className='content-center'>
            <h1>Welcome to the page</h1>
          </div>
          <div className='grid place-content-center p-2'>
            You do not appear to be signed in
          </div>
          <div className='grid place-content-center p-2'>
            <button id="signInButton" onClick={() => signInRedirect(undefined, { callbackUrl: '/'})} className="px-4 py-1 text-sm text-sky-600 font-semibold rounded-full border border-sky-200 hover:text-white hover:bg-sky-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2">Sign in</button>
          </div>
        </div>
    </div>
  )
}