import React from 'react'
import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="not-found-page">
      <span className="not-found-text" data-testid="not-found-message">Not found</span>
      <Link className="not-found-home-link" data-testid="link-to-home" to="/">Home</Link>
    </div>
  )
}
