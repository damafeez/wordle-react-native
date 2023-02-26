import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

export const keyBindings = {
  back: '⌫',
  enter: '⏎',
}

const keyRows = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  [keyBindings.back, 'z', 'x', 'c', 'v', 'b', 'n', 'm', keyBindings.enter],
]

const Keyboard = () => {
  return (
    <View style={styles.keyboard}>
      {keyRows.map((keyRow, i) => (
        <View style={styles.row} key={i}>
          {keyRow.map(key => (
            <TouchableOpacity
              style={[
                styles.button,
                ['a', 'l'].includes(key) && {
                  flex: 1,
                },
                [keyBindings.back, keyBindings.enter].includes(key) && {
                  flex: 1.2,
                },
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
