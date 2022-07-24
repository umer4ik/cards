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
          <!--div class="topic-toggle-circle">
            <div class="topic-toggle-circle-bg"></div>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100" height="100" viewBox="0 0 270 270">
              <defs>
                <linearGradient id="grad" gradientTransform="rotate(123)">
                  <stop offset="0" stop-color="#5bb9ff"/>
                  <stop offset="1" stop-color="#80ff80"/>
                </linearGradient>
              </defs>
              <path d="M 30,180 90,240 240,30" style="stroke-width:30" fill="none" stroke="url(#grad)"/>
            </svg>
          </div--!>
        </div>
      `,
      testId: 'topic'
    })
  )
  c.el.setAttribute('data-topic', topic)
  return c
}
