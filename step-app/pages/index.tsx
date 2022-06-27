import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react'
import styles from '../styles/Layout.module.css'
import { signIn, signOut, useSession } from "next-auth/react"

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <h1>Loading...</h1>
  }

  if (session) {
    return (
      <div className={styles.container}>
        <Head>
          <title>St Andrews Events Platform</title>
          <meta name="keywords" content="STEP, St Andrews, Events" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div>
          <h1>Welcome to the page</h1>
        </div>
        <>
          Signed in as {session.user?.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      </div>
    )
  }
  
  return (
    <div className={styles.container}>
      <Head>
        <title>St Andrews Events Platform</title>
        <meta name="keywords" content="STEP, St Andrews, Events" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>Welcome to the page</h1>
      </div>
      <>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </>
    </div>
  )
}

export default Home
