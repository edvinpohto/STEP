// Test for liking an event

describe('Like an event', () => {
  it('Visits the feed page and likes an event', () => {
    cy.login();
		// Visit a route in order to allow cypress to actually set the cookie
		cy.visit("/");
		// Wait until the intercepted request is ready
		cy.wait("@session");

    cy.visit('/tests/testIndex')
    cy.contains('Organiser: Edvin').click()
    cy.wait(1000)
    cy.get('#likeButton').click()
    cy.wait(1000)

    // Checks whether the liked event is in the liked events section
    cy.visit('/tests/testLikedEvents')
    cy.contains('Organiser: Edvin Pohto')
  })
})

export {}