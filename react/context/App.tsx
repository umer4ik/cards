import React, { useEffect, useRef, useState } from 'react'
import { Theme } from '../../lib/theme'
import { ThemeButton } from './ThemeButton'
import { AppContext } from './AppContext'

export function App() {
  const theme = useRef(new Theme())
  const [mode, setMode] = useState(theme.current.mode)
  const toggleMode = () => {
    theme.current.toggleMode()
    setMode(theme.current.mode)
  }
  useEffect(() => {
    document.body.className = mode
  }, [mode])
  return (
    <AppContext.Provider value={{ theme: { mode, toggleMode } }}>
      <ThemeButton />
    </AppContext.Provider>
  )
}
