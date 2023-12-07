// Importing necessary components and functions from React and React Native
import { View, Text } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";
import Colors from "../../Shared/Colors";
import { Image } from "react-native";
import { TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Functional component for rendering a search bar
export default function SearchBar({ setSearchText }) {
  // State to manage the search input
  const [searchInput, setSearchInput] = useState();

  return (
    // Container View for the search bar
    <View>
      {/* Background Linear Gradient for styling */}
      <LinearGradient
        colors={[Colors.WHITE, "transparent"]}
        style={{ padding: 20, width: Dimensions.get("screen").width }}
      >
        {/* Container View for the logo */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {/* Image component for displaying the logo */}
          <Image
            source={require("./../../../assets/renfair.png")}
            style={{ width: 50, height: 50, borderRadius: 100 }}
          />
        </View>

        {/* Container View for the search input */}
        <View
          style={{
            display: "flex",
            marginTop: 5,
            flexDirection: "row",
            padding: 10,
            gap: 5,
            elevation: 0.7,
            alignItems: "center",
            backgroundColor: Colors.WHITE,
            borderRadius: 5,
          }}
        >
          {/* Search icon from Ionicons */}
          <Ionicons name="search" size={24} color={Colors.DARK_GRAY} />

          {/* TextInput component for entering the search query */}
          <TextInput
            placeholder="Search"
            style={{ backgroundColor: Colors.WHITE, width: "80%" }}
            onChangeText={(value) => setSearchInput(value)}
            onSubmitEditing={() => setSearchText(searchInput)}
          />
        </View>
      </LinearGradient>
    </View>
  );
}
