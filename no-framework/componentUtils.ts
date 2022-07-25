import { Component } from "./Component"
import { createEl } from "./utils"

type CreateActionButtonOptions = {
  key: string,
  text: string,
  testId?: string
}
export function createActionButton({ key, text, testId }: CreateActionButtonOptions): Component {
  return new Component(
    createEl({
      type: 'button',
      className: 'action-button',
      children: `
        <span class="action-button-content">
          <span class="action-button-key">${key}</span>
          <span class="action-button-text">${text}</span>
        </span>
        <span class="action-button-bg"></span>
      `,
      testId
    })
  )
}

type CreateTopicItemOptions = { topic: string, selected: boolean }
export function createTopicItem({ topic, selected }: CreateTopicItemOptions): Component{
  const c = new Component(
    createEl({
      type: 'li',
      className: `topic ${selected ? 'topic-selected' : ''}`,
      children: `
        <div class="topic-name" title="${topic}">${topic}</div>
        <div class="topic-toggle ${selected ? 'selected' : ''}" data-topic="${topic}">
          <div class="topic-toggle-rail">
            <div class="topic-toggle-trigger"></div>
          </div>
        </div>
      `,
      testId: 'topic'
    })
  )
  c.el.setAttribute('data-topic', topic)
  return c
}
