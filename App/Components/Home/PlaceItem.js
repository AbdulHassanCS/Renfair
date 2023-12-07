// Importing necessary components and functions from React and React Native
import { View, Text, Image } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../../Shared/Colors";
import HorizontalLine from "./HorizontalLine";
import { TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { getAuth } from "firebase/auth";
import { updateUser } from "../../../state-management/actions/auth/FirebaseAuthActions";

// Functional component for rendering a place item
const PlaceItem = (props) => {
  let { place, isFav } = props;
  const auth = getAuth();

  // Function to handle adding/removing a place from favorites
  const onFav = () => {
    // Getting previous favorites from user details
    let prevFav = props?.get_user_details?.favourites;

    // Checking if the place is already a favorite
    let isAlreadyFav = prevFav?.filter((e) => e?.reference == place?.reference);

    // Updating favorites based on the current state
    if (isAlreadyFav?.length > 0) {
      prevFav = prevFav?.filter((e) => e?.reference != place?.reference);
    } else {
      prevFav?.push(place);
    }

    // Creating data object to update user details
    let data = {
      favourites: prevFav,
    };

    // Getting the current user
    const user = auth.currentUser;

    // Calling the updateUser action to update user details
    props?.updateUser(user?.uid, data);
  };

  return (
    // Container View for the place item
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
        marginTop: 20,
      }}
    >
      {/* Conditionally rendering an Image if place has photos, else rendering a placeholder Image */}
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
          style={{ width: 110, height: 110, borderRadius: 15 }}
        />
      ) : (
        <Image
          source={require("./../../../assets/placeholder.jpg")}
          style={{ width: 110, height: 110, borderRadius: 15 }}
        />
      )}

      {/* Container View for place details */}
      <View style={{ flex: 1 }}>
        {/* Text component for displaying place name with styling */}
        <Text numberOfLines={2} style={{ fontSize: 18, marginBottom: 5 }}>
          {place.name}
        </Text>

        {/* Text component for displaying place address with styling */}
        <Text
          style={{ fontSize: 16, marginBottom: 5, color: Colors.DARK_GRAY }}
          numberOfLines={2}
        >
          {place.vicinity}
        </Text>

        {/* Container View for displaying star rating and favorite icon */}
        <View
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            flexDirection: "row",
          }}
        >
          {/* Container View for displaying star rating */}
          <View style={{ flex: 1, flexDirection: "row" }}>
            <AntDesign name="star" size={20} color={Colors.YELLOW} />
            <Text>{place.rating}</Text>
          </View>

          {/* TouchableOpacity for triggering the onFav function */}
          <TouchableOpacity style={{ padding: 5 }} onPress={onFav}>
            {/* Heart icon from AntDesign, color changes based on whether the place is a favorite or not */}
            <AntDesign
              name="heart"
              size={20}
              color={isFav ? Colors.YELLOW : Colors.DARK_GRAY}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* HorizontalLine component for separating place items */}
      <HorizontalLine />
    </View>
  );
};

// Mapping state to props for connecting to Redux store
const mapStateToProps = (state) => ({
  errors: state.errors.errors,
  get_user_details: state.main.get_user_details,
});

// Connecting the component to the Redux store and mapping actions
export default connect(mapStateToProps, { updateUser })(PlaceItem);
