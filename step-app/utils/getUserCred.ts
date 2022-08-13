// function to get user creds if needed

import { getSession } from 'next-auth/react'

export default async function getUserCred() {
  const session = await getSession();
  let user = session?.user

  return user
}