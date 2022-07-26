import type { GetServerSideProps, NextPage } from 'next'
import { getSession, useSession } from "next-auth/react"
import Head from 'next/head'
import NavbarSignedIn from '../components/Navbars/NavbarSignedIn'
import NavbarSignedOut from '../components/Navbars/NavbarSignedOut'
import { Event } from '../types/models'
import clientPromise from '../lib/mongodb'
import PleaseSignIn from '../components/PleaseSignIn'
import Intro from '../components/LikedEventsIntro'
import { Spinner } from 'flowbite-react'
import EventCardSignedIn from '../components/EventCards/EventCardSignedIn'

const LikedEvents: NextPage = ({ properties }: any) => {
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
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <NavbarSignedIn />
        <Intro />
  
        <div className='grid p-3 sm:justify-center'>
            {properties && properties.map((property: Event) => (
            <div 
            key={property._id} 
            className='w-full'>
              <EventCardSignedIn 
                eventName={property.eventName}
                eventDate={property.eventDate}
                eventImage={property.eventImage}
                eventOrganiser={property.eventOrganiser}
                eventLocation={property.eventLocation}
                eventAdmission={property.eventAdmission}
                eventLikes={property.eventLikes}
                currentUser={session.user.id} 
                eventId={property._id}/>
            </div>
          ))}
        </div>
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

export async function getServerSideProps(context: GetServerSideProps | any) {
  const session = await getSession(context) //pass context to authenticate create session
  const userID = session?.user.id //get id from session

  try {
    const client = await clientPromise
    const db = client.db("step")
    const events = await db.collection("events").find({ eventLikes: `${userID}` }).toArray();
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

export default LikedEvents