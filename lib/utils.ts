export const createArray = (length: number) => Array(length).fill('').map((_, i)=> i)

export const randomNumber = (max: number) =>  Math.round(Math.random() * max)

export function removeFromArray<T>(index: number, arr: T[]) { return arr.filter((_, i) => i !== index) }

export function checkIfNonNull<T>(x: T): asserts x is NonNullable<T> {
  if (x === null || x === undefined) {
    throw Error('is null!')
  }
}

export function checkIfEl(el?: HTMLElement | null): asserts el is HTMLElement{
  if (el === null || el === undefined) {
    throw new Error('el is missing')
  }
}

export const prepareTerms = (terms: string) => terms.split('\n').map(x => x.trim()).filter(x => !!x)
