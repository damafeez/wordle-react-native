import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SquareState } from '../utils'

const Row = ({ row }: { row: SquareState[] }) => {
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

const squareStateStyles = StyleSheet.create({
  empty: {
    borderWidth: 2,
    borderColor: '#dee1e9',
  },
  neutral: {
    borderWidth: 2,
    borderColor: '#a7adc0',
  },
  wrong: {
    backgroundColor: '#a4aec4',
    color: 'white',
  },
  found: {
    backgroundColor: '#f3c237',
    color: 'white',
  },
  correct: {
    backgroundColor: '#79b851',
    color: 'white',
  },
})

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
