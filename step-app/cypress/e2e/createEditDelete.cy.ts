// Guide from here https://www.lambdatest.com/blog/fill-and-submit-forms-in-cypress/

describe('Create an event', () => {
  it('Visits the create event page and creates an event', () => {
    cy.visit('/tests/testNewEvent')

    // Create the event
    cy.get('#eventName').type('TestEventId1997')
    cy.get('#eventDate').type('2022-08-05T13:55')
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
    cy.get('#submit').click()

    cy.wait(2000)

    // Finaly check if the new event is included on our events page.
    cy.visit('/tests/testYourEvents')
    cy.contains('TestEventId1997')
  })
})

describe('Update an event', () => {
  it('Visits the edit event page and edits an event', () => {
    cy.login();
		// Visit a route in order to allow cypress to actually set the cookie
		cy.visit("/");
		// Wait until the intercepted request is ready
		cy.wait("@session");

    cy.visit('/tests/testYourEvents')

    cy.get("#editButton").click()
    
    cy.get('#eventName').clear().type('EditedTestEventId1997')
    cy.get('#eventDate').clear().type('2022-12-05T13:55')
    cy.get('#eventLocation').clear().type('12 Freddie Tait Street, St. Andrews, KY16 8HQ, United Kingdom')
    cy.get('#eventOrganiser').clear().type('Edvin Pohto')
    cy.get('#eventTags').clear().type('tag1, tag2')
    cy.get('#eventPrivacy').click()
    cy.get('input[value="student"]').click()
    cy.get('#eventAdmission').clear().type('1')
    cy.get('#eventDuration').clear().type('1')
    cy.get('#eventDescription').clear().type('Lorem Ipsum')

    const filePath='1.jpg'
    cy.get('#eventImage').attachFile(filePath)
    cy.get('#submit').click()

    cy.wait(2000)

    // Check whether the event has been updated and that the old event is gone
    cy.visit('/tests/testYourEvents')
    cy.contains('EditedTestEventId1997')
  })
})

describe('Delete an event', () => {
  it('Visits the delete event page and deletes the test event', () => {
    cy.login();
		// Visit a route in order to allow cypress to actually set the cookie
		cy.visit("/");
		// Wait until the intercepted request is ready
		cy.wait("@session");

    cy.visit('/tests/testYourEvents')

    cy.get("#deleteButton").click()

    cy.wait(500)
    
    // Checks whether the event exists anymore
    cy.contains('EditedTestEventId1997').should('not.exist')
  })
})

export {}