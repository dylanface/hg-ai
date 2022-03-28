import { useSession, signIn, signOut } from "next-auth/react"
import Loading from "../components/loading";

export default function About(props) {
    
    const { data: session, status } = useSession()

    if (status === "loading") {
        return <Loading />
    }

    return (
        <></>
    )
}