import { View } from 'react-native'
import React from 'react'
import type { ISquare } from '../utils'
import Square from './Square'

export default function Row({ row }: { row: ISquare[] }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 8,
      }}>
      {row.map((square, i) => (
        <Square
          key={i}
          state={square.state}
          style={{
            flex: 1,
          }}>
          {square.letter}
        </Square>
      ))}
    </View>
  )
}
