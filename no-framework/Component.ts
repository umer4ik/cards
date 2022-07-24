export class Component {
  constructor(protected element: HTMLElement) {}
  addEvent<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => void): void {
    this.element.addEventListener(type, listener)
  }
  removeEvent<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => void): void {
    this.element.removeEventListener(type, listener)
  }
  get el(): HTMLElement {
    return this.element
  }
}

