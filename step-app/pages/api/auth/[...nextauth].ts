import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"

export default NextAuth({

  adapter: MongoDBAdapter(clientPromise),
  // Configure one or more authentication providers
  providers: [
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
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {

        // https://stackoverflow.com/questions/70400008/using-mongodb-adapter-in-nextauth-not-working
        // const { email, password } = credentials

        // if(email !== 'test@test.com' || password !== 'password123') {
        //   throw new Error('User does not exists. Please make sure you insert the correct email & password.')
        // }

        // return {
        //   id: 1,
        //   name: 'Tester',
        //   email: 'test@test.com'
        // }


        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const res: any = await fetch("../../../../model_user.json", {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        })
        const user: any = await res.json()
  
        // If no error and we have user data, return it
        if (res.ok && user) {
          return user
        }
        // Return null if user data could not be retrieved
        return null
      }
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
    // first time jwt callback is run, user object is available
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id
      }

      return token
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id
      }

      return session
    },
    // redirect: async ({ url, baseUrl }) => {
    //   return baseUrl
    // }
  },
  
  jwt: {
    secret: process.env.SECRET,
    // encryption: true,
  },

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