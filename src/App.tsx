import React, { useContext } from 'react'
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native'

import { Colors } from 'react-native/Libraries/NewAppScreen'
import Board from './components/Board'
import Keyboard from './components/Keyboard'
import GameContextProvider, { GameContext } from './GameContextProvider'

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
        <Home />
      </SafeAreaView>
    </GameContextProvider>
  )
}

export default App

const Home = () => {
  const isDarkMode = useColorScheme() === 'dark'
  const { gameState, rows, handleKeyPress } = useContext(GameContext)

  return (
    <View
      style={{
        height: '100%',
        padding: 8,
      }}>
      <Text
        style={{
          ...styles.title,
          color: isDarkMode ? Colors.white : 'gray',
        }}>
        WORDLE
      </Text>

      <Board rows={rows} />

      <View
        style={{
          marginTop: 'auto',
          marginBottom: 'auto',
        }}>
        {gameState !== 'playing' && (
          <View style={styles.gameState}>
            <Text
              style={{
                textTransform: 'capitalize',
              }}>
              {gameState}
            </Text>
          </View>
        )}
      </View>

      <Keyboard rows={rows} handleKeyPress={handleKeyPress} />
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    textAlign: 'center',
    paddingVertical: 14,
    marginBottom: 8,
  },
  gameState: {
    backgroundColor: '#dce1ed80',
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 15,
  },
})
