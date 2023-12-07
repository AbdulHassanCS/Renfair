// Importing necessary components from React and React Native
import { View, Text } from "react-native";
import React from "react";
import { Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../../Shared/Colors";

// Functional component for rendering a business item
export default function BusinessItem({ place }) {
  return (
    // Container View for the business item with styling
    <View
      style={{
        width: 140,
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
        padding: 10,
        margin: 5,
        elevation: 0.4,
      }}
    >
      {/* Conditionally rendering an Image if place has photos */}
      {place?.photos ? (
        <Image
          source={{
            uri:
              "https://maps.googleapis.com/maps/api/place/photo" +
              "?maxwidth=400" +
              "&photo_reference=" +
              place?.photos[0]?.photo_reference +
              "&key=AIzaSyCLAT5TBbMSTsU8QrTruZI6teOv1iF_yG8",
          }}
          style={{ width: 120, height: 80, borderRadius: 10 }}
        />
      ) : (
        // Placeholder Image if place has no photos
        <Image
          source={require("./../../../assets/placeholder.jpg")}
          style={{ width: 130, height: 100, borderRadius: 9 }}
        />
      )}
      {/* Text component for displaying business name with styling */}
      <Text
        numberOfLines={2}
        style={{
          fontSize: 16,
          marginTop: 5,
        }}
      >
        {place.name}
      </Text>
      {/* Text component for displaying business address with styling */}
      <Text
        numberOfLines={2}
        style={{
          fontFamily: "raleway",
          fontSize: 13,
          marginTop: 5,
          color: Colors.DARK_GRAY,
        }}
      >
        {place.vicinity ? place.vicinity : place.formatted_address}
      </Text>
      {/* Container View for displaying star rating */}
      <View
        style={{
          display: "flex",
          alignItems: "center",
          gap: 5,
          marginTop: 5,
          flexDirection: "row",
          marginBottom: -5,
        }}
      >
        {/* Star icon from AntDesign */}
        <AntDesign name="star" size={20} color={Colors.YELLOW} />

        {/* Text component for displaying business rating */}
        <Text>{place.rating}</Text>
      </View>
    </View>
  );
}
