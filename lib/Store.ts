import { createArray, randomNumber, removeFromArray } from "./utils"

export class Store {
  private selectedTopicsSet: Set<string> // only selected topics
  private termIndex: number = 0
  private I: number[] = []
  private topicsMap: Map<string, string[]>
  private topicsOrderSet: Set<string>
  constructor(
    topicsMap: Map<string, string[]>,
    topicsOrderSet: Set<string>,
    selectedTopicsSet?: Set<string>
  ) {
    this.topicsMap = new Map(topicsMap)
    this.topicsOrderSet = new Set(topicsOrderSet)
    this.selectedTopicsSet = new Set(selectedTopicsSet ?? topicsOrderSet)
  }
  get allTopics() {
    return [...this.topicsOrderSet]
  }
  get selectedTopics() {
    return [...this.selectedTopicsSet]
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
      selectedTopicsSet: new Set(this.selectedTopicsSet)
    }
  }
}
