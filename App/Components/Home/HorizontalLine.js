// Importing necessary components from React and React Native
import { View, Text } from 'react-native'
import React from 'react'
import Colors from '../../Shared/Colors'

// Functional component for rendering a horizontal line
export default function HorizontalLine() {
  return (
    // Container View wrapping the horizontal line
    <View>
      {/* Horizontal line View with styling for border */}
      <View style={{
        borderWidth: 0.3,
        marginTop: 10,
        borderColor: Colors.GRAY
      }}></View>
    </View>
  )
}
