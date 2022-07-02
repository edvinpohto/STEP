import { getSession } from "next-auth/react"

export async function getUserData() {
  const session  = await getSession()
  console.log(session)

}