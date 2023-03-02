import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native'
import React, { useMemo } from 'react'
import { computeKeyboardState, ISquare } from '../utils'
import { getSquareStyle } from '../constants/styles'
import { keyBindings, keyRows } from '../constants/keyboard'

const Keyboard = ({
  rows,
  handleKeyPress,
}: {
  rows: ISquare[][]
  handleKeyPress: (key: string) => void
}) => {
  const keyboardState = useMemo(() => computeKeyboardState(rows), [rows])
  const isDarkMode = useColorScheme() === 'dark'

  return (
    <View style={styles.keyboard}>
      {keyRows.map((keyRow, i) => (
        <View style={styles.row} key={i}>
          {keyRow.map(key => {
            const stateStyles = keyboardState[key]
              ? getSquareStyle(keyboardState[key], isDarkMode)
              : {
                  color: isDarkMode ? '#fdfdfd' : undefined,
                }

            return (
              <TouchableOpacity
                onPress={() => handleKeyPress(key)}
                style={[
                  styles.button,
                  { backgroundColor: isDarkMode ? '#808384' : '#dce1ed' },
                  ['a', 'l'].includes(key) && {
                    flex: 1,
                  },
                  [keyBindings.back, keyBindings.enter].includes(key) && {
                    flex: 1.3,
                  },
                  getSquareStyle(keyboardState[key], isDarkMode),
                ]}
                key={key}>
                <Text
                  style={{
                    ...styles.text,
                    color: stateStyles.color,
                  }}>
                  {key}
                </Text>
              </TouchableOpacity>
            )
          })}
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
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textTransform: 'uppercase',
    fontWeight: '600',
    fontSize: 18,
  },
})
