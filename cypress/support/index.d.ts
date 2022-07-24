declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Shorthand for getting element by [data-testid="testId"] selector
     * @param testId 
     */
    getByTestId<E extends Node = HTMLElement>(testId: string): Chainable<JQuery<E>>
  }
}