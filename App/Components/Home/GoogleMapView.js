// Importing necessary components from React and React Native
import React, { useContext, useEffect, useState } from "react";
import { View, Text, Dimensions } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

// Importing the UserLocationContext and PlaceMarker components
import { UserLocationContext } from "../../Context/UserLocationContext";
import PlaceMarker from "./PlaceMarker";
import Colors from "../../Shared/Colors";

// Functional component for rendering a Google Map with markers
export default function GoogleMapView(props) {
  // Destructuring props to get placeList, location, and notMe
  let { placeList, location, notMe } = props;

  // State to manage the map region
  const [mapRegion, setmapRegion] = useState([]);

  return (
    // Container View styling with top margin
    <View style={{ marginTop: 20 }}>
      {/* Heading for the map section */}
      <Text
        style={{
          fontSize: 20,
          marginBottom: 10,
          fontWeight: "600",
        }}
      >
        Top Near By Places
      </Text>

      {/* Container View for the MapView with border radius */}
      <View
        style={{
          borderRadius: 20,
          overflow: "hidden",
        }}
      >
        {/* MapView component for displaying the map */}
        <MapView
          style={{
            width: Dimensions.get("screen").width * 0.89,
            height: Dimensions.get("screen").height * 0.23,
          }}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          region={{
            latitude: location?.latitude,
            longitude: location?.longitude,
            latitudeDelta: 0.0422,
            longitudeDelta: 0.0421,
          }}
        >
          {/* Marker for the user's location */}
          {!notMe && (
            <Marker
              title="You"
              coordinate={{
                latitude: location?.latitude,
                longitude: location?.longitude,
                latitudeDelta: 0.0422,
                longitudeDelta: 0.0421,
              }}
            />
          )}

          {/* Mapping through placeList to render markers for each place */}
          {placeList?.map((item, index) => {
            let l = {
              latitude: item?.geometry.location?.lat,
              longitude: item?.geometry.location?.lng,
              latitudeDelta: 0.0422,
              longitudeDelta: 0.0421,
            };

            // Rendering PlaceMarker component for each place
            return <PlaceMarker location={l} key={index} />;
          })}
        </MapView>
      </View>
    </View>
  );
}
