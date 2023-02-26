import React from 'react'
import { SafeAreaView, StatusBar, Text, useColorScheme } from 'react-native'

import { Colors } from 'react-native/Libraries/NewAppScreen'
import Board from './components/Board'
import GameContextProvider from './GameContextProvider'

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }

  return (
    <GameContextProvider>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />

        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 32,
            textAlign: 'center',
            paddingVertical: 14,
            color: isDarkMode ? Colors.white : Colors.black,
          }}>
          WORDLE
        </Text>

        <Board />
      </SafeAreaView>
    </GameContextProvider>
  )
}

export default App
