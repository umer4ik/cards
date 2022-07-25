import React, { MouseEventHandler } from 'react'

type TopicProps = {
  topic: string,
  selected: boolean,
  onToggle: (topic: string) => void,
  onClick: MouseEventHandler
}

export function Topic({
  topic,
  selected,
  onToggle,
  onClick
}: TopicProps) {
  const onToggleClick: MouseEventHandler = (e) => {
    e.stopPropagation()
    onToggle(topic)
  }
  return (
    <li className={`topic ${selected ? 'topic-selected' : ''}`} data-testid="topic" data-topic={topic} onClick={onClick}>
      <div className="topic-name" title={topic}>{topic}</div>
      <div className={`topic-toggle ${selected ? 'selected' : ''}`} data-topic={topic} onClick={onToggleClick}>
        <div className="topic-toggle-rail">
          <div className="topic-toggle-trigger"></div>
        </div>
      </div>
    </li>
  )
}
