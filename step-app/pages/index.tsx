import type { GetServerSideProps, NextPage } from 'next'
import { useSession } from "next-auth/react"
import clientPromise from '../lib/mongodb'
import Head from 'next/head'
import NavbarSignedIn from '../components/NavbarSignedIn'
import NavbarSignedOut from '../components/NavbarSignedOut'
import LikeButtonSignedIn from '../components/LikeButtonSignedIn'
import LikeButtonSignedOut from '../components/LikeButtonSignedOut'
import EventCard from '../components/EventCard'
import { Event } from '../types/models'
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react'

const Home: NextPage = ({ properties }: any) => {
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
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <NavbarSignedIn />
        <EventCard />
  
        <div className='grid grid-cols-1 place-content-center place-items-center p-5'>
            {properties && properties.map((property: Event) => (
              <div 
              key={property._id} 
              className='border-none rounded-md bg-slate-300 m-2 max-w-sm shadow-md'>
                <div>
                  {/* Real src needs to be a submitted image address */}
                  <img src="https://source.unsplash.com/random/400x100" alt="image" className='rounded-t-md' width={400} height={100} />
                </div>
  
                <LikeButtonSignedIn />
  
                <div className='p-2.5'>
                  <p className='text-lg'>{property.eventName}</p>
                  <p className='text-sm'>Date: {property.eventDate}</p>
                  <p className='text-sm'>Location: </p>
                  <p className='text-sm'>Organised by {property.eventOrganiser}</p>
                  {/* THE BELOW COMMENTED OUT SECTIONS NEED TO BE DISPLAYED ON THE EVENT PAGE INSTEAD */}
                  {/* <div className='text-sm'>
                    <p>Description: {property.eventDescription}</p> 
                  </div> */}
                  {/* <p>Tags: {property.eventTags}</p> */}
                  {/* <p>Admission: £{property.eventAdmission}</p> */}
                  {/* <p>Duration: {property.eventDuration}h</p> */}
                  {/* <p>Private: {property.eventPrivacy}</p> */}
                </div>
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
  
      <div className='grid grid-cols-1 place-content-center place-items-center p-5'>
        {properties && properties.map((property: Event) => (
          <div 
            key={property._id} 
            className='border-none rounded-md bg-slate-300 m-2 max-w-sm shadow-md'>
              <div>
                {/* Real src needs to be a submitted image address */}
                <img src="https://source.unsplash.com/random/400x100" alt="image" className='rounded-t-md' width={400} height={100} />
              </div>
  
              <LikeButtonSignedOut />
  
              <div className='p-2.5'>
                <p className='text-lg'>{property.eventName}</p>
                <p className='text-sm'>Date: {property.eventDate}</p>
                <p className='text-sm'>Location: </p>
                <p className='text-sm'>Organised by {property.eventOrganiser}</p>
                {/* THE BELOW COMMENTED OUT SECTIONS NEED TO BE DISPLAYED ON THE EVENT PAGE INSTEAD */}
                {/* <div className='text-sm'>
                  <p>Description: {property.eventDescription}</p> 
                </div> */}
                {/* <p>Tags: {property.eventTags}</p> */}
                {/* <p>Admission: £{property.eventAdmission}</p> */}
                {/* <p>Duration: {property.eventDuration}h</p> */}
                {/* <p>Private: {property.eventPrivacy}</p> */}
              </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSideProps) {
  try {
    const client = await clientPromise
    const db = client.db("step")

    const events = await db.collection("events").find({}).toArray();

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
