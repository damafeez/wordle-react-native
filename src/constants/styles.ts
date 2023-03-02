import { SquareState } from './../utils/index'
import { StyleSheet } from 'react-native'

const darkStyles = StyleSheet.create({
  empty: {
    borderColor: '#3a3a3c',
  },
  neutral: {
    borderColor: '#565758',
    color: '#fdfdfd',
  },
  wrong: {
    backgroundColor: '#3a3a3c',
  },
  found: {
    backgroundColor: '#f3c237',
  },
  correct: {
    backgroundColor: '#538d4e',
  },
})

const styles = StyleSheet.create({
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

export const getSquareStyle = (state: SquareState, isDarkMode: boolean) => ({
  ...styles[state],
  ...(isDarkMode && darkStyles[state]),
})
