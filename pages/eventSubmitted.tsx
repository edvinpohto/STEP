// Page for when an event has been submitted

import type { NextPage } from 'next'
import { useSession } from "next-auth/react"
import Head from 'next/head'
import NavbarSignedIn from '../components/Navbars/NavbarSignedIn'
import NavbarSignedOut from '../components/Navbars/NavbarSignedOut'
import { Spinner } from 'flowbite-react'
import Link from 'next/link'

const EventSubmitted: NextPage = () => {
  const { data: session, status } = useSession();
  
  if (status === 'loading') {
    return (
      <>
        <NavbarSignedIn />
        <div className="text-center grid grid-cols-1 place-content-center place-items-center p-5">
          <Spinner aria-label="Center-aligned spinner example" />
        </div>
      </>
    )
  }

  if (session) {
    return (
      <div>
        <Head>
          <title>St Andrews Events Platform</title>
          <meta name="keywords" content="STEP, St Andrews, Events" />
          <link rel="icon" href="/icon_white.ico" />
        </Head>
  
        <NavbarSignedIn />

        <div className='flex w-full h-full justify-center mt-10'>
          <div className='grid grid-cols-1 place-items-center w-3/4 h-3/4'>
            <p className='text-lg font-semibold'>
              Event succesfully submitted
            </p>

            <p className='text-md font-normal p-2 mb-2'>
              What would you want to do next?
            </p>

            <div className='inline-block text-sm border rounded-full bg-gray-700 hover:bg-gray-500 text-white px-3 py-1 mb-2'>
              <Link href={"/"}>
                <button>
                  Return to front page
                </button>
              </Link>
            </div>
            <div className='inline-block text-sm border rounded-full bg-gray-700 hover:bg-gray-500 text-white px-3 py-1 mb-2'>
              <Link href={"/yourEvents"}>
                <button>
                  See your own events
                </button>
              </Link>
            </div>
          </div>
        </div>
  
        
      </div>
    )
  }

  return (
    <div>
      <Head>
        <title>St Andrews Events Platform</title>
        <meta name="keywords" content="STEP, St Andrews, Events" />
        <link rel="icon" href="/icon_white.ico" />
      </Head>
  
      <NavbarSignedOut />

    </div>
  )
}

export default EventSubmitted