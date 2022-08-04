// // Guide from here https://www.lambdatest.com/blog/fill-and-submit-forms-in-cypress/

// import { contains } from "cypress/types/jquery"

// describe('Update an event', () => {
//   it('Visits the create event page and creates an event', () => {
//     cy.login();
// 		// Visit a route in order to allow cypress to actually set the cookie
// 		cy.visit("/");
// 		// Wait until the intercepted request is ready
// 		cy.wait("@session");

//     cy.visit('/tests/testYourEvents')

//     cy.get("#editButton").click()
    
//     cy.get('#eventName').clear().type('EditedTestEventId1997')
//     cy.get('#eventDate').clear().type('2022-12-05T13:55')
//     cy.get('#eventLocation').clear().type('12 Freddie Tait Street, St. Andrews, KY16 8HQ, United Kingdom')
//     cy.get('#eventOrganiser').clear().type('Edvin Pohto')
//     cy.get('#eventTags').clear().type('tag1, tag2')
//     cy.get('#eventPrivacy').click()
//     cy.get('input[value="student"]').click()
//     cy.get('#eventAdmission').clear().type('1')
//     cy.get('#eventDuration').clear().type('1')
//     cy.get('#eventDescription').clear().type('Lorem Ipsum')

//     const filePath='1.jpg'
//     cy.get('#eventImage').attachFile(filePath)
//     cy.get('#submit').click()

//     cy.wait(2000)

//     cy.visit('/tests/testYourEvents')
//     cy.contains('EditedTestEventId1997')
//   })
// })

// export {}