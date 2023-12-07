// Importing necessary components from React and React Native
import React from "react";
import { View, Text, Image } from "react-native";

// Importing Colors object from the shared Colors module
import Colors from "../../Shared/Colors";

// Functional component for rendering a category item
export default function CategoryItem({ category }) {
  return (
    // Container View styling
    <View
      style={{
        padding: 5,
        alignItems: "center",
        margin: 5,
        width: 95,
        height: 95,
        justifyContent: "center",
        borderRadius: 15,
        backgroundColor: Colors.GRAY,
      }}
    >
      {/* Displaying the category icon using an Image component */}
      <Image source={category.icon} style={{ width: 40, height: 30 }} />

      {/* Displaying the category name using a Text component */}
      <Text style={{ fontSize: 13, fontFamily: "raleway", paddingTop: 7 }}>
        {category.name}
      </Text>
    </View>
  );
}
