import type { NextPage } from 'next'
import { useSession } from "next-auth/react"
import Head from 'next/head'
import NavbarSignedIn from '../components/Navbars/NavbarSignedIn'
import NavbarSignedOut from '../components/Navbars/NavbarSignedOut'
import SearchBar from '../components/SearchBar'

const YourEvents: NextPage = () => {
  const { data: session, status } = useSession();
  
  if (status === 'loading') {
    return (
      <>
        <NavbarSignedIn />
        {/* <SearchBar /> */}
        <div className='grid grid-cols-1 place-content-center place-items-center p-5'>
          <h1>Loading...</h1>
        </div>
      </>
    )
  }

  if (session) {
    return (
      <main>

        <div>
          <Head>
            <title>St Andrews Events Platform</title>
            <meta name="keywords" content="STEP, St Andrews, Events" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
    
          <NavbarSignedIn />
          <SearchBar />
          
        </div>
      </main>
    )
  }

  return (
    <div>
      <Head>
        <title>St Andrews Events Platform</title>
        <meta name="keywords" content="STEP, St Andrews, Events" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
  
      <NavbarSignedOut />
      <SearchBar />
  
    </div>
  )
}

export default YourEvents