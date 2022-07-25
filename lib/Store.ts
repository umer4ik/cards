import { createArray, randomNumber, removeFromArray } from "./utils"

type StoreOptions = {
  topicsMap:  Map<string, string[]>,
  topicsOrderSet: Set<string>,
  termIndex?: number,
  selectedTopicsSet?: Set<string>,
  topicInEdit: string | null,
  dialogOpen: boolean
}

export class Store {
  private selectedTopicsSet: Set<string> // only selected topics
  private I: number[] = []
  private topicsMap: Map<string, string[]>
  private topicsOrderSet: Set<string>
  private _termIndex: number = 0
  private _topicInEdit: string | null
  private _dialogOpen = false
  constructor({
    topicsMap,
    topicsOrderSet,
    termIndex,
    selectedTopicsSet,
    topicInEdit,
    dialogOpen
  }: StoreOptions) {
    this.topicsMap = new Map(topicsMap)
    this.topicsOrderSet = new Set(topicsOrderSet)
    this.selectedTopicsSet = new Set(selectedTopicsSet ?? topicsOrderSet)
    this.termIndex = termIndex ?? this._termIndex
    this._topicInEdit = topicInEdit
    this._dialogOpen = dialogOpen
  }
  get allTopics() {
    return [...this.topicsOrderSet]
  }
  get selectedTopics() {
    return [...this.selectedTopicsSet]
  }
  get topicInEdit() {
    return this._topicInEdit
  }
  set topicInEdit(v: string | null) {
    this._topicInEdit = v
  }
  get dialogOpen() {
    return this._dialogOpen
  }
  set dialogOpen(v: boolean) {
    this._dialogOpen = v
  }
  getTerms(topic: string) {
    if (this.topicsMap.has(topic)) {
      return this.topicsMap.get(topic)
    } else {
      return []
    }
  }
  private reset() {
    this.I = []
    this.termIndex = 0
  }
  changeToNextTerm() {
    this.termIndex += 1
  }
  changeToPrevTerm() {
    const prev = --this.termIndex
    if (prev < 0) {
      this.termIndex = this.terms.length - 1
    }
  }
  changeToRandomTerm(){
    if (!this.I || !this.I.length) this.I = createArray(this.terms.length)
    const n = randomNumber(this.I.length - 1)
    const i = this.I[n]
    this.I = removeFromArray(n, this.I)
    this.termIndex = i
  }
  addTopic(topic: string, terms: string[]) {
    this.topicsMap.set(topic, terms)
    this.selectedTopicsSet.add(topic)
    this.topicsOrderSet.add(topic)
    this.reset()
  }
  updateTopic(oldTopic: string, newTopic: string, terms: string[]) {
    if (this.selectedTopicsSet.has(oldTopic)) {
      const selectedTopics = [...this.selectedTopicsSet].map(t => {
        if (t === oldTopic) {
          return newTopic
        }
        return t
      })
      this.selectedTopicsSet = new Set(selectedTopics)
    }
    if (this.topicsOrderSet.has(oldTopic)) {
      const topicsOrder = [...this.topicsOrderSet].map(t => {
        if (t === oldTopic) {
          return newTopic
        }
        return t
      })
      this.topicsOrderSet = new Set(topicsOrder)
    }
    this.topicsMap.delete(oldTopic)
    this.topicsMap.set(newTopic, terms)
    this.reset()
  }
  deleteTopic(topic: string) {
    this.selectedTopicsSet.delete(topic)
    this.topicsOrderSet.delete(topic)
    this.topicsMap.delete(topic)
    this.reset()
  }
  topicIsSelected (topic: string) {
    return this.selectedTopicsSet.has(topic)
  }
  toggleTopic (topic: string) {
    if (this.selectedTopicsSet.has(topic)) {
      this.selectedTopicsSet.delete(topic)
    } else {
      const input: string[] = []
      const result = [...this.topicsOrderSet].reduce((acc, t) => {
        if (t === topic || this.selectedTopicsSet.has(t)) {
          acc.push(t)
        }
        return acc
      }, input)
      this.selectedTopicsSet = new Set(result)
    }
    this.reset()
  }
  set termIndex(v: number) {
    this._termIndex = v
  }
  get termIndex() {
    return this._termIndex
  }
  get term() {
    return this.terms[this.termIndex % this.terms.length]
  }
  private get terms() {
    const arr:string[] = []
    return [...this.topicsOrderSet].reduce((acc, topic) => {
      if (this.selectedTopicsSet.has(topic)) {
        acc.push(...(this.topicsMap.get(topic) as string[]))
      }
      return acc
    }, arr)
  }
  getData() {
    return {
      topicsMap: new Map(this.topicsMap),
      topicsOrderSet: new Set(this.topicsOrderSet),
      selectedTopicsSet: new Set(this.selectedTopicsSet),
      termIndex: this.termIndex,
      topicInEdit: this.topicInEdit,
      dialogOpen: this.dialogOpen
    }
  }
}
