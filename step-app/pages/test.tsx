import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react'
import clientPromise from '../lib/mongodb'
import styles from '../styles/Layout.module.css'
import TestEvents from '../components/Test'

const Test: NextPage = ({ properties }: any, isConnected) => {
  return (
    <div className="grid grid-cols-1 place-content-center place-items-center p-5">
      <Head>
        <title>St Andrews Events Platform</title>
        <meta name="keywords" content="STEP, St Andrews, Events" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div>
          <h1>Welcome to the page</h1>
        </div>

        {isConnected ? (
          <h2 className="subtitle">You are connected to MongoDB</h2>
        ) : (
          <h2 className="subtitle">
            You are NOT connected to MongoDB.
          </h2>
        )}

        <div>
          <TestEvents />
        </div>

        {/* For the old style of events */}
        <div>
          {properties && properties.map((property: { title: any; organiser: any; _id: number }) => (
            <div key={property._id} className={styles.card}>
              <p>{property.title}</p>
              <p>Organised by {property.organiser}</p>
            </div>
          ))}
        </div>

        {/* For the new style of events */}
        <div>
          {properties && properties.map((property: { eventName: any; eventOrganiser: any; _id: number }) => (
            <div key={property._id} className={styles.card}>
              <p>{property.eventName}</p>
              <p>Organised by {property.eventOrganiser}</p>
            </div>
          ))}
        </div>

    </div>
  )
}

export async function getServerSideProps(context: GetServerSideProps) {
  try {
    // DEFAULT
    // await clientPromise

    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    const client = await clientPromise
    const db = client.db("step")

    const events = await db.collection("events").find({}).toArray();

    const properties = JSON.parse(JSON.stringify(events));

    return {
      props: { 
        properties: properties,
        isConnected: true,
      },
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}

export default Test