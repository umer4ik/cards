import React, { useContext } from 'react'
import { Term } from './Term'
import { BottomSection } from '../components/BottomSection'
import { ActionButton } from '../components/ActionButton'
import { AppContext } from './AppContext'
import { KEY_CODES } from '../../lib/constants'
import { useBodyListener } from '../useBodyListener'

export function Home() {
  const { changeToPrevTerm, changeToRandomTerm, changeToNextTerm } = useContext(AppContext)
  const onBodyKeyDown = ({ code }: KeyboardEvent) => {
    if (code === KEY_CODES.R) changeToRandomTerm()
    else if (code === KEY_CODES.N) changeToNextTerm()
    else if (code === KEY_CODES.P) changeToPrevTerm()
  }
  useBodyListener('keydown', onBodyKeyDown)
  return (
    <>
      <Term />
      <BottomSection>
        <ActionButton keyboardKey="P" text="prev" testId="prev-button" onClick={changeToPrevTerm} />
        <ActionButton keyboardKey="R" text="random" testId="random-button" onClick={changeToRandomTerm} />
        <ActionButton keyboardKey="N" text="next" testId="next-button" onClick={changeToNextTerm} />
      </BottomSection>
    </>
  )
}
