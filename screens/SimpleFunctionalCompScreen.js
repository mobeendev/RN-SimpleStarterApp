import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const SimpleFunctionalCompScreen = () => {
  return (
    <View style={styles.container}>
      <Text> A Simple Functional Component </Text>
    </View>
  )
}

export default SimpleFunctionalCompScreen


const styles = StyleSheet.create({
    container: {
      backgroundColor: '#FFF',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
  })