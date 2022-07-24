import { Db } from "./Db";
import { Store } from "./Store";
import { checkIfNonNull } from "./utils";

export class SyncedStore {
  store: Store | null = null
  ready = () => {}
  constructor(private db: Db) {
    db.get().then(({
      selectedTopicsSet,
      topicsMap,
      topicsOrderSet
    }) => {
      this.store = new Store(topicsMap, topicsOrderSet, selectedTopicsSet)
      this.ready()
    })
  }
  addTopic(topic: string, terms: string[]) {
    checkIfNonNull(this.store)
    this.store.addTopic(topic, terms)
    return this.db.save(this.store.getData())
  }
  updateTopic(oldTopic: string, newTopic: string, terms: string[]) {
    checkIfNonNull(this.store)
    this.store.updateTopic(oldTopic, newTopic, terms)
    return this.db.save(this.store.getData())
  }
  deleteTopic(topic: string) {
    checkIfNonNull(this.store)
    this.store.deleteTopic(topic)
    return this.db.save(this.store.getData())
  }
  toggleTopic(topic: string) {
    checkIfNonNull(this.store)
    this.store.toggleTopic(topic)
    return this.db.save(this.store.getData())
  }
  changeToRandomTerm() {
    checkIfNonNull(this.store)
    this.store.changeToRandomTerm()
  }
  changeToNextTerm() {
    checkIfNonNull(this.store)
    this.store.changeToNextTerm()
  }
  changeToPrevTerm() {
    checkIfNonNull(this.store)
    this.store.changeToPrevTerm()
  }
  get term() {
    checkIfNonNull(this.store)
    return this.store.term
  }
  get allTopics() {
    checkIfNonNull(this.store)
    return this.store.allTopics
  }
  topicIsSelected(topic: string) {
    checkIfNonNull(this.store)
    return this.store.topicIsSelected(topic)
  }
  getTerms(topic: string) {
    checkIfNonNull(this.store)
    return this.store.getTerms(topic)
  }
}