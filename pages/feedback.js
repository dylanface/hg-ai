import { useSession, signIn, signOut } from "next-auth/react"

export default function Feedback(props) {

    const { data: session, status } = useSession()

    if (status === "loading") {
        return <div>Loading...</div>
    }

    return (
        <></>
    )
}

