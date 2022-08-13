// Test for opening a given event
// Tests whether the link navigated to is in fact an events page

describe('Open an event', () => {
  it('Navigates to the feed page', () => {
    cy.visit('/')
    cy.contains('Organiser').click()
    cy.url().should('include', '/events/')
  })
})

export {}