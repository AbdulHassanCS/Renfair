import { View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import GoogleMapViewFull from "../Components/Search/GoogleMapViewFull";
import SearchBar from "../Components/Search/SearchBar";
import { UserLocationContext } from "../Context/UserLocationContext";
import GlobalApi from "../Services/GlobalApi";
import BusinessList from "../Components/Search/BusinessList";
import { getLocation } from "../Services/location";
import { ActivityIndicator } from "react-native";
export default function Search() {
  const [placeList, setPlaceList] = useState([]);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLocation()
      .then((res) => {
        setLocation(res);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, []);

  const GetNearBySearchPlace = (value) => {
    GlobalApi.searchByText(value)
      .then((resp) => {
        setPlaceList(resp.data.results);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  useEffect(() => {
    if (location) {
      GetNearBySearchPlace("restaurants");
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
    <View>
      <View style={{ position: "absolute", zIndex: 20 }}>
        <SearchBar setSearchText={(value) => GetNearBySearchPlace(value)} />
      </View>

      <GoogleMapViewFull placeList={placeList} location={location?.coords} />
      <View style={{ position: "absolute", zIndex: 20, bottom: 0 }}>
        <BusinessList placeList={placeList} />
      </View>
    </View>
  );
}
