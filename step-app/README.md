![Image](https://step-event-images.s3.eu-west-2.amazonaws.com/whitelogo.png)

Welcome to the St Andrews Events Platform (STEP) project! This project was built by Edvin Pohto as a master's dissertation project at the University of St Andrews. STEP is a local and small-scale events application designed for the local St Andrews community. Below is a guide on how to set up and run the project.

## Prerequisites

In order to run the STEP application on your computer, TypeScript and Node.js need to be installed, and MongoDB needs to be installed and set up to host the database locally. Guides to each installation are found below: 

- Node.js 12.22.0 or later - this is needed to install TypeScript via npm as well. Download and install it by following the guide [`here`](https://nodejs.org/en/download/package-manager/).
- TypeScript (version 4.7.3 used for development) - you can install it by running `npm install typescript --save-dev` in your terminal, or by following the guide [`here`](https://www.typescriptlang.org/download).
- MongoDB Community Edition (version 4.7.0 used for development) - a guide for this process can be found [`here`](https://www.mongodb.com/docs/manual/administration/install-community/) (choose your operating system and follow the guide).

With the prerequisites installed, you need to make sure that the local environmental variables are filled in correctly. The submitted `.env.local` file should include everything needed but this is good to double check. During development, the used MongoDB database name was `step`, which is also what the pre-filled `.env.local` file is configured to. For everything to work correctly, make sure the `MONGODB_DB` variable is set to the correct database name, and that `MONGODB_URI` is also correct. The default for this is `MONGODB_URI=mongodb://localhost:27017/step`. If you acquired this project via GitHub, the `.env.local` file will not exist and you will have to fill in and add the following template to your root folder:

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=

SECRET=

FACEBOOK_ID=
FACEBOOK_SECRET=

GITHUB_ID=
GITHUB_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REFRESH_TOKEN=

MONGODB_URI=
MONGODB_DB=

NODE_ENV=development

NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN=

S3_ACCESS_KEY=
S3_SECRET_KEY=
S3_BUCKET_NAME=
```

Next, the relevant dependencies need to be installed. Open a new terminal session in the project folder (`./step-app/`). Once in the project folder, run `npm install`. 

To make the application truly functional, data is needed. To import data into the MongoDB database, MongoDB's Database Tool `mongoimport` is used. If your operating system is MacOS or Linux, there is a high likelihood you already have the MongoDB Database Tools installed. If not, however, or if you are a Windows user, the guide to installing the tools can be found [here](https://www.mongodb.com/docs/database-tools/installation/installation-windows/). Now, using a your terminal and in the `./step-app/` project directory, run `mongoimport --db=step --collection=events --file=data/events.json`. This command assumes your default port being 27017. It creates a new database by the name of `step`, a new collection by the name of `events` and populates it with data from the `data/events.json` file. If more guidance is needed, it can be found [here](https://www.mongodb.com/docs/database-tools/mongoimport/).

You are now ready to run the project. To first build the project, run `npm run build` in the `./step-app/` folder. To then start the built project server run `npm run start`. Now navigate to `http://localhost:3000` to start browsing the project. If you want to run the development server, you can instead simply run `npm run dev` and navigate to `http://localhost:3000` again.

Finally, in order to run the testing program Cypress, you need to start the development server with `npm run dev` from the `./step-app/` folder and leave that running. Open up a new terminal session in the same folder and run `npm run cypress`. Cypress now opens up and you can head over to End-2-End testing and run any of the tests. There is one thing that may or may not have to be updated for some of the tests to work properly. In the `step-app\cypress\support\commands.ts` file, on line 14, there is a `next-auth.session-token` that needs to be valid from one's browser session. This token was set to a functioning one during development, but it may have to be updated. If this is the case, a valid session token can be found in one's browser, as shown below.

![Image](https://user-images.githubusercontent.com/1148334/129594225-ed905897-f3bd-4137-a71d-f452f4b87e1c.png)


