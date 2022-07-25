import React from 'react'
import { Link } from 'react-router-dom'

export function DoneLink() {
  return (
    <Link className="done" data-testid="done-link" to="/">Done</Link>
  )
}
