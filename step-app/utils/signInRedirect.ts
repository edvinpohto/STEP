import { signIn } from "next-auth/react"

export default function signInRedirect(undefined: any, callbackUrl: any) {
  signIn(undefined, callbackUrl)
}