import { getSession } from "next-auth/react"

export async function getUserData() {
  const session = await getSession();
  console.log(session?.user)

  // let data = session?.user

  // fetch('../data/currentUser', {
  //   method: 'POST', // *GET, POST, PUT, DELETE, etc.
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(data) // body data type must match "Content-Type" header
  // })

  // async function postData(url = '../../', data = { session }) {
  //   // Default options are marked with *
  //   const response = await fetch(url, {
  //     method: 'POST', // *GET, POST, PUT, DELETE, etc.
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(data) // body data type must match "Content-Type" header
  //   });
  //   return response.json(); // parses JSON response into native JavaScript objects
  // }
  // postData()
  
  return session
}