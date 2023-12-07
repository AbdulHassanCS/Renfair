import * as Location from "expo-location";

export const getLocation = () => {
  return new Promise(async (resolve, reject) => {
    // let { status } = await Location.requestForegroundPermissionsAsync();
    // if (status !== "granted") {
    //   setErrorMsg("Permission to access location was denied");
    //   return;
    // }

    // let location = await Location.getCurrentPositionAsync({});
    // if (location?.coords) {
    //   resolve(location);
    // } else {
    //   reject({ msg: "Location is not available" });
    // }
    let location = { coords: { latitude: 44.748451, longitude: -93.598686 } };
    resolve(location);
  });
};
