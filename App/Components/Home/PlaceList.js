// Importing necessary components and functions from React, React Native, and other libraries
import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FlatList } from "react-native";
import PlaceItem from "./PlaceItem";
import PlaceItemBig from "./PlaceItemBig";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";

// Functional component for rendering a list of places
const PlaceList = (props) => {
  // Destructuring props to get placeList and location
  let { placeList, location } = props;

  // Hook for navigation
  const navigator = useNavigation();

  // Function to navigate to place details screen when a place is clicked
  const onPlaceClick = (item) => {
    navigator.navigate("place-detail", { place: item, location });
  };

  return (
    // Container View for the list of places
    <View>
      {/* Text component displaying the number of found places */}
      <Text style={{ fontSize: 20, marginTop: 10 }}>
        Found {placeList.length} Places
      </Text>

      {/* Mapping through placeList to render each place */}
      {placeList?.map((item, index) => {
        // Checking if the current place is in the user's favorites
        let isFav = props?.get_user_details?.favourites?.filter((e) => {
          return e?.reference == item?.reference;
        });

        console.log(isFav);

        return (
          // TouchableOpacity to make each place item tappable
          <TouchableOpacity key={index} onPress={() => onPlaceClick(item)}>
            {/* Conditional rendering based on the index */}
            {index % 4 == 0 ? (
              // Rendering a big place item if the index is a multiple of 4
              <PlaceItemBig place={item} />
            ) : (
              // Rendering a regular place item otherwise
              <PlaceItem isFav={isFav?.length > 0} place={item} />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// Mapping state to props for the component
const mapStateToProps = (state) => ({
  errors: state.errors.errors,
  get_user_details: state.main.get_user_details,
});

// Connecting the component to Redux store
export default connect(mapStateToProps, {})(PlaceList);
