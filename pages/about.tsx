// About page

import { Spinner } from 'flowbite-react';
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react';
import Head from 'next/head'
import NavbarSignedIn from '../components/Navbars/NavbarSignedIn';
import NavbarSignedOut from '../components/Navbars/NavbarSignedOut'

const About: NextPage = () => {
	const { data: session, status } = useSession();
  
  if (status === 'loading') {
    return (
      <>
        <NavbarSignedIn />
        <div className="text-center grid grid-cols-1 place-content-center place-items-center p-5">
          <Spinner aria-label="Center-aligned spinner example" />
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
          <link rel="icon" href="/icon_white.ico" />
        </Head>
        <NavbarSignedIn />
				<div className='flex justify-center'>
					<div className='max-w-3xl grid grid-cols-1 justify-items-center mt-5 px-8'>
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
      </div>
    )
  }

  return (
    <div>
      <Head>
        <title>St Andrews Events Platform</title>
        <meta name="keywords" content="STEP, St Andrews, Events" />
        <link rel="icon" href="/icon_white.ico" />
      </Head>
      <NavbarSignedOut />
			<div>
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
    </div>
	)
}

export default About