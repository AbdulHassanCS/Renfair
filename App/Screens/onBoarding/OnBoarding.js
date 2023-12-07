import React, { useEffect, useRef, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue as rf } from "react-native-responsive-fontsize";
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { connect } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import RegisterStep1 from "./components/RegisterStep1";
import LoginPopup from "./components/LoginPopup";

const OnBoarding = (props) => {
  const registerAnimation = useRef(null);
  const loginAnimation = useRef(null);
  const [registerPopup, setRegisterPopup] = useState(false);
  const [loginPopup, setLoginPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registerData, setRegisterData] = useState();

  //Animation for Register
  const AnimationRegister = async (status) => {
    if (!status) {
      setRegisterPopup(true);
      if (registerAnimation.current)
        await registerAnimation.current.slideInUp(300);
    } else {
      if (registerAnimation.current)
        await registerAnimation.current.slideOutDown(200);
      setRegisterPopup(false);
    }
  };
  //Animation for Register

  //Animation for Login
  const AnimationLogin = async (status) => {
    if (!status) {
      setLoginPopup(true);
      if (loginAnimation.current) await loginAnimation.current.slideInUp(300);
    } else {
      if (loginAnimation.current)
        await loginAnimation.current.slideOutDown(200);
      setLoginPopup(false);
    }
  };
  //Animation for Login
  const onRegister = () => {
    setLoading(true);
    props?.register(registerData, setLoading);
    setRegisterPopup(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.bgWrapper}>
        {loading && (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )}
        <View style={styles.bgLayer}></View>
        <View style={styles.bodyWrapper}>
          <View style={styles.titleWrapper}>
            <Image
              source={require("../../../assets/renfair.png")}
              resizeMode="contain"
              style={{ width: "100%", height: "100%" }}
            />
          </View>

          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={styles.button1}
              onPress={() =>
                !registerPopup
                  ? AnimationRegister(false)
                  : AnimationRegister(true)
              }
            >
              <Text style={styles.btnText}>Create Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button2}
              onPress={() =>
                !loginPopup ? AnimationLogin(false) : AnimationLogin(true)
              }
            >
              <Text
                style={[
                  styles.btnText,
                  { color: "#fff", fontFamily: "raleway" },
                ]}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Animatable.View ref={registerAnimation} style={{ zIndex: 3 }}>
          {registerPopup && (
            <RegisterStep1
              onBackPress={() =>
                !registerPopup
                  ? AnimationRegister(false)
                  : AnimationRegister(true)
              }
              setRegisterData={setRegisterData}
              setLoading={setLoading}
              setRegisterPopup={setRegisterPopup}
            />
          )}
        </Animatable.View>
        <Animatable.View ref={loginAnimation} style={{ zIndex: 3 }}>
          {loginPopup && (
            <LoginPopup
              onBackPress={() =>
                !loginPopup ? AnimationLogin(false) : AnimationLogin(true)
              }
              // login={props?.login}
              setLoginPopup={setLoginPopup}
              setLoading={setLoading}
            />
          )}
        </Animatable.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A",
  },
  bgWrapper: {
    width: wp("100%"),
    paddingTop: hp("15%"),
    flex: 1,
  },
  bgLayer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#1A1A1A",
    position: "absolute",
    zIndex: 2,
  },
  bodyWrapper: {
    flex: 1,
    zIndex: 3,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: hp("10%"),
  },
  titleWrapper: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    overflow: "hidden",
    width: hp("25%"),
    height: hp("25%"),
    backgroundColor:'#fff'
  },
  buttonWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  title: {
    fontSize: rf(42),
    color: "#fff",
  },
  button1: {
    width: wp("90%"),
    height: hp("6%"),
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: wp("5%"),
    marginVertical: hp("3%"),
  },
  button2: {
    width: wp("90%"),
    height: hp("6%"),
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: wp("5%"),
    backgroundColor: "transparent",
    borderWidth: 3,
    borderColor: "#fff",
  },
  btnText: {
    fontSize: rf(16),
    color: "#222",
  },
  loader: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    zIndex: 99,
    width: "100%",
    height: "100%",
    top: hp("10%"),
  },
});
const mapStateToProps = (state) => ({
  errors: state.errors.errors,
});
export default connect(mapStateToProps, {})(OnBoarding);
