import type { GetServerSideProps, NextPage } from 'next'
import { getSession, useSession } from "next-auth/react"
import Head from 'next/head'
import NavbarSignedIn from '../components/NavbarSignedIn'
import NavbarSignedOut from '../components/NavbarSignedOut'
import EventCardSignedIn from '../components/EventCardSignedIn'
import EventCardSignedOut from '../components/EventCardSignedOut'
import { Event } from '../types/models'
import { useEffect, useState } from 'react'

interface CurrentUser {
  name: string;
  email: string;
	image: string;
	id: string;
}

const YourEvents: NextPage = () => {
  const { data: session, status } = useSession();

	const [data, setData] = useState<any[]>([])
  const [isLoading, setLoading] = useState(false)

	useEffect(() => {
    setLoading(true)
    fetch('/api/yourEvents')
      .then((res) => res.json())
      .then((data) => {
        setData(data.events)
        setLoading(false)
      })
  }, [])
  
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

        <h1>Welcome to your events</h1>
  
        <div className='grid p-3 sm:justify-center'>
            {data && data.map((property: Event) => (
            <div 
            key={property._id} 
            className='w-full'>
              <EventCardSignedIn 
              eventName={property.eventName}
              eventDate={property.eventDate}
              eventImage={property.eventImage}
              eventOrganiser={property.eventOrganiser}
              eventLocation={property.eventLocation}
              eventAdmission={property.eventAdmission}/>
            </div>
          ))}
        </div>

        {/* <NavbarBottom /> */}
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
        {data && data.map((property: Event) => (
          <div 
          key={property._id} 
          className='w-full'>
            <EventCardSignedOut 
            eventName={property.eventName}
            eventDate={property.eventDate}
            eventImage={property.eventImage}
            eventOrganiser={property.eventOrganiser}
            eventLocation={property.eventLocation}
            eventAdmission={property.eventAdmission}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default YourEvents