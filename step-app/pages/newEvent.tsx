import { useSession } from "next-auth/react"
import type { GetServerSideProps, NextPage } from 'next'
import { NextResponse } from "next/server";
import Head from 'next/head'
import PleaseSignIn from "../components/PleaseSignIn";
import NavbarSignedIn from "../components/Navbars/NavbarSignedIn";
import NavbarSignedOut from "../components/Navbars/NavbarSignedOut";
import EventForm from "../components/EventForm";
import { Spinner } from "flowbite-react";

const NewEvent: NextPage = () => {
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
            <title>Create New Event</title>
            <link rel="icon" href="/icon_white.ico" />
          </Head>

          <NavbarSignedIn />
					<EventForm />

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