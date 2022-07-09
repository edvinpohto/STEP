import type { GetServerSideProps, NextPage } from 'next'
import { useSession } from "next-auth/react"
import clientPromise from '../lib/mongodb'
import Head from 'next/head'
import NavbarSignedIn from '../components/NavbarSignedIn'
import NavbarSignedOut from '../components/NavbarSignedOut'
import NavbarBottom from '../components/NavbarBottom'

import dynamic from 'next/dynamic';
const Map = dynamic(() => import('../components/Map'), {
  ssr: false
});


const MapPage: NextPage = () => {
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
        <Map />
      </div>
    )
  }

  return (
    <div>
      <Head>
        <title>St Andrews Events Platform</title>
        <meta name="keywords" content="STEP, St Andrews, Events" />
        <link rel="icon" href="/favicon.ico" />
        {/* <link href='https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.css' rel='stylesheet' /> */}
      </Head>
  
      <NavbarSignedOut />
      <Map />
    </div>
  )
}

export default MapPage