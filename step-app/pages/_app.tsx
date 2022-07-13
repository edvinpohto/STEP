// import { Layout } from '../components/Layout'
import '../styles/globals.css'
import '../styles/mapbox.css';
import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"

function MyApp({ 
  Component, 
  pageProps: {session, ...pageProps},
}: AppProps) {
  return (
    // <Layout>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    // </Layout>
  )
}

export default MyApp
