import type { NextPage } from 'next'
import Head from 'next/head'
import NavbarSignedOut from "../../components/Navbars/NavbarSignedOut";
import EventForm from "../../testHelpers/testComponents/TestEventForm";

const NewEvent: NextPage = () => {
  
  return (
    <div>
      <Head>
        <title>Create New Event</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavbarSignedOut />
      <EventForm />

    </div>
  )
}
  
  export default NewEvent