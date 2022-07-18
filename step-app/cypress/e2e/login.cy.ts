// Testing front end request to log in with google and end up on the front page.

describe('Google', function () {
  beforeEach(function () {
    cy.loginByGoogleApi()
  })

  it('shows onboarding', function () {
    cy.contains('Feed').should('be.visible')
  })
})

export {}