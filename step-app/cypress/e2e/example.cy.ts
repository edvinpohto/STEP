// Kitchen Sink Example test
  // This is an example app used to showcase Cypress.io testing. For a full reference of our documentation, go to docs.cypress.io
  // REFER TO THIS APP FOR CY COMMANDS AND METHODS

// A solid test generally covers 3 phases:
  // 1. Set up the application state.
  // 2. Take an action.
  // 3. Make an assertion about the resulting application state.

// Here, we'll take a narrow view of these steps and map them cleanly to Cypress commands:
    // 1. Visit a web page.
    // 2. Query for an element.
    // 3. Interact with that element.
    // 4. Assert about the content on the page.

describe('My First Test', () => {
  it('Visits the Kitchen Sink', () => {
    // cy.visits visits a specific webpage
    cy.visit('https://example.cypress.io')

    // cy.contains looks through the page and tries to find an element
    // .click simulates clicking an event
    cy.contains('type').click()

    // Should be on a new URL which
    // includes '/commands/actions'
    cy.url().should('include', '/commands/actions')

    // Get an input, type into it and verify
    // that the value has been updated
    cy.get('.action-email')
      .type('fake@email.com')
      .should('have.value', 'fake@email.com')
  })
})

export {};