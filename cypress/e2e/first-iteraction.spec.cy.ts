/// <reference types="cypress" />
describe('First interaction', () => {
  it('opens the home page', () => {
    cy.visit('http://localhost:3000')
    cy.getByTestId('term').should('include.text', 'No topic selected')
    cy.getByTestId('random-button').should('include.text', 'random')
    cy.getByTestId('prev-button').should('include.text', 'prev')
    cy.getByTestId('next-button').should('include.text', 'next')
    cy.getByTestId('link-to-topics').should('include.text', 'Edit topics')
  })
  it('opens Topics page and goes back', () => {
    cy.visit('http://localhost:3000')
    cy.getByTestId('link-to-topics').click()
    cy.getByTestId('no-topics-message').should('contain.text', 'No topics found')
    cy.getByTestId('done-link').should('contain.text', 'Done').click()
  })
  it('visits 404 page and navigates back', () => {
    cy.visit('http://localhost:3000/not-found-page')
    cy.getByTestId('not-found-message').should('include.text', 'Not found')
    cy.getByTestId('link-to-home').should('contain.text', 'Home').click()
  })
})