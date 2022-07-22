This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

The application uses a MongoDB database, hosted locally during development, for persistent storage.
To start working with the application, MongoDB needs to be configured on your work station.

A guide for setting up MongoDB can be found here: https://www.prisma.io/dataguide/mongodb/setting-up-a-local-mongodb-database

To then set up the dependencies of the project, run npm install in a terminal while in the /step-app folder.

Finally, to run the development server:

```bash
npm run dev
# or
yarn dev
```
while navigated into the /step-app folder.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
