import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react'
import { connectToDatabase } from '../lib/mongodb'
import styles from '../styles/Layout.module.css'

const Home: NextPage = ({ properties }: any) => {

  console.log(properties)

  return (
    <div className={styles.container}>
      <Head>
        <title>St Andrews Events Platform</title>
        <meta name="keywords" content="STEP, St Andrews, Events" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div>
          <h1>Welcome to the page</h1>
        </div>

        <div>
          {properties && properties.map((property: { title: any; organiser: any; _id: number }) => (
            <div key={property._id} className={styles.card}>
              <p>{property.title}</p>
              <p>Organised by {property.organiser}</p>
            </div>
          ))}
        </div>

    </div>
  )
}

export async function getServerSideProps(context:GetServerSideProps) {
  const { db } = await connectToDatabase()

  const events = await db.collection("events").find({}).toArray();

  const properties = JSON.parse(JSON.stringify(events));

  return {
    props: { properties: properties },
  }
}

export default Home
