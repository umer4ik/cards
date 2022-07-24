type StoreData = {
  topicsMap: Map<string, string[]>,
  topicsOrderSet: Set<string>,
  selectedTopicsSet: Set<string>
}
export interface Db {
  save(options: StoreData): Promise<void>
  get(): Promise<StoreData>
}

export class LocalStorageDb implements Db {
  save({ topicsMap, topicsOrderSet, selectedTopicsSet }: StoreData): Promise<void> {
    const topicsMapObj = Array.from(topicsMap.entries()).reduce((acc, [k, v]) => {
      acc[k] = v
      return acc
    }, {} as { [key: string]: string[] })
    const topicsOrder = Array.from(topicsOrderSet)
    const selectedTopics = Array.from(selectedTopicsSet)
    window.localStorage.setItem('topics', JSON.stringify({
      topicsMapObj,
      topicsOrder,
      selectedTopics
    }))
    return Promise.resolve()
  }

  get() {
    const str: string | null = window.localStorage.getItem('topics')
    const topicsMap: Map<string, string[]> = new Map()
    let topicsOrderSet: Set<string> = new Set()
    let selectedTopicsSet: Set<string> = new Set()
    if (str) {
      try {
        const data = JSON.parse(str)
        if (data.topicsMapObj && data.topicsOrder && data.selectedTopics) {
          const {
            topicsMapObj,
            topicsOrder,
            selectedTopics
          } = data
          Object.keys(topicsMapObj).forEach(k => {
            topicsMap.set(k, topicsMapObj[k])
          })
          topicsOrderSet = new Set(topicsOrder)
          selectedTopicsSet = new Set(selectedTopics)
        }
      } catch (error) {
        console.error(error)
      }
    }
    return Promise.resolve({
      topicsMap,
      topicsOrderSet,
      selectedTopicsSet
    })
  }
}