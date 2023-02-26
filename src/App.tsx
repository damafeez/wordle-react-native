import React from 'react'
import { SafeAreaView, StatusBar, Text, useColorScheme } from 'react-native'

import { Colors } from 'react-native/Libraries/NewAppScreen'

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }

  return (
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
    </SafeAreaView>
  )
}

export default App
