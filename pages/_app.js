import HGNavabar from '../components/navbar'
import '../styles/globals.css'

import { SessionProvider } from "next-auth/react"

export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {

  
  return (
    <SessionProvider session={session}>
      <HGNavabar {...pageProps} />
      <Component {...pageProps} />
      <style jsx global>{`body {background: #334155}`}</style>
    </SessionProvider>
  )
}


// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext)
//   const req = appContext.ctx.req;
//   const lookAt = req.headers.cookie || ' ';

//   var cookies = cookie.parse(lookAt);

//   if (cookies['user'] != null) {
//     const parsedCookie = JSON.parse(cookies['user']);

//     const userRequest = {
//       modelName: "User",
//       query: {
//         googleId: parsedCookie.sub,
//       },
//       action: "fetch",
//     };

//     const transRequest = {
//       modelName: "Transaction",
//       query: {
//         userId: parsedCookie.sub,
//       },
//       action: "fetch",
//     };

//     await axios.post('http://localhost:3000/api/request_mongo', userRequest)
//     .then(async (response) => {
//       if (response.data.length > 0) {
//         appProps.pageProps.user = response.data[0];
//         appProps.pageProps.user.picture = parsedCookie.picture;

//         await axios.post('http://localhost:3000/api/request_mongo', transRequest)
//         .then((response) => {
//           if (response.data.length > 0) {
//             appProps.pageProps.user.transactions = response.data;
//             appProps.pageProps.user.transactions.forEach((transaction) => {
//               appProps.pageProps.user.transactionIds.push(transaction._id);
//             });
//           }
//         }).catch(console.error);

//       }

//     }).catch(console.error);

//   } else {
//     appProps.pageProps.user = null;
//   }

//   return {
//     pageProps: {
//       ...appProps.pageProps,
//     },
//     revalidate: 1
//   }
// }