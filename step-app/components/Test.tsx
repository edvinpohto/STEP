import { useSession, signIn, signOut } from "next-auth/react"

export default function TestEvents() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        This is an event. <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      You need to sign in to see an event. <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}