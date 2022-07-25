import { createContext } from 'react'

export interface AppContextProps{
  theme: {
    mode: 'light' | 'dark',
    toggleMode: () => void
  },
  term: string | null,
  changeToNextTerm: () => void,
  changeToPrevTerm: () => void,
  changeToRandomTerm: () => void,
  topics: string[],
  isSelected: (topic: string) => boolean,
  toggleTopic: (topic: string) => void,
  topicInEdit: string | null,
  dialog: boolean,
  openDialog: (topic?: string) => void,
  closeDialog: () => void
}

const noop = () => {}

export const AppContext = createContext<AppContextProps>({ 
  theme: {
    mode: 'dark',
    toggleMode: () => {}
  },
  term: null,
  changeToNextTerm: noop,
  changeToPrevTerm: noop,
  changeToRandomTerm: noop,
  topics: [],
  isSelected: () => false,
  toggleTopic: noop,
  topicInEdit: null,
  dialog: false,
  openDialog: noop,
  closeDialog: noop
})
