describe('Search for an event and navigate to it', () => {
  it('Opens the search modal', () => {
    cy.visit('/')
    cy.get('#searchButton').click()
    // cy.get('#eventSearch').type("edvin")
    // cy.contains('Organiser').click()
  })
})

export {}