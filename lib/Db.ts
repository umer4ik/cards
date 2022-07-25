type StoreData = {
  topicsMap: Map<string, string[]>,
  topicsOrderSet: Set<string>,
  selectedTopicsSet: Set<string>,
  termIndex: number,
  topicInEdit: string | null,
  dialogOpen: boolean
}
export interface Db {
  save(options: StoreData): Promise<void>
  get(): Promise<StoreData>
}

export class LocalStorageDb implements Db {
  save({ topicsMap, topicsOrderSet, selectedTopicsSet, termIndex, dialogOpen, topicInEdit }: StoreData): Promise<void> {
    const topicsMapObj = Array.from(topicsMap.entries()).reduce((acc, [k, v]) => {
      acc[k] = v
      return acc
    }, {} as { [key: string]: string[] })
    const topicsOrder = Array.from(topicsOrderSet)
    const selectedTopics = Array.from(selectedTopicsSet)
    window.localStorage.setItem('topics-store', JSON.stringify({
      topicsMapObj,
      topicsOrder,
      selectedTopics,
      termIndex,
      dialogOpen,
      topicInEdit
    }))
    return Promise.resolve()
  }

  get() {
    const str: string | null = window.localStorage.getItem('topics-store')
    const topicsMap: Map<string, string[]> = new Map()
    let topicsOrderSet: Set<string> = new Set()
    let selectedTopicsSet: Set<string> = new Set()
    let termIndex = 0
    let dialogOpen = false
    let topicInEdit = null
    if (str) {
      try {
        const data = JSON.parse(str)
          const {
          topicsMapObj,
          topicsOrder,
          selectedTopics
        } = data;
        ({ dialogOpen, topicInEdit, termIndex } = data)
        Object.keys(topicsMapObj).forEach(k => {
          topicsMap.set(k, topicsMapObj[k])
        })
        topicsOrderSet = new Set(topicsOrder)
        selectedTopicsSet = new Set(selectedTopics)
      } catch (error) {
        console.error(error)
      }
    }
    return Promise.resolve({
      topicsMap,
      topicsOrderSet,
      selectedTopicsSet,
      termIndex,
      dialogOpen,
      topicInEdit
    })
  }
}
