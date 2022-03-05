import HGNavabar from '../components/navbar'
import '../styles/globals.css'
var cookie = require('cookie');
import { useState, useEffect } from "react";
import App from 'next/app'
export default function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  if (pageProps.user?.sub != null && user == null) {
    setUser(pageProps.user);
  }

  
  return (
    <>
    <HGNavabar {...pageProps} />
    <Component {...pageProps} />
    </>
  )
}

MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext)
  const req = appContext.ctx.req;
  const lookAt = req.headers.cookie || ' ';

  var cookies = cookie.parse(lookAt);
  if (cookies.user != null) {
    appProps.pageProps.user = JSON.parse(cookies.user);
  }

  return {
    pageProps: {
      ...appProps.pageProps,
    },
  }
}