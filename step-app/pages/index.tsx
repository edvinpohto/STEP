import type { GetServerSideProps, NextPage } from 'next'
import clientPromise from '../lib/mongodb'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { Event } from '../types/models'
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react'

const Home: NextPage = ({ properties }: any) => {
    return (
      <div>
        <Head>
          <title>St Andrews Events Platform</title>
          <meta name="keywords" content="STEP, St Andrews, Events" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Navbar />

        <div className='grid grid-cols-1 place-content-center place-items-center p-5'>
            {properties && properties.map((property: Event) => (
              <div 
              key={property._id} 
              className='border-none rounded-md bg-slate-300 m-2 max-w-sm shadow-md'>
                <div>
                  {/* Real src needs to be a submitted image address */}
                  <img src="https://source.unsplash.com/random/400x100" alt="image" className='rounded-t-md' width={400} height={100} />
                </div>
                
                {/* Here is a heart to click for each box */}
                {/* <div className="relative inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <div className="ml-3 relative">
                      <span className="sr-only">Open user menu</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="red" className="bi bi-heart" viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                      </svg>
                  </div>
                </div> */}

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
