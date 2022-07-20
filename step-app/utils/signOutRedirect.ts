import { signOut } from "next-auth/react"

export default function signOutRedirect(callbackUrl: any) {
  signOut(callbackUrl)
}