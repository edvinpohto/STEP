import { getSession } from 'next-auth/react'

export default async function getUserCred() {
  const session = await getSession();
  let user = session?.user
  // console.log(user.image)

  return user
}