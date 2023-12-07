// Importing necessary components and functions from React and React Native
import { View, Text } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../../Shared/Colors";
import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import GoogleMapView from "../Home/GoogleMapView";
import { TouchableOpacity } from "react-native";
import Share from "../../Services/Share";

// Functional component for rendering details of a place
export default function PlaceDetailItem({ place, onDirectionClick, rating }) {
  return (
    // Container View for place details
    <View>
      {/* Text component displaying the place name with styling */}
      <Text style={{ fontSize: 26 }}>{place.name}</Text>

      {/* Container View for displaying star rating */}
      <View
        style={{
          display: "flex",
          alignItems: "center",
          gap: 5,
          marginTop: 5,
          flexDirection: "row",
        }}
      >
        {/* Star icon from AntDesign */}
        <AntDesign name="star" size={20} color={Colors.YELLOW} />

        {/* Text component displaying place rating */}
        <Text>{place?.rating || rating}</Text>
      </View>

      {/* Conditionally rendering an Image if place has photos */}
      {place?.photos ? (
        <Image
          source={{
            uri:
              "https://maps.googleapis.com/maps/api/place/photo" +
              "?maxwidth=400" +
              "&photo_reference=" +
              place?.photos[0]?.photo_reference +
              "&key=AIzaSyAlIDUiTW6M9p6qb7mHsMCvqk0_OMO3MV0",
          }}
          style={{
            width: "100%",
            height: 160,
            borderRadius: 15,
            marginTop: 10,
          }}
        />
      ) : null}

      {/* Text component displaying place address with styling */}
      <Text
        style={{ fontSize: 16, marginTop: 10, color: Colors.DARK_GRAY }}
        numberOfLines={2}
      >
        {place.vicinity ? place.vicinity : place.formatted_address}
      </Text>

      {/* Conditionally rendering the open/closed status if available */}
      {place?.opening_hours ? (
        <Text style={{ fontFamily: "raleway" }}>
          {place?.opening_hours?.open_now == true ? "(Open)" : "(Closed)"}
        </Text>
      ) : null}

      {/* Container View for the "Direction" and "Share" buttons */}
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          display: "flex",
          gap: 10,
        }}
      >
        {/* TouchableOpacity for the "Direction" button */}
        <TouchableOpacity
          onPress={() => onDirectionClick()}
          style={{
            direction: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            backgroundColor: Colors.GRAY,
            width: 110,
            padding: 3,
            borderRadius: 40,
            justifyContent: "center",
          }}
        >
          {/* Navigation icon from Ionicons */}
          <Ionicons name="navigate-circle-outline" size={24} color="black" />

          {/* Text component for the "Direction" button */}
          <Text style={{ fontFamily: "raleway", fontSize: 16 }}>Direction</Text>
        </TouchableOpacity>

        {/* TouchableOpacity for the "Share" button */}
        <TouchableOpacity
          onPress={() => Share.SharePlace(place)}
          style={{
            direction: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            backgroundColor: Colors.GRAY,
            width: 90,
            padding: 3,
            borderRadius: 40,
            justifyContent: "center",
          }}
        >
          {/* Share icon from Ionicons */}
          <Ionicons name="md-share-outline" size={24} color="black" />

          {/* Text component for the "Share" button */}
          <Text style={{ fontFamily: "raleway", fontSize: 16 }}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
