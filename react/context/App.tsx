import React, { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Theme } from '../../lib/theme'
import { ThemeButton } from './ThemeButton'
import { AppContext, AppContextProps } from './AppContext'
import { SyncedStore } from '../../lib/SyncedStore'
import { LocalStorageDb } from '../../lib/Db'
import { Footer } from '../components/Footer'
import { MainContainer } from '../components/MainContainer'
import { Home } from './Home'
import { TopicsPage } from './TopicsPage'
import { NotFound } from '../components/NotFound'

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

  const [term, setTerm] = useState<string | null>(null)
  const [topics, setTopics] = useState<string[]>([])
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [dialog, setDialog] = useState(false)
  const [topicInEdit, setTopicInEdit] = useState<string | null>(null)
  const store = useRef(new SyncedStore(new LocalStorageDb()))
  useEffect(() => {
    store.current.ready = () => {
      setTerm(store.current.term)
      setTopics(store.current.allTopics)
      setSelectedTopics(store.current.selectedTopics)
      setDialog(store.current.dialogOpen)
      setTopicInEdit(store.current.topicInEdit)
    }
  }, [])
  const changeToNextTerm = async () => {
    await store.current.changeToNextTerm()
    setTerm(store.current.term)
  }
  const changeToPrevTerm = async () => {
    await store.current.changeToPrevTerm()
    setTerm(store.current.term)
  }
  const changeToRandomTerm = async () => {
    await store.current.changeToRandomTerm()
    setTerm(store.current.term)
  }
  const toggleTopic = async (topic: string) => {
    await store.current.toggleTopic(topic)
    setSelectedTopics(store.current.selectedTopics)
    setTerm(store.current.term)
  }
  const openDialog = (topic?: string) => {
    if (topic) {
      store.current.setTopicInEdit(topic)
      setTopicInEdit(topic)
    }
    store.current.setDialogOpen(true)
    setDialog(true)
  }
  const closeDialog = () => {
    store.current.setTopicInEdit(null)
    store.current.setDialogOpen(false)
    setTopicInEdit(null)
    setDialog(false)
  }

  const contextValue: AppContextProps = {
    theme: {
      mode,
      toggleMode
    },
    term,
    changeToNextTerm,
    changeToPrevTerm,
    changeToRandomTerm,
    topics,
    isSelected: (x: string) => selectedTopics.includes(x),
    toggleTopic,
    dialog,
    topicInEdit,
    openDialog,
    closeDialog
  }
  return (
    <BrowserRouter>
      <AppContext.Provider value={contextValue}>
        <ThemeButton />
        <MainContainer>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/topics" element={<TopicsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainContainer>
        <Footer />
      </AppContext.Provider>
    </BrowserRouter>
  )
}
