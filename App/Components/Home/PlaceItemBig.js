// Importing necessary components from React and React Native
import { View, Text, Image } from "react-native";
import React from "react";
import Colors from "../../Shared/Colors";
import { AntDesign } from "@expo/vector-icons";

// Importing the HorizontalLine component
import HorizontalLine from "./HorizontalLine";

// Functional component for rendering a big place item
export default function PlaceItemBig({ place }) {
  return (
    // Container View styling with top margin
    <View style={{ marginTop: 20 }}>
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
          style={{ width: "100%", height: 130, borderRadius: 15 }}
        />
      ) : null}

      {/* Text component for place name with styling */}
      <Text numberOfLines={2} style={{ fontSize: 18, marginBottom: 2 }}>
        {place.name}
      </Text>

      {/* Text component for place vicinity with styling */}
      <Text
        style={{ fontSize: 16, marginBottom: 5, color: Colors.DARK_GRAY }}
        numberOfLines={2}
      >
        {place.vicinity}
      </Text>

      {/* Container View for displaying star rating */}
      <View
        style={{
          display: "flex",
          alignItems: "center",
          gap: 5,
          flexDirection: "row",
        }}
      >
        {/* Star icon from AntDesign */}
        <AntDesign name="star" size={20} color={Colors.YELLOW} />

        {/* Text component for displaying place rating */}
        <Text>{place.rating}</Text>
      </View>

      {/* Rendering the HorizontalLine component for separation */}
      <HorizontalLine />
    </View>
  );
}
