// Importing necessary components and functions from React and React Native
import { View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { UserLocationContext } from "../../Context/UserLocationContext";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Dimensions } from "react-native";
import PlaceMarker from "../Home/PlaceMarker";

// Functional component for rendering a full-screen Google Map view
export default function GoogleMapViewFull({ placeList, location }) {
  // State to manage the map region
  const [mapRegion, setmapRegion] = useState([]);

  return (
    // Container View for the Google Map
    <View>
      {/* Checking if location is available */}
      {location && (
        // MapView component for displaying the Google Map
        <MapView
          style={{
            width: Dimensions.get("screen").width,
            height: Dimensions.get("screen").height * 0.89,
          }}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0422,
            longitudeDelta: 0.0421,
          }}
        >
          {/* Marker for user's location */}
          <Marker
            title="You"
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.0422,
              longitudeDelta: 0.0421,
            }}
          />
          
          {/* Mapping through placeList to render PlaceMarkers for each place (up to 5 places) */}
          {placeList.map(
            (item, index) =>
              index <= 4 && <PlaceMarker item={item} key={index} />
          )}
        </MapView>
      )}
    </View>
  );
}
