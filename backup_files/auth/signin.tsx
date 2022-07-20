// import { getProviders, signIn } from "next-auth/react"

// interface Providers {
//   providers: string,
// }

// interface Provider {
//   name: string,
//   id: string,
// }

// export default function SignIn({ providers }: any) {
//   return (
//     <>
//       {Object.values(providers).map((provider: any) => (
//         <div 
//         className="grid h-full w-full grid-cols-1 place-items-center"
//         key={provider.name}>
//           <div 
//           className="h-20 w-52 grid grid-cols-1 content-center bg-teal-200 rounded-md hover:bg-teal-100"
//           key={provider.name}>
//             <button 
//             className=""
//             id={provider.name} 
//             onClick={() => signIn(provider.id)}>
//               Sign in with {provider.name}
//             </button>
//           </div>
//         </div>
//       ))}
//     </>
//   )
// }

// export async function getServerSideProps(context: any) {
//   const providers = await getProviders()
//   return {
//     props: { providers },
//   }
// }