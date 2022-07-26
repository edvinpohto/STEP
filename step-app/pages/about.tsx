import type { NextPage } from 'next'
import Head from 'next/head'
import NavbarSignedOut from '../components/Navbars/NavbarSignedOut'

const Home: NextPage = () => {

  return (
    <div>
      <Head>
        <title>St Andrews Events Platform</title>
        <meta name="keywords" content="STEP, St Andrews, Events" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
  
      <NavbarSignedOut />

			<div className='grid grid-cols-1 place-content-center mt-5'>
				<h5 className='text-lg font-bold text-center'>Welcome to the St Andrews Events Platform, STEP</h5>
				<p className='text-sm text-center mt-2 p-4'>
					This is a platform designed and built by Edvin Pohto as a part of his master's dissertation project
					at the University of St Andrews in the summer of 2022.
				</p>
				<p className='text-sm text-center p-4'>
					The purpose of the application is to enhance the community in St Andrews through an approachable and local application
					for events around town.
				</p>
			</div>
    
    </div>
  )
}

export default Home