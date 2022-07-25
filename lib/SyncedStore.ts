import { Db } from "./Db";
import { Store } from "./Store";
import { checkIfNonNull } from "./utils";

export class SyncedStore {
  store: Store | null = null
  ready = () => {}
  constructor(private db: Db) {
    db.get().then((data) => {
      this.store = new Store(data)
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
    return this.db.save(this.store.getData())
  }
  changeToNextTerm() {
    checkIfNonNull(this.store)
    this.store.changeToNextTerm()
    return this.db.save(this.store.getData())
  }
  changeToPrevTerm() {
    checkIfNonNull(this.store)
    this.store.changeToPrevTerm()
    return this.db.save(this.store.getData())
  }
  setTopicInEdit(v: string | null) {
    checkIfNonNull(this.store)
    this.store.topicInEdit = v
    return this.db.save(this.store.getData())
  }
  setDialogOpen(v: boolean) {
    checkIfNonNull(this.store)
    this.store.dialogOpen = v
    return this.db.save(this.store.getData())
  }
  get term() {
    checkIfNonNull(this.store)
    return this.store.term
  }
  get allTopics() {
    checkIfNonNull(this.store)
    return this.store.allTopics
  }
  get selectedTopics() {
    checkIfNonNull(this.store)
    return this.store.selectedTopics
  }
  get topicInEdit() {
    checkIfNonNull(this.store)
    return this.store.topicInEdit
  }
  get dialogOpen() {
    checkIfNonNull(this.store)
    return this.store.dialogOpen
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