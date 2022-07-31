// Guide from here https://www.lambdatest.com/blog/fill-and-submit-forms-in-cypress/

// When this test is run, the location coordinates are not added for some reason, breaking the map.

import { contains } from "cypress/types/jquery"

describe('Create an event', () => {
  it('Visits the create event page and creates an event', () => {
    cy.visit('/tests/testNewEvent')
    
    cy.get('#eventName').type('TestEvent')
    cy.get('#eventDate').type('2022-12-05T13:55')
    cy.get('#eventLocation').type('12 Freddie Tait Street, St. Andrews, KY16 8HQ, United Kingdom')
    cy.get('#eventOrganiser').type('Edvin Pohto')
    cy.get('#eventTags').type('tag1, tag2')
    cy.get('#eventPrivacy').click()
    cy.get('input[value="student"]').click()
    cy.get('#eventAdmission').type('1')
    cy.get('#eventDuration').type('1')
    cy.get('#eventDescription').type('Lorem Ipsum')

    const filePath='1.jpg'
    cy.get('#eventImage').attachFile(filePath)
    // cy.get('#uploaded-files').contains('1')
    cy.get('#submit').click()
  })
})

export {}