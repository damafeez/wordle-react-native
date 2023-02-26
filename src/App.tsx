import React from 'react'
import {
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native'

import { Colors } from 'react-native/Libraries/NewAppScreen'
import Board from './components/Board'
import Keyboard from './components/Keyboard'
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
        <View
          style={{
            height: '100%',
            padding: 8,
          }}>
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
          <View
            style={{
              marginTop: 'auto',
            }}>
            <Keyboard />
          </View>
        </View>
      </SafeAreaView>
    </GameContextProvider>
  )
}

export default App
