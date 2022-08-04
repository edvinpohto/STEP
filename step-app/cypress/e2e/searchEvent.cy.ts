describe('Search for an event and navigate to it', () => {
  it('Opens the search modal and searches for an event', () => {
    cy.visit('/')
    cy.wait(1000)
    cy.get('#searchButton').click()
    cy.get('#eventSearch').type('Edvin')
    cy.wait(1000)
    cy.get('#searchedEvent').click()

    cy.contains('Admission')
  })
})

export {}