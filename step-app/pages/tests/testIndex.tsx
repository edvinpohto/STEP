import type { GetServerSideProps, NextPage } from 'next'
import { useSession } from "next-auth/react"
import clientPromise from '../../lib/mongodb'
import Head from 'next/head'
import NavbarSignedIn from '../../components/Navbars/NavbarSignedIn'
import NavbarSignedOut from '../../components/Navbars/NavbarSignedOut'
import EventCardSignedIn from '../../components/EventCards/EventCardSignedIn'
import EventCardSignedOut from '../../components/EventCards/EventCardSignedOut'
import { Event } from '../../types/models'
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react'
import { Spinner } from 'flowbite-react'

const Home: NextPage = ({ properties }: any) => {
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
  
        <div className='grid p-2 sm:justify-center'>
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
    <div>
      <Head>
        <title>St Andrews Events Platform</title>
        <meta name="keywords" content="STEP, St Andrews, Events" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
  
      <NavbarSignedOut />
  
      <div className='grid p-3 sm:justify-center'>
        {properties && properties.map((property: Event) => (
          <div 
          key={property._id} 
          className='w-full'>
            <EventCardSignedOut 
              eventName={property.eventName}
              eventDate={property.eventDate}
              eventImage={property.eventImage}
              eventOrganiser={property.eventOrganiser}
              eventLocation={property.eventLocation}
              eventAdmission={property.eventAdmission}
              eventLikes={property.eventLikes} 
              currentUser={''}
              eventId={property._id}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSideProps) {
  var todaysDate = new Date(Date.now()).toISOString()
  console.log(todaysDate)

  try {
    const client = await clientPromise
    const db = client.db("step")
    const events = await db.collection("events").find({
      eventDate: { $gt: todaysDate }
    }).sort({ eventDate: 1 }).toArray();
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

export default Home