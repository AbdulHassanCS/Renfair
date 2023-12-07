import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue as rf } from "react-native-responsive-fontsize";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
const Button = (props) => {
  return (
    <TouchableOpacity style={styles.buttonWrapper} onPress={props?.onPress}>
      <Text style={styles.buttonText}>{props?.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    width: "100%",
    height: hp("6%"),
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2B69FE",
    marginVertical: hp("1%"),
  },
  buttonText: {
    fontSize: rf(18),
    color: "#fff",
    fontFamily: "raleway",
  },
});
const mapStateToProps = (state) => ({
  errors: state.errors.errors,
});
export default connect(mapStateToProps, {})(Button);
