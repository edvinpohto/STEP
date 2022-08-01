describe('Open an event', () => {
  it('Navigates to the feed page', () => {
    cy.visit('/')
    cy.contains('Organiser').click()
    cy.url().should('include', '/events/')
  })
})

export {}