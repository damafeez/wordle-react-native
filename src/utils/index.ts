export type SquareState = {
  state: 'empty' | 'neutral' | 'correct' | 'found' | 'wrong'
  letter: string
}

// don't check yet if squares are correct
export const computeNeutralRowState = (
  input: string,
  length: number,
): SquareState[] =>
  Array.from({ length }, (_, i) => input[i]).map(letter => {
    if (letter) return { state: 'neutral', letter }
    return { state: 'empty', letter }
  })

export const computeRowState = (
  input: string,
  correctWord: string,
): SquareState[] => {
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
