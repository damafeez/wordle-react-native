import { createContext, ReactNode, useMemo, useRef, useState } from 'react'
import { keyBindings } from './constants/keyboard'
import words from './constants/words'
import {
  binarySearch,
  computeNeutralRowState,
  computeRowState,
  isAlphabet,
  Square,
} from './utils'

type NonEmptyString<T extends string = string> = T extends '' ? never : T

type IGameState = 'playing' | 'lost' | 'won' | 'uninitialized'
export type IGameContext = {
  correctWord: NonEmptyString
  numRows: number
  rows: Square[][]
  currentRow: number
  handleKeyPress: (key: string) => void
  gameState: IGameState
}

export const GameContext = createContext<IGameContext>({
  correctWord: '',
  numRows: 0,
  rows: [],
  gameState: 'uninitialized',
  currentRow: 0,
  handleKeyPress: () => {},
})

export default function GameContextProvider({
  children,
}: {
  children: ReactNode
}) {
  const numRows = 6 // number of rows
  const correctWordRef = useRef(words[Math.floor(Math.random() * words.length)]) // get a random word

  const [currentRow, setCurrentRow] = useState(0)
  const [rowInputs, setRowInputs] = useState(
    Array.from({ length: numRows }, () => ''),
  )
  const [gameState, setGameState] = useState<IGameState>('playing')

  const rows = useMemo(
    () =>
      rowInputs.map((input, i) =>
        currentRow > i
          ? computeRowState(input, correctWordRef.current)
          : computeNeutralRowState(input, correctWordRef.current.length),
      ),
    [currentRow, rowInputs],
  )

  const handleKeyPress = (key: string) => {
    if (gameState !== 'playing') {
      return
    }
    const inputLength = rowInputs[currentRow].length
    const numColumns = correctWordRef.current.length

    // row has available square space
    if (isAlphabet(key) && inputLength < numColumns) {
      setRowInputs(oldValue => {
        const newValue = [...oldValue]
        newValue[currentRow] += key.toLowerCase()

        return newValue
      })
    } else if (inputLength === numColumns && key === keyBindings.enter) {
      // use binarySearch since words is already sorted
      if (binarySearch(words, rowInputs[currentRow]) > -1) {
        if (rowInputs[currentRow] === correctWordRef.current) {
          setGameState('won')
          console.log("Hurray! You're a winner.")
        }

        goToNextRow()
        if (currentRow >= numRows && gameState === 'playing') {
          setGameState('lost')
          console.log('You lost :(')
        }
      } else {
        console.log('Word not found.')
      }
    } else if (inputLength && key === keyBindings.back) {
      setRowInputs(oldValue => {
        const newValue = [...oldValue]
        newValue[currentRow] = newValue[currentRow].slice(0, -1)

        return newValue
      })
    }
  }

  const goToNextRow = () => {
    if (currentRow < numRows - 1) setCurrentRow(currentRow + 1)
  }

  return (
    <GameContext.Provider
      value={{
        correctWord: correctWordRef.current,
        numRows,
        rows,
        currentRow,
        handleKeyPress,
        gameState,
      }}>
      {children}
    </GameContext.Provider>
  )
}
