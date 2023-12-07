import React, { useEffect, useState } from "react";
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
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import InputField from "./InputField";
import Button from "./Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { login } from "../../../../state-management/actions/auth/FirebaseAuthActions";

const LoginPopup = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onNext = () => {
    if (email == null || password == null) {
      alert("Fill all details");
    } else {
      props?.setLoading(true);
      props?.setLoginPopup(false);
      props?.login({ email: email, password: password }, props?.setLoading);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        enableAutomaticScroll={true}
      >
        <TouchableOpacity
          onPress={props?.onBackPress}
          style={{ right: wp("2%") }}
        >
          <Entypo name="chevron-left" size={rf(27)} color="#252427" />
        </TouchableOpacity>
        <Text style={styles.title}>Login to your account </Text>
        <View style={styles.formWrapper}>
          <InputField
            placeholder="Email"
            onChangeText={(val) => setEmail(val)}
          />
          <InputField
            placeholder="Password"
            secureTextEntry
            onChangeText={(val) => setPassword(val)}
          />
          <Button title="Login" onPress={() => onNext()} />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: wp("100%"),
    flex: 1,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    position: "absolute",
    bottom: 0,
    paddingHorizontal: wp("8%"),
    paddingVertical: hp("3%"),
    overflow: "hidden",
    height: hp("55%"),
  },
  title: {
    fontSize: rf(25),
    color: "#252427",
    marginVertical: hp("2%"),
    fontFamily: "raleway",
  },
  formWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
const mapStateToProps = (state) => ({
  errors: state.errors.errors,
});
export default connect(mapStateToProps, {login})(LoginPopup);
