type ColorModes = 'light' | 'dark'
export class Theme {
  private _mode!: ColorModes
  constructor() {
    const mode = this.getFromStorage()
    if (mode) {
      this.mode = mode as ColorModes
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.mode = 'dark'
    } else {
      this.mode = 'light'
    }
  }
  set mode(m: ColorModes) {
    this._mode = m
    this.saveToStorage()
  }
  get mode() {
    return this._mode
  }
  private getFromStorage() {
    return sessionStorage.getItem('color-mode')
  }
  private saveToStorage() {
    sessionStorage.setItem('color-mode', this.mode)
  }
  toggleMode() {
    this.mode = this.mode === 'dark' ? 'light' : 'dark'
    console.log('this.mode', this.mode)
  }
}

// export const theme = new Theme()
