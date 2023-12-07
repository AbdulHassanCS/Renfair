import { View, Text, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Header from "../Components/Home/Header";
import GoogleMapView from "../Components/Home/GoogleMapView";
import CategoryList from "../Components/Home/CategoryList";
import GlobalApi from "../Services/GlobalApi";
import PlaceList from "../Components/Home/PlaceList";
import { ScrollView } from "react-native";
import { UserLocationContext } from "../Context/UserLocationContext";
import { getLocation } from "../Services/location";
import { connect } from "react-redux";
import { getUserDetails,getAllReviews } from "../../state-management/actions/auth/FirebaseAuthActions";
import { getAuth } from "firebase/auth";

const Home = (props) => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [placeList, setPlaceList] = useState([]);
  const auth = getAuth();

  const GetNearBySearchPlace = (value) => {
    GlobalApi.nearByPlace(
      location.coords.latitude,
      location.coords.longitude,
      value
    )
      .then((resp) => {
        setPlaceList(resp.data.results);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  useEffect(() => {
    const user = auth.currentUser;
    props?.getUserDetails(user?.uid);
    props?.getAllReviews()
    
  }, []);

  useEffect(() => {
    getLocation()
      .then((res) => {
        setLocation(res);
      })
      .catch((e) => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (location) {
      GetNearBySearchPlace("store");
    }
  }, [location]);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <View style={{ padding: 20, backgroundColor: "#fff", flex: 1 }}>
      <Header />
      {location?.coords && (
        <GoogleMapView placeList={placeList} location={location?.coords} />
      )}
      <ScrollView showsVerticalScrollIndicator={false}>
        <CategoryList
          setSelectedCategory={(value) => GetNearBySearchPlace(value)}
        />
        {placeList && location ? (
          <PlaceList placeList={placeList} location={location?.coords} />
        ) : null}
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
  get_user_details: state.main.get_user_details,
  get_reviews: state.main.get_reviews,

});
export default connect(mapStateToProps, { getUserDetails,getAllReviews })(Home);
