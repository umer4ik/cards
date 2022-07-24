import { checkIfEl, prepareTerms } from '../lib/utils'
import { EventEmitter } from './EventEmitter'
import './style.css'
import { add, backdrop, bottomSection, cancelButton, deleteBtn, dialog, done, footer, form, linkToTopics, mainContainer, nextButton, notFoundPage, notFoundTextLink, noTopics, prevButton, randomButton, termEl, termsInput, termsInputError, themeButton, topicInput, topicInputError, topics } from './components'
import { KEY_CODES } from './constants'
import { Theme } from '../lib/Theme'
import { UI } from './UI'
import { createTopicItem } from './componentUtils'
import { SyncedStore } from '../lib/SyncedStore'
import { LocalStorageDb } from '../lib/Db'

const destroyHandlers: Array<() => void> = []

export function render() {
  const events = new EventEmitter()

  const syncedStore = new SyncedStore(new LocalStorageDb())
  const main = () => {
    events.trigger('init')
  }
  syncedStore.ready = main

  // handle random
  events.addHandler('random-term', () => {
    syncedStore.changeToRandomTerm()
    renderTerm()
    window.navigator?.vibrate(10)
  })
  const onSelectRandom = () => {
    events.trigger('random-term')
  }
  randomButton.addEvent('click', onSelectRandom)
  destroyHandlers.push(() => randomButton.removeEvent('click', onSelectRandom))

  // handle next
  const onSelectNext = () => {
    events.trigger('next-term')
  }
  events.addHandler('next-term', () => {
    syncedStore.changeToNextTerm()
    renderTerm()
    window.navigator?.vibrate(10)
  })
  nextButton.addEvent('click', onSelectNext)
  destroyHandlers.push(() => nextButton.removeEvent('click', onSelectNext))

  const onSelectPrev = () => {
    events.trigger('prev-term')
  }
  events.addHandler('prev-term', () => {
    syncedStore.changeToPrevTerm()
    renderTerm()
    window.navigator?.vibrate(10)
  })
  prevButton.addEvent('click', onSelectPrev)
  destroyHandlers.push(() => prevButton.removeEvent('click', onSelectPrev))
  const onBodyKeyDown = ({ code }: KeyboardEvent) => {
    if (code === KEY_CODES.R) onSelectRandom()
    else if (code === KEY_CODES.N) onSelectNext()
    else if (code === KEY_CODES.P) onSelectPrev()
    else if (code === KEY_CODES.Esc) hideDialog()
  }
  document.body.addEventListener('keydown', onBodyKeyDown)
  destroyHandlers.push(() => document.body.removeEventListener('keydown', onBodyKeyDown))

  const renderTerm = () => {
    termEl.el.textContent = syncedStore.term || 'No topic selected'
  }

  const root = document.getElementById('app')

  const theme = new Theme()

  const onToggleTheme = () => events.trigger('toggle-theme')
  themeButton.el.className = `theme-button ${theme.mode}`
  themeButton.addEvent('click', onToggleTheme)
  destroyHandlers.push(() => themeButton.removeEvent('click', onToggleTheme))

  events.addHandler('toggle-theme', () => {
    themeButton.el.classList.remove(theme.mode)
    document.body.classList.remove(theme.mode)
    theme.toggleMode()
    themeButton.el.classList.add(theme.mode)
    document.body.classList.add(theme.mode)
  })
  const onNavigateToTopics = () => {
    events.trigger('navigate', ({ path: '/topics' }))
  }
  linkToTopics.addEvent('click', onNavigateToTopics)
  destroyHandlers.push(() => linkToTopics.removeEvent('click', onNavigateToTopics))

  const onNavigateHome = () => {
    events.trigger('navigate', ({ path: '/' }))
  }
  done.addEvent('click', onNavigateHome)
  destroyHandlers.push(() => done.removeEvent('click', onNavigateHome))
  
  notFoundTextLink.addEvent('click', onNavigateHome)
  destroyHandlers.push(() => notFoundTextLink.removeEvent('click', onNavigateHome))

  const buildSkeleton = () => {
    checkIfEl(root)
    root.innerHTML = ''
    root.appendChild(themeButton.el)
    root.appendChild(mainContainer.el)
    root.appendChild(footer.el)
  }
  buildSkeleton()
  const ui = new UI(mainContainer.el)

  const loadHomePage = () => {
    renderTerm()
    ui.update([termEl.el, bottomSection.el])
  }

  const load404page = () => {
    ui.update([notFoundPage.el])
  }

  const renderTopics = () => {
    topics.el.innerHTML = ''
    if (syncedStore.allTopics.length) {
      syncedStore.allTopics.forEach(x => {
        const topic = createTopicItem({ topic: x, selected: syncedStore.topicIsSelected(x) })
        topics.el.appendChild(topic.el)
      })
    } else {
      topics.el.appendChild(noTopics.el)
    }
  }

  let topicsLoaded = false
  const loadTopicsPage = () => {
    if (!topicsLoaded) {
      topics.addEvent('click', (e) => {
        if (e.target instanceof Element) {
          const toggleTopic = e.target.closest('.topic-toggle[data-topic]')
          if (toggleTopic) {
            const topic = toggleTopic.getAttribute('data-topic')
            events.trigger('toggle-topic', { topic })
            return
          }
          const topicEl = e.target.closest('.topic')
          if (topicEl) {
            const topic = topicEl.getAttribute('data-topic')
            events.trigger('edit-topic', { topic })
          }
        }
      })
      renderTopics()
      topicsLoaded = true
    }
    ui.update([topics.el, done.el, dialog.el, backdrop.el, add.el])
  }

  events.addHandler('toggle-topic', ({ topic }: { topic: string }) => {
    if (topic) syncedStore.toggleTopic(topic)
    document.querySelector(`.topic-toggle[data-topic="${topic}"]`)?.classList.toggle('selected')
    document.querySelector(`.topic[data-topic="${topic}"]`)?.classList.toggle('topic-selected')
  })

  events.addHandler('navigate', ({ path }) => {
    if (typeof path !== 'string') return
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path)
    }
    if (path === '/') {
      loadHomePage()
    } else if (path === '/topics') {
      loadTopicsPage()
    } else {
      load404page()
    }
  })

  events.addHandler('init', () => {
    themeButton.el.classList.add(theme.mode)
    document.body.classList.add(theme.mode)
    events.trigger('navigate', { path: window.location.pathname })
    window.addEventListener('popstate', () => {
      events.trigger('navigate', { path: window.location.pathname })
    });
  })

  let topicInEdit: string | null = null

  events.addHandler('edit-topic', ({ topic }: { topic: string }) => {
    resetForm()
    dialog.el.classList.add('show')
    backdrop.el.classList.add('show')
    deleteBtn.el.classList.add('show')
    if (!(topicInput.el instanceof HTMLInputElement)) return
    if (!(termsInput.el instanceof HTMLTextAreaElement)) return
    topicInEdit = topic
    topicInput.el.value = topic
    topicInput.el.focus()
    termsInput.el.value = syncedStore.getTerms(topic)?.join('\n') || ''
  })
  const resetForm = () => {
    topicInput.el.classList.remove('error')
    termsInput.el.classList.remove('error')
    topicInputError.el.textContent = ''
    termsInputError.el.textContent = '';
    (topicInput.el as HTMLInputElement).value = '';
    (termsInput.el as HTMLTextAreaElement).value = ''
  }

  const onCancelButtonClick = () => {
    events.trigger('cancel-edit-topic')
  }
  cancelButton.addEvent('click', onCancelButtonClick)
  destroyHandlers.push(() => cancelButton.removeEvent('click', onCancelButtonClick))
  const hideDialog =  () => {
    dialog.el.classList.remove('show')
    backdrop.el.classList.remove('show')
    deleteBtn.el.classList.remove('show')
    topicInEdit = null
  }

  const onBackDropClick = () => events.trigger('hide-dialog')
  backdrop.addEvent('click', onBackDropClick)
  destroyHandlers.push(() => backdrop.removeEvent('click', onBackDropClick))

  events.addHandler('cancel-edit-topic', hideDialog)
  events.addHandler('hide-dialog', hideDialog)

  const onFormSubmit = (e: SubmitEvent) => {
    e.preventDefault()
    events.trigger('submit-topic-form')
  }
  form.addEvent('submit', onFormSubmit)
  destroyHandlers.push(() => form.addEvent('submit', onFormSubmit))

  const hideTopicNameError = () => {
    topicInput.el.classList.remove('error')
    topicInputError.el.textContent = ''
  }
  const showTopicNameError = (error: string) => {
    topicInput.el.classList.add('error')
    topicInputError.el.textContent = error
  }

  events.addHandler('submit-topic-form', async () => {
    const data = new FormData(form.el as HTMLFormElement)
    const topicName = data.get('topic') as string
    const terms = data.get('terms') as string
    const isEditForm = topicInEdit !== null
    let error = false
    if (!topicName) {
      showTopicNameError('Topic name is required')
      error = true
    } else {
      hideTopicNameError()
    }
    if (!terms) {
      termsInput.el.classList.add('error')
      termsInputError.el.textContent = 'Terms are required'
      error = true
    } else {
      termsInput.el.classList.remove('error')
      termsInputError.el.textContent = ''
    }
    if (error) return
    if (isEditForm) {
      const topics = syncedStore.allTopics.filter(x => x !== topicInEdit)
      if (~topics.indexOf(topicName as string)) {
        showTopicNameError('Topic already exists')
        return
      } else {
        hideTopicNameError()
      }
      await syncedStore.updateTopic(topicInEdit!, topicName, prepareTerms(terms))
    } else {
      await syncedStore.addTopic(topicName, prepareTerms(terms))
    }
    renderTopics()
    events.trigger('hide-dialog')
  })
  events.addHandler('delete-topic', async () => {
    await syncedStore.deleteTopic(topicInEdit!)
    renderTopics()
    events.trigger('hide-dialog')
  })

  const onDeleteButtonClick = () => events.trigger('delete-topic')
  deleteBtn.addEvent('click', onDeleteButtonClick)
  destroyHandlers.push(() => deleteBtn.removeEvent('click', onDeleteButtonClick))

  const onAddClick = () => events.trigger('create-topic')
  add.addEvent('click', onAddClick)
  destroyHandlers.push(() => add.removeEvent('click', onAddClick))

  events.addHandler('create-topic', () => {
    resetForm()
    dialog.el.classList.add('show')
    backdrop.el.classList.add('show')
    if (!(topicInput.el instanceof HTMLInputElement)) return
    topicInput.el.focus()
  })
}

export function destroy() {
  const root = document.getElementById('app')
  checkIfEl(root)
  root.innerHTML = ''
  destroyHandlers.forEach(h => h())
}
