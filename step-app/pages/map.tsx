import { useSession, signIn, signOut } from "next-auth/react"
import Navbar from "../components/NavbarSignedIn"

export default function Component() {
  
    return(
        <>
            <Navbar />

            <h1>Map</h1>
        </>
    )
}