import React, { MouseEventHandler } from 'react'

type ThemeButtonProps = {
  theme: 'dark' | 'light',
  onClick: MouseEventHandler<HTMLButtonElement>
}

export function ThemeButton({ theme, onClick }: ThemeButtonProps) {
  return (
    <button className={`theme-button ${theme}`} onClick={onClick}>
      <span className="theme-button-bg"></span>
      <span className="🌚">🌚</span>
      <span className="🌞">🌞</span>
    </button>
  )
}