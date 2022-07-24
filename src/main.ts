import './style.css'
import * as noFramework from '../no-framework/main'
import * as react from '../react/main'
import { checkIfEl } from '../lib/utils'

let currentFramework: 'no framework' | 'react context' | null = null

const nav = document.getElementById('navigation')
checkIfEl(nav)
nav.innerHTML = `
<button data-render="no framework">no framework</button>
<button data-render="react context">React context</button>
`;
(nav as HTMLDivElement).addEventListener('click', (e: MouseEvent) => {
  if (e.target instanceof HTMLButtonElement) {
    destroy()
    if (e.target.dataset['render'] === 'no framework') {
      currentFramework = 'no framework'
      noFramework.render()
    }
    if (e.target.dataset['render'] === 'react context') {
      currentFramework = 'react context'
      react.render()
    }
  }
})

function destroy() {
  if (currentFramework === 'no framework') {
    noFramework.destroy()
  }
  if (currentFramework === 'react context') {
    react.destroy()
  }
  currentFramework = null
}