import { StyleSheet, View } from 'react-native'
import React, { useContext } from 'react'
import Row from './Row'
import { GameContext } from '../GameContextProvider'

const Board = () => {
  const { rows } = useContext(GameContext)

  return (
    <View style={styles.board}>
      {rows.map((row, i) => (
        <Row row={row} key={i} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  board: {
    maxWidth: 700,
    gap: 8,
    padding: 16,
  },
})

export default Board
