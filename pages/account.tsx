// Account page

import type { NextPage } from 'next'
import { useSession } from "next-auth/react"
import Head from 'next/head'
import NavbarSignedIn from '../components/Navbars/NavbarSignedIn'
import NavbarSignedOut from '../components/Navbars/NavbarSignedOut'
import Account from '../components/Account'
import PleaseSignIn from '../components/PleaseSignIn'
import { Spinner } from 'flowbite-react'

const AccountPage: NextPage = () => {
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
        <Account />
      </div>
    )
  }

  return (
    <>
      <NavbarSignedOut />
      <PleaseSignIn />
    </>
  )
}

export default AccountPage