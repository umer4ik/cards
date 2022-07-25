import React, { MouseEventHandler } from 'react'

type AddButtonProps = {
  onClick: () => void
}

export function AddButton({
  onClick
}: AddButtonProps) {
  return <div className="add" data-testid="add-button" onClick={onClick}><div className="add-plus"></div></div>
}
