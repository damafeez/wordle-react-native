import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useMemo } from 'react'
import { GameContext } from '../GameContextProvider'
import { computeKeyboardState } from '../utils'
import { squareStateStyles } from '../constants/styles'
import { keyBindings, keyRows } from '../constants/keyboard'

const Keyboard = () => {
  const { rows, handleKeyPress } = useContext(GameContext)
  const keyboardState = useMemo(() => computeKeyboardState(rows), [rows])

  return (
    <View style={styles.keyboard}>
      {keyRows.map((keyRow, i) => (
        <View style={styles.row} key={i}>
          {keyRow.map(key => (
            <TouchableOpacity
              onPress={() => handleKeyPress(key)}
              style={[
                styles.button,
                ['a', 'l'].includes(key) && {
                  flex: 1,
                },
                [keyBindings.back, keyBindings.enter].includes(key) && {
                  flex: 1.3,
                },
                squareStateStyles[keyboardState[key]],
              ]}
              key={key}>
              <Text style={styles.text}>{key}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  )
}

export default Keyboard

const gap = 8
const styles = StyleSheet.create({
  keyboard: {
    gap,
  },
  row: {
    flexDirection: 'row',
    gap,
  },
  button: {
    flex: 1,
    height: 48,
    backgroundColor: '#dce1ed',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textTransform: 'uppercase',
    fontWeight: '600',
  },
})
