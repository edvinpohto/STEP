import type { GetServerSideProps, NextPage } from 'next'
import { useSession } from "next-auth/react"
import clientPromise from '../lib/mongodb'
import Head from 'next/head'
import NavbarSignedIn from '../components/NavbarSignedIn'
import NavbarSignedOut from '../components/NavbarSignedOut'
import NavbarBottom from '../components/NavbarBottom'
import EventCardSignedIn from '../components/EventCardSignedIn'
import EventCardSignedOut from '../components/EventCardSignedOut'
import { Event } from '../types/models'
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, useEffect, useRef } from 'react'

import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map: NextPage = () => {
  const { data: session, status } = useSession();

  const Map = ReactMapboxGl({
    accessToken:
      'pk.eyJ1IjoiZWR2aW5wb2h0byIsImEiOiJjbDVheHk4MWIwMmFjM2VwN29ldGNsdWgwIn0.swu4jAZ9oQg45YtQxuLbVA'
  });
  
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
          {/* <link
            href="https://api.mapbox.com/mapbox-gl-js/v1.10.1/mapbox-gl.css"
            rel="stylesheet"
          /> */}
        </Head>
  
        <NavbarSignedIn />

        <Map
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: '100vh',
            width: '100vw'
          }}
        >
          <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
            <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
          </Layer>
        </Map>;
  
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
  
    </div>
  )
}

export default Map