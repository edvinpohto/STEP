import NextAuth, { NextAuthOptions } from "next-auth"
import clientPromise from "../../../lib/mongodb"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
// import { OAuthConfig } from "next-auth/providers";
// import CredentialsProvider from "next-auth/providers/credentials"

export default NextAuth({

  adapter: MongoDBAdapter(clientPromise),
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      // profile(profile) {
      //   console.log(profile)
      //   return {
      //     // Return all the profile information you need.
      //     // The only truly required field is `id`
      //     // to be able identify the account when added to a database
      //   }
      // }
    }),
  ],

  // Database optional. MySQL, Maria DB, Postgres and MongoDB are supported.
  // https://next-auth.js.org/configuration/databases
  //
  // Notes:
  // * You must install an appropriate node_module for your database
  // * The Email provider requires a database (OAuth providers do not)
  // database: process.env.DATABASE_URL,

  // The secret should be set to a reasonably long random string.
  // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
  // a separate secret is defined explicitly for encrypting the JWT.
  secret: process.env.SECRET,

  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  
  // jwt: {
  //   secret: process.env.SECRET,
  //   // encryption: true,
  // },

  // pages: {
  //   signIn: 'api/auth/signin', // Displays signin buttons
  //   // signOut: '/auth/signout', // Displays form with sign out button
  //   // error: '/auth/error', // Error code passed in query string as ?error=
  //   // verifyRequest: '/verify-request', // Used for check email page
  //   // newUser: '/account/welcome', // If set, new users will be directed here on first sign in
  // },

  theme: {
    colorScheme: "light", // "auto" | "dark" | "light"
    brandColor: "#3C6562", // Hex color code
    logo: "https://seeklogo.com/images/U/university-of-st-andrews-seal-logo-CCC7DF3F6B-seeklogo.com.png" // Absolute URL to image
  }
})


// NEXTAUTH DISCOURAGES THE USE OF CREDENTIALS PROVIDER SO WE WILL NOT USE IT THEN
// CredentialsProvider({
//   // The name to display on the sign in form (e.g. 'Sign in with...')
//   name: 'Credentials',
//   // The credentials is used to generate a suitable form on the sign in page.
//   // You can specify whatever fields you are expecting to be submitted.
//   // e.g. domain, username, password, 2FA token, etc.
//   // You can pass any HTML attribute to the <input> tag through the object.
//   credentials: {
//     username: { label: "Email", type: "email", placeholder: "jsmith" },
//     password: {  label: "Password", type: "password" }
//   },
//   async authorize(credentials, req) {
//     // You need to provide your own logic here that takes the credentials
//     // submitted and returns either a object representing a user or value
//     // that is false/null if the credentials are invalid.
//     // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
//     // You can also use the `req` object to obtain additional parameters
//     // (i.e., the request IP address)

//     // Test credentials for now
//     const user = { id: 1, name: "J Smith", email: "jsmith@example.com", password: "test" }

//     // const res: any = await fetch("../../../model_user.json", {
//     //   method: 'POST',
//     //   body: JSON.stringify(credentials),
//     //   headers: { "Content-Type": "application/json" }
//     // })
//     // const user: any = await res.json()
    
//     // if (res.ok && user) if using fetch function
//     if (user) {
//       // Any object returned will be saved in `user` property of the JWT
//       return user
//     } else {
//       // If you return null then an error will be displayed advising the user to check their details.
//       return null
//       // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
//     }
//   }
// }),