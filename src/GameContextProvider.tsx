import { createContext, ReactNode, useMemo, useRef, useState } from 'react'
import { keyBindings } from './constants/keyboard'
import { Alert } from 'react-native'
import words from './constants/words'
import {
  binarySearch,
  computeNeutralRowState,
  computeRowState,
  isAlphabet,
  ISquare,
} from './utils'

type NonEmptyString<T extends string = string> = T extends '' ? never : T

type IGameState = 'playing' | 'lost' | 'won' | 'uninitialized'
export type IGameContext = {
  correctWord: NonEmptyString
  numRows: number
  rows: ISquare[][]
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

  // TODO: implement game reset
  const resetGame = () => undefined

  const goToNextRow = () => {
    if (currentRow < numRows) setCurrentRow(currentRow + 1)
  }

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
    }
    // backspace
    else if (inputLength > 0 && key === keyBindings.back) {
      setRowInputs(oldValue => {
        const newValue = [...oldValue]
        newValue[currentRow] = newValue[currentRow].slice(0, -1)

        return newValue
      })
    } else if (inputLength === numColumns && key === keyBindings.enter) {
      // use binarySearch since words is already sorted
      if (binarySearch(words, rowInputs[currentRow]) > -1) {
        goToNextRow()
        if (rowInputs[currentRow] === correctWordRef.current) {
          setGameState('won')
          Alert.alert(
            "Hurray! You're a rockstar",
            'Would you like to play again?',
            [
              {
                text: 'No, cancel',
                style: 'cancel',
              },
              { text: "Yes, let's go", onPress: resetGame },
            ],
          )
        } else if (currentRow >= numRows - 1) {
          setGameState('lost')
          Alert.alert('Awww, you lost', 'Would you like to play again?', [
            {
              text: 'No',
              style: 'cancel',
            },
            { text: 'Yes', onPress: resetGame },
          ])
        }
      } else {
        Alert.alert('Word not found')
      }
    }
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
