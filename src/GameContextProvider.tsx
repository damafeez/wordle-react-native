import { createContext, ReactNode, useState } from 'react'
import words from './constants/words'

type NonEmptyString<T extends string = string> = T extends '' ? never : T
export type GameContextI = {
  correctWord: NonEmptyString
  numRows: number
  rows: string[]
  currentRow: number
  goToNextRow: () => void
  handleKeyPress: () => void

  gameState: 'playing' | 'lost' | 'won'
}

const numRows = 6 // number of rows
export const GameContext = createContext<GameContextI>({
  correctWord: '',
  numRows: 6,
  rows: Array.from({ length: numRows }, () => ''),
  gameState: 'playing',
  currentRow: 0,
  goToNextRow: () => {},
  handleKeyPress: () => {},
})

export default function GameContextProvider({
  children,
}: {
  children: ReactNode
}) {
  const [currentRow, setCurrentRow] = useState(0)
  const goToNextRow = () => {
    if (currentRow < numRows - 1) setCurrentRow(currentRow + 1)
  }

  return (
    <GameContext.Provider
      value={{
        correctWord: words[Math.floor(Math.random() * words.length)],
        numRows,
        rows: Array.from({ length: numRows }, () => ''),
        currentRow,
        goToNextRow,
        handleKeyPress: () => {},
        gameState: 'playing',
      }}>
      {children}
    </GameContext.Provider>
  )
}
