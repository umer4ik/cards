export class UI {
  constructor(private skeleton: HTMLElement) {}
  update(el: HTMLElement[]) {
    this.skeleton.innerHTML = ''
    el.forEach(x => {
      this.skeleton.appendChild(x)
    })
  }
}