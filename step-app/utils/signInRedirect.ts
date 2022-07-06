import { signIn } from "next-auth/react"

export default function signInRedirect() {
  signIn()
}