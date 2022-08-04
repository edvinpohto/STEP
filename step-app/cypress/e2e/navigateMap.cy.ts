describe('Navigate the map', () => {
  it('Opens the map page and directs to an event on the page', () => {
    cy.visit('/tests/testMap')
    cy.wait(3000)
    // Open an event
    cy.get('#marker').click()
    // Close an event
    cy.get('.mapboxgl-popup-close-button').click()
    // Open the event again and navigate to it
    cy.get('#marker').click()
    cy.contains('Go to event').click()
   
    cy.contains('Admission')
  })
})

export {}