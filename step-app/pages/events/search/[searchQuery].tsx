import { GetServerSideProps, NextPage } from 'next'
import { useSession } from 'next-auth/react';
import { Head } from 'next/document';
import { useRouter } from 'next/router'
import YourEventCards from '../../../components/EventCards/YourEventCards';
import Intro from '../../../components/LikedEventsIntro';
import { Event } from '../../../types/models'
import NavbarSignedIn from '../../../components/Navbars/NavbarSignedIn';
import NavbarSignedOut from '../../../components/Navbars/NavbarSignedOut';
import PleaseSignIn from '../../../components/PleaseSignIn';
import clientPromise from '../../../lib/mongodb';
import { useEffect, useState } from 'react';

const SearchResults: NextPage = () => {
  const { data: session, status } = useSession();

  const router = useRouter()
  const { searchQuery } = router.query 
  console.log(searchQuery)
  
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
  
        <NavbarSignedIn />
        <Intro />

        <p> Here is the query parameter: {searchQuery} </p>
  
        {/* <div className='grid p-3 sm:justify-center'>
          {data && data.map((property: Event) => (
            <div 
            key={property._id} 
            className='w-full'>
              <YourEventCards 
              eventName={property.eventName}
              eventDate={property.eventDate}
              eventImage={property.eventImage}
              eventOrganiser={property.eventOrganiser}
              eventLocation={property.eventLocation}
              eventAdmission={property.eventAdmission}
              eventLikes={property.eventLikes}
              currentUser={session.user.id}/>
            </div>
          ))}
        </div> */}
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

export default SearchResults