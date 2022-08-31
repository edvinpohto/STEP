// Page for testing opening a specific event

import type { GetServerSideProps, NextPage } from 'next'
import { useSession } from "next-auth/react"
import Head from 'next/head'
import NavbarSignedIn from '../../../components/Navbars/NavbarSignedIn'
import NavbarSignedOut from '../../../components/Navbars/NavbarSignedOut'
import clientPromise from '../../../lib/mongodb'
import EventPageSignedOut from '../../../components/EventPages/EventPageSignedOut'
import { ObjectId } from 'mongodb'
import TestEventPageSignedIn from '../../../testHelpers/testComponents/TestEventPageSignedIn'

const SpecificEvent: NextPage = ({ properties }: any) => {
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

        <TestEventPageSignedIn 
          eventId={properties[0]._id}
          _id={properties[0]._id} 
          eventDescription={properties[0].eventDescription}
          eventName={properties[0].eventName}
          eventDate={properties[0].eventDate}
          eventImage={properties[0].eventImage}
          eventOrganiser={properties[0].eventOrganiser}
          eventLocation={properties[0].eventLocation}
          eventAdmission={properties[0].eventAdmission}
          eventPrivacy={properties[0].eventPrivacy}
          eventLikes={properties[0].eventLikes}
          eventTags={properties[0].eventTags} 
          eventDuration={properties[0].eventDuration}
          currentUser={session.user.id}/>

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

        <EventPageSignedOut 
          eventId={properties[0]._id}
          _id={properties[0]._id} 
          eventDescription={properties[0].eventDescription}
          eventName={properties[0].eventName}
          eventDate={properties[0].eventDate}
          eventImage={properties[0].eventImage}
          eventOrganiser={properties[0].eventOrganiser}
          eventLocation={properties[0].eventLocation}
          eventAdmission={properties[0].eventAdmission}
          eventPrivacy={properties[0].eventPrivacy}
          eventLikes={properties[0].eventLikes}
          eventTags={properties[0].eventTags} 
          eventDuration={properties[0].eventDuration}
          currentUser={""}/>

      </div>
  )
}

export async function getServerSideProps(context: GetServerSideProps | any) {
  // console.log(context.params.testSpecificEvent)
  const eventId = context.params.testSpecificEvent
  
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

export default SpecificEvent