import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react'
import styles from '../styles/Layout.module.css'
import { signIn, signOut, useSession } from "next-auth/react"

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  // console.log(session)

  if (status === 'loading') {
    return (
      <div className='grid grid-cols-1 place-content-center place-items-center p-5'>
        <h1>Loading...</h1>
      </div>
    )
  }

  if (session) {
    return (
      <div>
        <Head>
          <title>St Andrews Events Platform</title>
          <meta name="keywords" content="STEP, St Andrews, Events" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className='grid grid-cols-1 place-content-center place-items-center p-5'>
          <div>
            <h1>Welcome to the page</h1>
          </div>
          <>
            Signed in as {session.user?.email} <br />
            <button onClick={() => signOut()} className="px-4 py-1 text-sm text-sky-600 font-semibold rounded-full border border-sky-200 hover:text-white hover:bg-sky-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2">Sign out</button>
          </>
        </div>
      </div>
    )
  }
  
  return (
    <div>
      <Head>
        <title>St Andrews Events Platform</title>
        <meta name="keywords" content="STEP, St Andrews, Events" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='grid grid-cols-1 place-content-center place-items-center p-5'>
        <div>
          <h1>Welcome to the page</h1>
        </div>
        <>
          Not signed in <br />
          <button onClick={() => signIn()} className="px-4 py-1 text-sm text-sky-600 font-semibold rounded-full border border-sky-200 hover:text-white hover:bg-sky-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2">Sign in</button>
        </>
      </div>
    </div>
  )
}

export default Home
