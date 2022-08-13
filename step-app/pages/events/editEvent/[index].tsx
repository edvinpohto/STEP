// Page for editing a given event

import type { GetServerSideProps, NextPage } from 'next'
import { useSession } from "next-auth/react"
import Head from 'next/head'
import NavbarSignedIn from '../../../components/Navbars/NavbarSignedIn'
import NavbarSignedOut from '../../../components/Navbars/NavbarSignedOut'
import clientPromise from '../../../lib/mongodb'
import PleaseSignIn from '../../../components/PleaseSignIn'
import { ObjectId } from 'mongodb'
import EditEventForm from '../../../components/EditEventForm'

const EditEvent: NextPage = ({ properties }: any) => {
  // nextauth session data
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
          <title>St Andrews Events Platform</title>
          <meta name="keywords" content="STEP, St Andrews, Events" />
          <link rel="icon" href="/icon_white.ico" />
        </Head>
  
        <NavbarSignedIn />

        <EditEventForm 
          _id={properties[0]._id} 
          eventId={properties[0]._id}
          eventDescription={properties[0].eventDescription}
          eventName={properties[0].eventName}
          eventDate={properties[0].eventDate}
          eventImage={properties[0].eventImage}
          eventOrganiser={properties[0].eventOrganiser}
          eventLocation={properties[0].eventLocation}
          eventAdmission={properties[0].eventAdmission}
          eventPrivacy={properties[0].eventPrivacy}
          eventTags={properties[0].eventTags} 
          eventDuration={properties[0].eventDuration}/>
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
        {/* if a user gets to the page even when no logged in there is a redirect */}
        <PleaseSignIn />
        
      </div>
  )
}

export async function getServerSideProps(context: GetServerSideProps | any) {
  const eventId = context.params.index
  
  try {
    const client = await clientPromise
    const db = client.db("step")
    const events = await db.collection("events").find(new ObjectId(eventId)).toArray();
    const properties = JSON.parse(JSON.stringify(events));

    return {
      props: { 
        properties: properties,
      },
    }
  } catch (e) {
    console.error(e)
  }
}

export default EditEvent