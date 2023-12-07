// Importing necessary components and functions from React, React Native, and other libraries
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Dimensions,
} from "react-native";
import React from "react";
import Colors from "../../Shared/Colors";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { connect } from "react-redux";
import { SignOut } from "../../../state-management/actions/auth/FirebaseAuthActions";
import { TouchableOpacity } from "react-native";

// Functional component for rendering the header
const Header = (props) => {
  return (
    // Container View styling for the header
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        paddingTop: heightPercentageToDP("5%"),
        gap: 10,
        alignItems: "center",
      }}
    >
      {/* StatusBar component for controlling the status bar style */}
      <StatusBar style="dark" />

      {/* Logo Image component */}
      <Image
        source={require("./../../../assets/renfair.png")}
        style={styles.logo}
      />

      {/* TouchableOpacity for signing out, triggering the SignOut action */}
      <TouchableOpacity onPress={props?.SignOut}>
        {/* User Image component */}
        <Image
          source={require("./../../../assets/knight.png")}
          style={styles.userImage}
        />
      </TouchableOpacity>
    </View>
  );
};

// Stylesheet for the header component
const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
  searchBar: {
    width: widthPercentageToDP("60%"),
    height: heightPercentageToDP("5%"),
    borderColor: Colors.PRIMARY,
    borderWidth: 1,
    borderRadius: 100,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
});

// Mapping state to props for the component
const mapStateToProps = (state) => ({
  errors: state.errors.errors,
  get_user_details: state.main.get_user_details,
});

// Connecting the component to Redux store and providing the SignOut action
export default connect(mapStateToProps, { SignOut })(Header);
