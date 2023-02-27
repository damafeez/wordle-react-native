import { StyleSheet, View } from 'react-native'
import React from 'react'
import Row from './Row'
import { Square } from '../utils'

const Board = ({ rows }: { rows: Square[][] }) => {
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
    paddingHorizontal: 16,
  },
})

export default Board
