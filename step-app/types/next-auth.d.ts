import NextAuth from "next-auth"
import type { NextComponentType, NextPageContext } from 'next';
// import type { Session } from 'next-auth';
import type { Router } from 'next/router';

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: DefaultUser & {
      id: string;
      email: string,
      address: string
    };
  }
}

// https://github.com/nextauthjs/next-auth/discussions/4165
declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

declare global {
  var MONGODB_URI: string;
}