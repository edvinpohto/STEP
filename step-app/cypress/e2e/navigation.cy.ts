describe('Navigation', () => {
  it('should navigate through the pages available', () => {
    cy.visit('/')
    cy.visit('/map')
    cy.visit('/about')
    cy.visit('/yourEvents')
    cy.visit('/newEvent')
    cy.visit('/likedEvents')
    cy.visit('/account')
  })
})

export {}