import { Store } from './Store'
const topicsMap = new Map([
  ['topic0', ['term0_0', 'term0_1', 'term0_2']],
  ['topic1', ['term1_0', 'term1_1', 'term1_2']],
  ['topic2', ['term2_0', 'term2_1', 'term2_2']]
])
const topicsOrderSet = new Set(['topic0', 'topic1', 'topic2'])
const options = {
  topicsMap,
  topicsOrderSet,
  termIndex: 0,
  topicInEdit: null,
  dialogOpen: false
}
test('Store with topics is created', () => {
  const store = new Store(options)
  expect(store.allTopics.length).toBe(3)
  expect(store.selectedTopics.length).toBe(3)
  expect(store.topicIsSelected('topic0')).toBeTruthy()
  expect(store.getTerms('topic0')).toEqual(['term0_0', 'term0_1', 'term0_2'])
})
test('Updates the topic and keeps it on the same position', () => {
  const store = new Store(options)
  store.updateTopic('topic1', 'topic1_updated', ['term1_0_new', 'term1_1_new', 'term1_2_new'])
  expect(store.selectedTopics[1]).toBe('topic1_updated')
  expect(store.allTopics[1]).toBe('topic1_updated')
})
test('Adds topic to the end of topics list', () => {
  const store = new Store(options)
  store.addTopic('topic3', ['term3_0', 'term3_1', 'term3_2'])
  expect(store.allTopics[3]).toBe('topic3')
  expect(store.selectedTopics[3]).toBe('topic3')
})
test('store.toggleTopic: Toggles topic, but keeps the order', () => {
  const store = new Store(options)
  store.toggleTopic('topic1')
  expect(store.allTopics.length).toBe(3)
  expect(store.selectedTopics[1]).toBe('topic2')
  store.toggleTopic('topic1')
  expect(store.allTopics.length).toBe(3)
  expect(store.selectedTopics.length).toBe(3)
  expect(store.selectedTopics[1]).toBe('topic1')
})
test('store.toggleTopic: It gets term in appropriate order', () => {
  const store = new Store(options)
  expect(store.term).toBe('term0_0')
  store.toggleTopic('topic0')
  expect(store.term).toBe('term1_0')
  store.toggleTopic('topic0')
  expect(store.term).toBe('term0_0')
})
test('store.changeToNextTerm: It gets an appropriate term after changing to the next term', () => {
  const store = new Store(options)
  store.changeToNextTerm()
  expect(store.term).toBe('term0_1')
  store.changeToNextTerm()
  expect(store.term).toBe('term0_2')
  store.toggleTopic('topic0')
  store.changeToNextTerm()
  expect(store.term).toBe('term1_1')
})
test('store.changeToPrevTerm: It gets an appropriate term after changing to the previous term', () => {
  const store = new Store(options)
  store.changeToPrevTerm()
  expect(store.term).toBe('term2_2')
  store.changeToPrevTerm()
  expect(store.term).toBe('term2_1')
  store.toggleTopic('topic2')
  store.changeToPrevTerm()
  expect(store.term).toBe('term1_2')
})
test('store.changeToRandomTerm: It shows all terms after one cycle of changing to random', () => {
  const sort = (a: string, b: string) => a.localeCompare(b)
  const store = new Store(options)
  let randomTerms: string[] = []
  for (let i = 0; i < 9; i++) {
    store.changeToRandomTerm()
    randomTerms.push(store.term)
  }
  randomTerms = randomTerms.sort(sort)
  const terms = Array.from(topicsMap.entries()).reduce((acc, [_, value]) => {
    acc.push(...value)
    return acc
  }, [] as string[]).sort(sort)
  expect(randomTerms).toEqual(terms)
})
test('store.updateTopic: Updates the topic and resets terms to the first', () => {
  const store = new Store(options)
  store.changeToNextTerm()
  store.changeToNextTerm()
  store.updateTopic('topic0', 'topic0_updated', ['term0_0_new', 'term0_1_new', 'term0_2_new'])
  expect(store.term).toBe('term0_0_new')
})
test('store.deleteTopic: Deletes topic', () => {
  const store = new Store(options)
  store.changeToNextTerm()
  store.deleteTopic('topic1')
  expect(store.term).toBe('term0_0')
  expect(store.allTopics.length).toBe(2)
  expect(store.selectedTopics.length).toBe(2)
})
test('store sets topicInEdit', () => {
  const store = new Store(options)
  store.topicInEdit = 'topic0'
  expect(store.topicInEdit).toBe('topic0')
  store.topicInEdit = null
  expect(store.topicInEdit).toBe(null)
})
test('store sets dialogOpen', () => {
  const store = new Store(options)
  store.dialogOpen = true
  expect(store.dialogOpen).toBeTruthy()
  store.dialogOpen = false
  expect(store.dialogOpen).toBeFalsy()
})
