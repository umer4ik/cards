import { Component } from "./Component"
import { createActionButton } from "./componentUtils"
import { createEl } from "./utils"

export const themeButton = new Component(createEl({ type: 'button', className: `theme-button`, children: '<span class="theme-button-bg"></span><span class="🌚">🌚</span><span class="🌞">🌞</span>' }))
export const footer = new Component(createEl({ type: 'footer', className: 'footer', children: `<div class="footer-box"><a href="https://github.com/umer4ik" target="_blank">@umer4ik</a></div>` }))
const notFoundText = new Component(createEl({ type: 'span', className: 'not-found-text', children: 'Not found', testId: 'not-found-message' }))
export const notFoundTextLink = new Component(createEl({ type: 'span', className: 'not-found-home-link', children: 'Home', testId: 'link-to-home' }))
export const notFoundPage = new Component(createEl({ className: 'not-found-page', children: [notFoundText.el, notFoundTextLink.el] }))
export const mainContainer = new Component(createEl({ className: 'main-container' }))

// action buttons
export const randomButton = createActionButton({ key: 'R', text: 'random', testId: 'random-button' })
export const nextButton = createActionButton({ key: 'N', text: 'next', testId: 'next-button' })
export const prevButton = createActionButton({ key: 'P', text: 'prev', testId: 'prev-button' })
export const actionButtons = new Component(createEl({ className: 'action-buttons', children: [prevButton.el, randomButton.el, nextButton.el] }))

export const termEl = new Component(createEl({ type: 'h1', className: 'term', children: 'Start!', testId: 'term' }))
export const linkToTopics = new Component(createEl({ type: 'span', className: 'link-to-topics', children: 'Edit topics', testId: 'link-to-topics' }))
linkToTopics.el.setAttribute('tabindex', '0')
export const bottomSection = new Component(createEl({ className: 'bottom-section', children: [actionButtons.el, linkToTopics.el] }))

// topics page
export const topics = new Component(createEl({ type: 'ul', className: 'topics' }))
export const noTopics = new Component(createEl({ className: 'no-topics', children: 'No topics found, add a new one by clicking on +', testId: 'no-topics-message' }))
export const done = new Component(createEl({ className: 'done', children: 'Done', testId: 'done-link' }))
export const add = new Component(createEl({ className: 'add', children: '<div class="add-plus"></div>', testId: 'add-button' }))

// form & dialog
export const topicInput = new Component(createEl({ type: 'input', className: 'topic-input input', testId: 'topic-input' }));
(topicInput.el as HTMLInputElement).type = 'text';
(topicInput.el as HTMLInputElement).placeholder = 'Enter topic name';
(topicInput.el as HTMLInputElement).name = 'topic'
export const topicInputError = new Component(createEl({ type: 'span', className: 'error-hint', testId: 'topic-error' }))
export const termsInput = new Component(createEl({ type: 'textarea', className: 'terms-input input', testId: 'terms-input' }));
(termsInput.el as HTMLTextAreaElement).placeholder = 'Enter terms splitted by new line';
(termsInput.el as HTMLTextAreaElement).name = 'terms'
export const termsInputError = new Component(createEl({ type: 'span', className: 'error-hint', testId: 'terms-error' }))
const termsInputBox =  new Component(createEl({ className: 'input-box terms-input-box', children: [termsInput.el, termsInputError.el] }))
const topicInputBox =  new Component(createEl({ className: 'input-box topic-input-box', children: [topicInput.el, topicInputError.el] }))
export const deleteBtn = new Component(createEl({ type: 'button', className: 'form-button delete-button', children: 'Delete', testId: 'delete-button' }));
(deleteBtn.el as HTMLButtonElement).type = 'button';
(deleteBtn.el as HTMLButtonElement).title = 'Delete topic'
export const saveButton = new Component(createEl({ type: 'button', className: 'form-button form-button-save', children: 'Save', testId: 'save-button' }))
export const cancelButton = new Component(createEl({ type: 'button', className: 'form-button form-button-cancel', children: 'Cancel', testId: 'cancel-button' }));
(cancelButton.el as HTMLButtonElement).type = 'button'
const formButtons = new Component(createEl({ className: 'form-buttons', children: [deleteBtn.el, cancelButton.el, saveButton.el] }))
export const form = new Component(createEl({ type: 'form', className: 'form', children: [topicInputBox.el, termsInputBox.el, formButtons.el] }))
export const dialog = new Component(createEl({ className: 'dialog', children: [form.el], testId: 'dialog' }))
export const backdrop = new Component(createEl({ className: 'backdrop', testId: 'backdrop' }))