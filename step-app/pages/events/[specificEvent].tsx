import type { GetServerSideProps, NextPage } from 'next'
import { getSession, useSession } from "next-auth/react"
import Head from 'next/head'
import NavbarSignedIn from '../../components/Navbars/NavbarSignedIn'
import NavbarSignedOut from '../../components/Navbars/NavbarSignedOut'
import YourEventCards from '../../components/EventCards/YourEventCards'
import { Event } from '../../types/models'
import clientPromise from '../../lib/mongodb'
import PleaseSignIn from '../../components/PleaseSignIn'
import Intro from '../../components/YourEventsIntro'
import { useRouter } from 'next/router'
import EventPageSignedIn from '../../components/EventPages/EventPageSignedIn'
import EventPageSignedOut from '../../components/EventPages/EventPageSignedOut'
import { useEffect, useState } from 'react'
import { ObjectId } from 'mongodb'

const SpecificEvent: NextPage = ({ properties }: any) => {
  const { data: session, status } = useSession();

  // console.log(properties[0].eventName)
  // console.log(properties)
  
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

        <EventPageSignedIn 
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
          <link rel="icon" href="/favicon.ico" />
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
  console.log(context.params.specificEvent)
  const eventId = context.params.specificEvent
  
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