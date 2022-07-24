import React, { useContext } from 'react'
import { ThemeButton as ThemeButtonC } from '../components/ThemeButton'
import { AppContext } from './AppContext'

export function ThemeButton() {
  const { theme } = useContext(AppContext)
  return <ThemeButtonC theme={theme.mode} onClick={theme.toggleMode} />
}