import React, { MouseEventHandler } from 'react'

type ActionButtonProps = {
  keyboardKey: string,
  text: string,
  testId: string,
  onClick: MouseEventHandler<HTMLButtonElement>
}

export function ActionButton({ keyboardKey, text, testId, onClick }: ActionButtonProps) {
  return (
    <button className="action-button" data-testid={testId} onClick={onClick}>
      <span className="action-button-content">
        <span className="action-button-key">{keyboardKey}</span>
        <span className="action-button-text">{text}</span>
      </span>
      <span className="action-button-bg"></span>
    </button>
  )
}
