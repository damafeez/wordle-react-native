import { StyleSheet } from 'react-native'

export const squareStateStyles = StyleSheet.create({
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
