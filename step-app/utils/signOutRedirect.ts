// short util function to redirect a user to sign out

import { signOut } from "next-auth/react"

export default function signOutRedirect(callbackUrl: any) {
  signOut(callbackUrl)
}