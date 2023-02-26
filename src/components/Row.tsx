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
        <View
          key={i}
          style={{
            ...styles.square,
            ...squareStateStyles[square.state],
            flexBasis: `${width}%`,
          }}>
          <Text
            style={{
              ...styles.text,
              // @ts-expect-error TODO: fix this
              color: squareStateStyles[square.state]?.color,
            }}>
            {square.letter}
          </Text>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  square: {
    flexShrink: 1,
    aspectRatio: 1,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fbfcff',
  },
  text: {
    fontSize: 28,
    textTransform: 'uppercase',
    color: '#393e4c',
    fontWeight: 'bold',
  },
})

export default Row
