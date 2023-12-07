import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import PlaceList from "../Components/Home/PlaceList";
import { connect } from "react-redux";
import { getLocation } from "../Services/location";
import { ActivityIndicator } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import PlaceItem from "../Components/Home/PlaceItem";
import { RFValue } from "react-native-responsive-fontsize";

const Fav = (props) => {
  let favs = props?.get_user_details?.favourites;
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLocation()
      .then((res) => {
        setLocation(res);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <View
      style={{ flex: 1, paddingHorizontal: wp("5%"), paddingTop: hp("5%") }}
    >
      <Text
        style={{
          textAlign: "center",
          paddingTop: heightPercentageToDP("3%"),
          fontSize: RFValue(18),
          fontFamily:'raleway'
        }}
      >
        Favorite
      </Text>
      {favs?.length > 0 &&
        favs?.map((item, index) => {
          let isFav = props?.get_user_details?.favourites?.filter((e) => {
            return e?.reference == item?.reference;
          });
          return <PlaceItem isFav={isFav?.length > 0} place={item} />;
        })}
    </View>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
  get_user_details: state.main.get_user_details,
});
export default connect(mapStateToProps, {})(Fav);
