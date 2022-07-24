type Handler = (...args: any[]) => void
type RegisteredEvents = 'random-term' | 'next-term' | 'prev-term' | 'toggle-theme' | 'init'
  | 'navigate' | 'toggle-topic' | 'edit-topic' | 'cancel-edit-topic' | 'submit-topic-form' 
  | 'hide-dialog' | 'create-topic' | 'delete-topic'

export class EventEmitter {
  private handlers: {
    [key: string]: Handler[]
  }
  constructor() {
    this.handlers = {}
  }
  addHandler(event: RegisteredEvents, handler: Handler){
    if (this.handlers[event]) {
      this.handlers[event].push(handler)
    } else {
      this.handlers[event] = [handler]
    }
  }
  trigger(event: RegisteredEvents, ...args: any[]) {
    this.handlers[event]?.forEach(h => {
      console.log(`%c EventEmitter event %c ${event}`, 'color: cyan;', 'color: magenta; font-weight: bold;', ...args)
      h(...args)
    })
  }
}
