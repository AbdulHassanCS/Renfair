// Importing necessary components and functions from React and React Native
import { View, Text } from "react-native";
import React from "react";
import Colors from "../../Shared/Colors";
import { Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FlatList } from "react-native";
import BusinessItem from "./BusinessItem";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

// Functional component for rendering a list of businesses
export default function BusinessList({ placeList }) {
  // Hook for navigation
  const navigation = useNavigation();

  return (
    // Container View for the business list
    <View>
      {/* Linear Gradient for background styling */}
      <LinearGradient
        colors={["transparent", Colors.WHITE]}
        style={{ padding: 20, width: Dimensions.get("screen").width }}
      >
        {/* FlatList for rendering the list of businesses horizontally */}
        <FlatList
          data={placeList}
          horizontal={true}
          renderItem={({ item, index }) =>
            // Rendering BusinessItem component for each item in placeList (up to 6 items)
            index <= 6 && (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("place-detail", {
                    place: item,
                  })
                }
              >
                <BusinessItem place={item} />
              </TouchableOpacity>
            )
          }
        />
      </LinearGradient>
    </View>
  );
}
