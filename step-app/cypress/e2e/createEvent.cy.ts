// describe('Create an event', () => {

//   before(() => {
//     cy.log(`Visiting /newEvent`)
//     cy.visit("/")
//   })

//   it("Login with Google", () => {
//     const username = Cypress.env("GOOGLE_USER")
//     const password = Cypress.env("GOOGLE_PW")
//     const loginUrl = Cypress.env("SITE_NAME")
//     const cookieName = Cypress.env("COOKIE_NAME")
//     const socialLoginOptions = {
//       username,
//       password,
//       loginUrl,
//       headless: true,
//       logs: false,
//       isPopup: true,
//       // loginSelector: 'a[href="api/auth/signin/google"]',
//       loginSelector: `a[href="${Cypress.env(
//         "SITE_NAME"
//       )}/google"]`,
//       postLoginSelector: "#eventName",
//     }

//     return cy
//       // .visit("/api/auth/signin/google")
//       .task("GoogleSocialLogin", socialLoginOptions)
//       .then(({ cookies }: any) => {
//         cy.clearCookies()

//         const cookie = cookies
//           .filter((cookie) => cookie.name === cookieName)
//           .pop()
//         if (cookie) {
//           cy.setCookie(cookie.name, cookie.value, {
//             domain: cookie.domain,
//             expiry: cookie.expires,
//             httpOnly: cookie.httpOnly,
//             path: cookie.path,
//             secure: cookie.secure,
//           })

//           Cypress.Cookies.defaults({
//             preserve: cookieName,
//           })

//           // remove the two lines below if you need to stay logged in
//           // for your remaining tests
//           // cy.visit("/api/auth/signout")
//           // cy.get("form").submit()
//         }
//       })
//   })

//   // it('Visits the create event page', () => {
//   //   cy.visit('/newEvent')
//   //   // cy.get('#signInButton').click()
    


//   //   cy.get('#eventName').type('TestEvent')
//   //   cy.get('#eventDate').type('2022-12-05T13:55')
//   //   cy.get('#eventLocation').type('12 Freddie Tait Street, St. Andrews, KY16 8HQ, United Kingdom')
//   //   cy.get('#eventDescription').type('Lorem Ipsum')
//   //   cy.get('#eventImage').type('https://step-event-images.s3.eu-west-2.amazonaws.com/1.jpg')
//   //   cy.get('#eventOrganiser').type('Edvin Pohto')
//   //   cy.get('#eventTags').type('tag1, tag2')
//   //   cy.get('#eventPrivacy').check
//   //   cy.get('#eventAdmission').type('1')
//   //   cy.get('#eventDuration').type('1')
//   // })
// })

export {}