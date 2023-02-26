export type SquareState = 'empty' | 'neutral' | 'correct' | 'found' | 'wrong'

export type Square = {
  state: SquareState
  letter: string
}

// don't check yet if squares are correct
export const computeNeutralRowState = (
  input: string,
  length: number,
): Square[] =>
  Array.from({ length }, (_, i) => input[i]).map(letter => {
    if (letter) return { state: 'neutral', letter }
    return { state: 'empty', letter }
  })

export const computeRowState = (
  input: string,
  correctWord: string,
): Square[] => {
  const word: (string | undefined)[] = [...correctWord]
  const inputArr = Array.from({ length: word.length }, (_, i) => input[i])

  return inputArr.map((letter, index) => {
    if (!letter) return { state: 'empty', letter: '' }
    if (letter === word[index]) {
      word[index] = undefined
      return { state: 'correct', letter }
    }

    const indexInCorrectWord = word.findIndex(
      (actualLetter, i) =>
        // do not mark letter as 'found' if there is a correct input at the same index
        actualLetter === letter && inputArr[i] !== actualLetter,
    )
    if (indexInCorrectWord > -1) {
      word[indexInCorrectWord] = undefined
      return { state: 'found', letter }
    }

    return { state: 'wrong', letter }
  })
}

export const computeKeyboardState = (
  rows: Square[][],
  hierarchy: Square['state'][] = ['correct', 'found', 'wrong'],
): Record<string, SquareState> => {
  const indexMap = hierarchy.reduce(
    (prev, curr, i) => ({ ...prev, [curr]: i }),
    {} as Record<Square['state'], number>,
  )
  const result: Record<string, SquareState> = {}
  for (const row of rows) {
    if (row[0]?.state === 'empty') return result

    row.forEach(({ state, letter }) => {
      if (
        hierarchy.includes(state) &&
        indexMap[state] < (indexMap[result[letter]] ?? Infinity)
      ) {
        result[letter] = state
      }
    })
  }

  return result
}

export const isAlphabet = (s: string): boolean =>
  s.length === 1 &&
  ((s.charCodeAt(0) >= 65 && s.charCodeAt(0) <= 90) || // uppercase character
    (s.charCodeAt(0) >= 97 && s.charCodeAt(0) <= 122)) // lowercase character

export const binarySearch = (arr: string[], value: string) => {
  let start = 0
  let end = arr.length - 1

  while (start <= end) {
    const middle = Math.floor((end + start) / 2)
    if (arr[middle] === value) return middle
    // go to right
    if (arr[middle] < value) start = middle + 1
    // go to left
    if (arr[middle] > value) end = middle - 1
  }

  return -1
}
