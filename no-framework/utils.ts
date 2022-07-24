type CreateElOptions = {
  type?: keyof HTMLElementTagNameMap,
  className?: string,
  children?: string | HTMLElement | HTMLElement[],
  testId?: string
}

export function createEl({
  type = 'div',
  className,
  children,
  testId
} : CreateElOptions): HTMLElement {
  const el = document.createElement(type)
  if (className) {
    el.className = className
  }
  if (typeof children === 'string') {
    el.innerHTML = children
  } else if (children instanceof HTMLElement) {
    el.appendChild(children)
  } else if (Array.isArray(children)) {
    children.forEach(child => {
      if (child instanceof HTMLElement) {
        el.appendChild(child)
      }
    })
  }
  if (testId) {
    el.setAttribute('data-testid', testId)
  }
  return el
}
