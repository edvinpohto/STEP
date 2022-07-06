import { useSession } from "next-auth/react"
import type { GetServerSideProps, NextPage } from 'next'
import { NextResponse } from "next/server";
import Head from 'next/head'
import PleaseSignIn from "../components/PleaseSignIn";
import NavbarSignedIn from "../components/NavbarSignedIn";
import NavbarSignedOut from "../components/NavbarSignedOut";
import EventForm2 from "../components/EventForm2";

const NewEvent: NextPage = () => {
    const { data: session, status } = useSession();
  
    if (status === 'loading') {
      return (
        <>
          <NavbarSignedIn />
          <div className='grid grid-cols-1 place-content-center place-items-center p-5'>
            <h1>Loading...</h1>
          </div>
        </>
      )
    }
  
    if (session) {
      return (
        <div>
          <Head>
            <title>Create New Event</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <NavbarSignedIn />
					<EventForm2 />

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
  
  export default NewEvent