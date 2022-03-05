import GoogleButton from "../components/GoogleButton";

export async function getStaticProps(context) {
    const googleClientKey = process.env.GOOGLE_AUTH_CLIENT_ID;
  
    return {
      props: {googleClientKey}
    }
}

export default function SignIn(props) {

    return (
        <GoogleButton googleClientKey={props.googleClientKey} />
    )
}