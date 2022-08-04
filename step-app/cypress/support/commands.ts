/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import 'cypress-file-upload'

// https://github.com/nextauthjs/next-auth/discussions/2053
Cypress.Commands.add("login", () => {
	cy.intercept("/api/auth/session", { fixture: "session.json" }).as("session");

	// Set the cookie for cypress.
	// It has to be a valid cookie so next-auth can decrypt it and confirm its validity.
	cy.setCookie("next-auth.session-token", "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..CaLUqsxSc_qK1F7N.jXNKNrjlDwgg8tDOVXXTQsbdUe7XjD-RLGC6cbtxAHTArVl3OlCiCKuPGT5-o5sAsYj7OXWGUUTZXy9JGTwWLVFifLTLI-05KAqZm9Y3D_r03gu93E8aX4vkrO31-0NVBMr5-F6obHMrSg96fpU-GBedVkBg0tc-fYZKMsNaVrFpI4MOvkpd1goCRio0PE-CvWN4NzJSAJVDuIEtO7ogdruZdZfoXeBz6XSAy3iiYofjE2uUpIEbRu-3kT5lqZ1o-1nm6mQqZdG9Fa6WIcnsgnTN82uEnlmQFW9ayILl505yjeg2YS3MOlYjBKR5WPCFvClwdlneMgSL51RG69euL1zzzxrkElVpnbjCkQ.x8pt364FFdT__pDkTdXDLQ");
	Cypress.Cookies.preserveOnce("next-auth.session-token");
});

Cypress.Commands.add("loginByGoogleApi", () => {
  cy.log('Logging in to Google')
  
  // The Cypress environmental variables could not be read for some reason so they are
  // now hard coded into the body below.
  cy.request({
    method: 'POST',
    url: 'https://www.googleapis.com/oauth2/v4/token', // the v4 token did not work
    body: {
      grant_type: 'refresh_token',
      // client_id: Cypress.env('googleClientId'),
      client_id: "32448622001-8528co8ol2uq8r1dg9r6erj8qcnk1a89.apps.googleusercontent.com",
      // client_secret: Cypress.env('googleClientSecret'),
      client_secret: "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",
      // refresh_token: Cypress.env('googleRefreshToken'),
      refresh_token: "1//04i2xi9UnFNebCgYIARAAGAQSNwF-L9Ir6GzQ3M3uC6hn6VR_h50yfkJbJSzVqPRdVTp47xVkFnQufQ4Z4gKZk5n0rGG-_5P5_gw",
    },
  }).then(({ body }) => {
    const { access_token, id_token } = body

    cy.request({
      method: 'GET',
      url: 'https://www.googleapis.com/oauth2/v3/userinfo',
      headers: { Authorization: `Bearer ${access_token}` },
    }).then(({ body }) => {
      cy.log(body)
      const userItem = {
        token: id_token,
        user: {
          googleId: body.sub,
          email: body.email,
          givenName: body.given_name,
          familyName: body.family_name,
          imageUrl: body.picture,
        },
      }

      window.localStorage.setItem('googleCypress', JSON.stringify(userItem))
      cy.visit('/')
    })
  })
})

export {}