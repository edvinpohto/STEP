import { defineConfig } from "cypress";

const {GoogleSocialLogin} = require('cypress-social-logins').plugins

export default defineConfig({
  env: {
    googleRefreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },

  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message)
      
          return null
        },
        GoogleSocialLogin: GoogleSocialLogin,
      })
    },
    baseUrl: "http://localhost:3000",
    "chromeWebSecurity": false,
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
