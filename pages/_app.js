import HGNavabar from '../components/navbar'
import '../styles/globals.css'

import { SessionProvider } from "next-auth/react"

export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {

  
  return (
    <SessionProvider session={session}>
      <HGNavabar {...pageProps} />
      <Component {...pageProps} />
      <style jsx global>{`body {background: #0F172A}`}</style>
    </SessionProvider>
  )
}