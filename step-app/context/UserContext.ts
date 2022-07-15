// THIS PAGE IS NOT USED ANYMORE

import { getSession } from 'next-auth/react'
import { createContext } from 'react';

export const UserContext = createContext(getUserID())

export default async function getUserID() {
  const session = await getSession();
  let userID = session?.user.id

  return userID
}