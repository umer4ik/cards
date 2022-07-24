/// <reference types="cypress" />
const terms = `term 1
term 2
term 3
term 4`

const terms2 = `other 1
other 2
other 3
other 4`
describe('Create/update/delete topic', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })
  it('Navigate to /topics & create first topic', () => {

    cy.getByTestId('link-to-topics').click()

    cy.getByTestId('add-button').click()

    cy.getByTestId('topic-input')
      .should('be.visible')

    cy.getByTestId('terms-input')
      .should('be.visible')

    cy.getByTestId('delete-button')
      .should('not.be.visible')

    cy.getByTestId('cancel-button').click()

    cy.getByTestId('add-button').click()

    cy.getByTestId('save-button').click()

    cy.getByTestId('topic-error').should('be.visible')

    cy.getByTestId('terms-error').should('be.visible')

    cy.getByTestId('topic-input')
      .type('First topic')
    
    cy.getByTestId('terms-input')
      .type(terms)

    cy.getByTestId('save-button').click()

    cy.getByTestId('topic')
      .last()
      .should('contain.text', 'First topic')
      .should('have.class', 'topic-selected')
      .should('have.attr', 'data-topic', 'First topic')

    cy.getByTestId('done-link').click()

    cy.getByTestId('term').should('have.text', 'term 1')

    cy.getByTestId('next-button').click()

    cy.getByTestId('term').should('have.text', 'term 2')

    cy.getByTestId('next-button').click()

    cy.getByTestId('term').should('have.text', 'term 3')

    cy.getByTestId('prev-button').click()

    cy.getByTestId('term').should('have.text', 'term 2')

    cy.getByTestId('prev-button').click()

    cy.getByTestId('term').should('have.text', 'term 1')

    cy.getByTestId('random-button').click()

    cy.getByTestId('term').should('contain.text', 'term')

    cy.getByTestId('link-to-topics').click()
    
    cy.getByTestId('add-button').click()

    cy.getByTestId('topic-input')
      .type('Second topic')
    
    cy.getByTestId('terms-input')
      .type(terms2)

    cy.getByTestId('save-button').click()

    cy.getByTestId('topic').find(`.topic-toggle[data-topic="First topic"]`).click()

    cy.getByTestId('done-link').click()

    cy.getByTestId('term').should('have.text', 'other 1')

    cy.getByTestId('link-to-topics').click()

    cy.getByTestId('topic').find(`.topic-toggle[data-topic="First topic"]`).click()

    cy.get('.topic[data-topic="First topic"]').click()

    cy.getByTestId('topic-input').type(' updated')

    cy.getByTestId('save-button').click()

    cy.get('.topic[data-topic="First topic updated"]').click()

    cy.getByTestId('delete-button').click()

    cy.get('.topic').should('have.length', 1)
  })
})