export type SquareState = {
  state: 'empty' | 'neutral' | 'correct' | 'found' | 'wrong'
  letter: string
}

export const computeRowState = (
  correctWord: string,
  input: string,
): SquareState[] => {
  const word: (string | undefined)[] = [...correctWord]
  const inputArr = Array.from({ length: word.length }, (_, i) => input[i])

  return inputArr.map((letter, index) => {
    if (!letter) return { state: 'empty', letter }
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
