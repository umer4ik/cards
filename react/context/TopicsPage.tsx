import React, { useContext } from 'react'
import { AppContext } from './AppContext'
import { Topics } from '../components/Topics'
import { Topic } from '../components/Topic'
import { NoTopics } from '../components/NoTopics'
import { DoneLink } from '../components/DoneLink'
import { AddButton } from '../components/AddButton'
import { Dialog } from '../components/Dialog'

export function TopicsPage() {
  const { topics, isSelected, toggleTopic, openDialog, dialog, closeDialog } = useContext(AppContext)
  const renderTopics = () => topics.map(topic => <Topic
    onClick={() => openDialog(topic)}
    key={topic}
    topic={topic}
    selected={isSelected(topic)}
    onToggle={toggleTopic} />)
  return (
    <>
      <Topics>
        {topics.length ? renderTopics() : <NoTopics />}
      </Topics>
      <DoneLink />
      <Dialog show={dialog} onClose={closeDialog}>
        Dialog
      </Dialog>
      <AddButton onClick={() => openDialog()} />
    </>
  )
}
