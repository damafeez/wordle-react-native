import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  useColorScheme,
} from 'react-native'
import React, { PropsWithChildren } from 'react'
import type { SquareState } from '../utils'
import { getSquareStyle } from '../constants/styles'

type SquareProps = PropsWithChildren<{
  state: SquareState
  style: StyleProp<ViewStyle>
}>

export default function Square({ state, style, children }: SquareProps) {
  const isDarkMode = useColorScheme() === 'dark'

  return (
    <View
      style={{
        ...styles.square,
        backgroundColor: isDarkMode ? 'transparent' : '#fbfcff',
        ...getSquareStyle(state, isDarkMode),
        ...(style as Object),
      }}>
      <Text
        style={{
          ...styles.text,
          color: getSquareStyle(state, isDarkMode)?.color,
        }}>
        {children}
      </Text>
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
  },
  text: {
    fontSize: 28,
    textTransform: 'uppercase',
    color: '#393e4c',
    fontWeight: 'bold',
  },
})
