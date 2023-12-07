// Importing necessary components and libraries from React Native
import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import PlaceDetailItem from "./PlaceDetailItem";
import Colors from "../../Shared/Colors";
import GoogleMapView from "../Home/GoogleMapView";
import { TouchableOpacity } from "react-native";
import { Platform } from "react-native";
import { Linking } from "react-native";
import { ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getLocation } from "../../Services/location";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import { AntDesign } from "@expo/vector-icons";
import { TextInput } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { Keyboard } from "react-native";
import { getAuth } from "firebase/auth";
import { connect } from "react-redux";
import { addReview } from "../../../state-management/actions/auth/FirebaseAuthActions";
import { ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

// Main component for displaying place details
const PlaceDetail = (props) => {
  // Retrieve navigation parameters
  const param = useRoute().params;

  // State variables for user review functionality
  const [starsSelected, setStarsSelected] = useState(0);
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(null);

  // Get current authenticated user
  const auth = getAuth();
  const user = auth.currentUser;

  // Function to handle direction click
  const onDirectionClick = () => {
    let lat = param?.place?.geometry.location.lat;
    let lng = param?.place?.geometry.location.lng;
    const daddr = `${lat},${lng}`;
    const company = Platform.OS === "ios" ? "apple" : "google";
    Linking.openURL(`http://maps.${company}.com/maps?daddr=${daddr}`);
  };

  // Retrieve reviews for the current place
  let reviews = props?.get_reviews?.filter(
    (e) => e?.place?.place_id == param?.place?.place_id
  );

  // Calculate average rating based on reviews
  const calculateAverageRating = () => {
    if (reviews?.length === 0) return null;

    const totalRating = reviews?.reduce((sum, review) => sum + review?.stars, 0);
    return totalRating / reviews.length;
  };
  const averageRating = calculateAverageRating();

  // Function to submit a user review
  const onSubmitReview = () => {
    if (review !== null) {
      setLoading(true);
      props?.addReview(
        {
          stars: starsSelected,
          review: review,
          place: param?.place,
        },
        setLoading
      );
      setStarsSelected(0);
      setReview(null);
    } else {
      alert("Enter your comment");
    }
  };
//
  return (
  // KeyboardAvoidingView ensures the view adjusts when the keyboard is displayed
  <KeyboardAvoidingView
    enabled
    style={{ flex: 1, backgroundColor: "transparent" }}
    behavior="padding"
    keyboardVerticalOffset={120}
  >
    {/* ScrollView for scrolling content */}
    <ScrollView
      style={{
        padding: 20,
        backgroundColor: Colors.WHITE,
        flex: 1,
        paddingBottom: hp("3%"),
      }}
    >
      {/* Displaying details of a place */}
      <PlaceDetailItem
        place={param?.place}
        onDirectionClick={() => onDirectionClick()}
        rating={averageRating?.toFixed(1)}
      />

      {/* Displaying Google Map view if location is available */}
      {param?.location && (
        <GoogleMapView
          notMe
          placeList={[param?.place]}
          location={param?.location}
        />
      )}

      {/* Button for getting directions on Google Map */}
      <TouchableOpacity
        style={{
          backgroundColor: Colors.PRIMARY,
          padding: 15,
          alignContent: "center",
          alignItem: "center",
          margin: 8,
          display: "flex",
          flexDirection: "row",
          gap: 10,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 50,
          paddingBottom: 15,
        }}
        onPress={() => onDirectionClick()}
      >
        <Ionicons name="navigate-circle-outline" size={30} color="white" />
        <Text
          style={{
            fontFamily: "raleway",
            textAlign: "center",
            color: Colors.WHITE,
          }}
        >
          Get Direction on Google Map
        </Text>
      </TouchableOpacity>

      {/* Section for leaving reviews */}
      <View style={styles.reviewBox}>
        <Text style={styles.title}>Leave Review</Text>

        {/* Rating section */}
        <View style={styles.ratingWrapper}>
          <Text style={styles.text}>
            How would you rate the service you used from 1 to 5?
          </Text>
          <View style={styles.starsWrapper}>
            {/* Displaying stars for rating */}
            {new Array(5).fill("").map((item, index) => {
              let id = eval(index + 1);
              let color =
                starsSelected >= id ? Colors.YELLOW : Colors.DARK_GRAY;
              return (
                <TouchableOpacity
                  onPress={() => setStarsSelected(eval(index + 1))}
                  style={styles.star}
                  key={index}
                >
                  <AntDesign name="star" size={20} color={color} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Comment section */}
        <View style={styles.commentWrapper}>
          <Text style={styles.text}>Your comment</Text>
          <View style={styles.commentBox}>
            <TextInput
              placeholder="Write here.."
              style={styles.commentInput}
              multiline
              onChangeText={(val) => setReview(val)}
              value={review}
            />
          </View>
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={onSubmitReview}
          >
            {loading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <Text
                style={{
                  fontFamily: "raleway",
                  textAlign: "center",
                  color: Colors.WHITE,
                }}
              >
                Submit
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Displaying user reviews */}
        <View style={{ marginBottom: hp("5%") }}>
          <Text style={[styles.title, { marginBottom: hp("2%") }]}>
            Reviews {averageRating?.toFixed(1) || 0}
          </Text>

          {reviews?.map((mainItem, index) => {
            return (
              <View style={styles.userReviews} key={index}>
                <View style={styles.userinfo}>
                  <View style={styles.userProfile}>
                    <MaterialIcons
                      name="emoji-emotions"
                      size={24}
                      color="#fff"
                    />
                  </View>
                  <View>
                    <Text style={styles.userName}></Text>
                    <View style={styles.starsWrapper2}>
                      {/* Displaying stars for user reviews */}
                      {new Array(5).fill("").map((item, index) => {
                        let id = eval(index + 1);
                        let color =
                          mainItem?.stars >= id
                            ? Colors.YELLOW
                            : Colors.DARK_GRAY;
                        return (
                          <TouchableOpacity
                            onPress={() => setStarsSelected(eval(index + 1))}
                            style={styles.star}
                            key={index}
                          >
                            <AntDesign name="star" size={15} color={color} />
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                </View>
                <Text style={styles.reviewText}>{mainItem?.review}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  </KeyboardAvoidingView>
);

};

export const styles = StyleSheet.create({
  reviewBox: {
    width: "100%",
    marginTop: hp("3%"),
  },
  title: {
    fontSize: RFValue(20),
    fontFamily: "raleway",
  },
  text: {
    fontSize: RFValue(13),
    fontFamily: "raleway",
    marginTop: hp("1%"),
    color: Colors.DARK_GRAY,
  },
  starsWrapper: {
    width: "35%",
    height: hp("6%"),
    paddingVertical: hp("1%"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  starsWrapper2: {
    width: "40%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
    marginLeft: 15,
  },
  commentWrapper: {
    width: "100%",
    height: hp("25%"),
    paddingBottom: hp("10%"),
    marginBottom: hp("1%"),
  },
  commentBox: {
    width: "100%",
    height: "80%",
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.DARK_GRAY,
    padding: 10,
    marginVertical: 10,
  },
  commentInput: {
    flex: 1,
  },
  submitBtn: {
    backgroundColor: Colors.YELLOW,
    padding: 15,
    alignContent: "center",
    alignItem: "center",
    margin: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingBottom: 15,
  },
  userReviews: {
    width: "100%",
    minHeight: hp("10%"),
    marginBottom: hp("3%"),
  },
  userinfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userProfile: {
    width: wp("11%"),
    height: wp("11%"),
    backgroundColor: Colors.YELLOW,
    borderRadius: 100,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  userName: {
    fontSize: RFValue(15),
    fontFamily: "raleway",
    marginLeft: 15,
  },
  reviewText: {
    fontSize: RFValue(12),
    fontFamily: "raleway",
    marginTop: hp("1%"),
    marginLeft: 10,
  },
});

const mapStateToProps = (state) => ({
  errors: state.errors.errors,
  get_user_details: state.main.get_user_details,
  get_reviews: state.main.get_reviews,
});
export default connect(mapStateToProps, { addReview })(PlaceDetail);
