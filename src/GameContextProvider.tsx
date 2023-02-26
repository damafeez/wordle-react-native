import { createContext, ReactNode, useMemo, useRef, useState } from 'react'
import words from './constants/words'
import { computeRowState, SquareState } from './utils'

type NonEmptyString<T extends string = string> = T extends '' ? never : T
export type IGameContext = {
  correctWord: NonEmptyString
  numRows: number
  rows: SquareState[][]
  currentRow: number
  goToNextRow: () => void
  handleKeyPress: () => void

  gameState: 'playing' | 'lost' | 'won' | 'uninitialized'
}

export const GameContext = createContext<IGameContext>({
  correctWord: '',
  numRows: 0,
  rows: [],
  gameState: 'uninitialized',
  currentRow: 0,
  goToNextRow: () => {},
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

  const rows = useMemo(
    () =>
      rowInputs.map(input => computeRowState(correctWordRef.current, input)),
    [rowInputs],
  )

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
        goToNextRow,
        handleKeyPress: () => {},
        gameState: 'playing',
      }}>
      {children}
    </GameContext.Provider>
  )
}
