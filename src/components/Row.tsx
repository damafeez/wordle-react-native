import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Square } from '../utils'
import { squareStateStyles } from '../constants/styles'

const Row = ({ row }: { row: Square[] }) => {
  const width = 100 / row.length

  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 8,
      }}>
      {row.map((square, i) => (
        <Text
          key={i}
          style={{
            ...styles.square,
            ...squareStateStyles[square.state],
            flexBasis: `${width}%`,
          }}>
          {square.letter}
        </Text>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  square: {
    flexShrink: 1,
    aspectRatio: 1,
    borderWidth: 2,
    borderRadius: 4,

    backgroundColor: '#fbfcff',
    color: '#393e4c',
  },
})

export default Row
