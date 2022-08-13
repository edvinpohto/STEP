// Test fot overall navigation around the site

describe('Navigation', () => {
  it('should navigate through the pages available', () => {
    cy.visit('/')
    cy.visit('/map')
    cy.visit('/about')
    cy.visit('/account')
    cy.visit('/yourEvents')
    cy.visit('/likedEvents')
    cy.visit('/newEvent')
    cy.visit('/')
    cy.contains('Organiser').click()
  })
})

export {}