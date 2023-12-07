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
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { connect } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import InputField from "./InputField";
import Button from "./Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { register } from "../../../../state-management/actions/auth/FirebaseAuthActions";

const RegisterStep1 = (props) => {
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const onNext = () => {
    if (fullName == null || email == null || password == null) {
      alert("Fill all details");
    } else {
      if (password == confirmPassword) {
        if (password.length >= 8) {
          let data = {
            fullName: fullName,
            email: email,
            password: password,
            favourites: [],
          };
          props?.setLoading(true);
          props?.setRegisterPopup(false);
          props?.register(data, props?.setLoading);
        } else {
          alert("Password must be 8 characters or more.");
        }
      } else {
        alert("Password doesnot match");
      }
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView enableOnAndroid={true}>
        <TouchableOpacity
          onPress={props?.onBackPress}
          style={{ right: wp("2%") }}
        >
          <Entypo name="chevron-left" size={rf(27)} color="#252427" />
        </TouchableOpacity>
        <Text style={styles.title}>Create your account</Text>
        <View style={styles.formWrapper}>
          <InputField
            placeholder="Full Name"
            onChangeText={(val) => setFullName(val)}
          />
          <InputField
            placeholder="Email"
            onChangeText={(val) => setEmail(val)}
          />
          <InputField
            placeholder="Password"
            secureTextEntry
            onChangeText={(val) => setPassword(val)}
          />
          <InputField
            placeholder="Confirm Password"
            secureTextEntry
            onChangeText={(val) => setConfirmPassword(val)}
          />
          <Button title="Sign Up" onPress={() => onNext()} />
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
    height: hp("75%"),
    overflow: "hidden",
  },
  title: {
    fontSize: rf(25),
    color: "#252427",
    fontFamily: "raleway",
    marginVertical: hp("2%"),
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
export default connect(mapStateToProps, { register })(RegisterStep1);
