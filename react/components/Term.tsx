import React from 'react'
type TermProps = {
  term: string | null
}
export function Term({ term }: TermProps){
  return (
    <h1 className="term" data-testid="term">{term ?? 'No topic selected'}</h1>
  )
}
