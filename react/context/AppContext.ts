import { createContext } from 'react'

interface AppContextProps{
  theme: {
    mode: 'light' | 'dark',
    toggleMode: () => void
  }
}

export const AppContext = createContext<AppContextProps>({ 
  theme: {
    mode: 'dark',
    toggleMode: () => {}
  }
})