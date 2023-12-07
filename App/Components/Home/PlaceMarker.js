// Importing necessary components from React and React Native
import { View, Text } from "react-native";
import React from "react";
import { Marker } from "react-native-maps";

// Functional component for rendering a marker on the map
export default function PlaceMarker({ item, location }) {
  // Creating a temporary location object based on item or provided location
  let _tempL = item
    ? {
        latitude: item?.geometry?.location?.lat,
        longitude: item?.geometry?.location?.lng,
        latitudeDelta: 0.0522,
        longitudeDelta: 0.0421,
      }
    : location;

  // Rendering the Marker component with title and coordinate
  return <Marker title={item?.name} coordinate={_tempL}></Marker>;
}
