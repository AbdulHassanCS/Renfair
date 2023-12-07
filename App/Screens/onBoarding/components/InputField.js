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
  TextInput,
} from "react-native";
import { connect } from "react-redux";
const InputField = (props) => {
  return (
    <View style={styles.formInputWrapper}>
      <TextInput
        style={styles.formInput}
        placeholder={props?.placeholder}
        placeholderTextColor="#A5A3A3"
        secureTextEntry={props?.secureTextEntry}
        onChangeText={props?.onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formInputWrapper: {
    width: "100%",
    height: hp("6.5%"),
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#2B69FE",
    marginVertical: hp("1.5%"),
  },
  formInput: {
    width: "100%",
    height: "100%",
    fontSize: rf(14),
    color: "#252427",
    fontFamily: "raleway",
  },
});
const mapStateToProps = (state) => ({
  errors: state.errors.errors,
});
export default connect(mapStateToProps, {})(InputField);
