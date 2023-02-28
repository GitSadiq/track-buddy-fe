import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const Loginoption = ({ navigation }) => {
  return (
    <View style={styles.body}>
      <Image
        style={styles.image_logo}
        source={require("../../../assets/olx_logo.png")}
      />
      <Text style={[styles.heading, styles.common]}>
        Welcome to Track Buddy
      </Text>
      <Text style={[styles.normal, styles.common]}>
        Track your buddies with ease
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate("login")}>
        <View style={styles.selectOption}>
          <Text style={styles.placeholder}>Continue with Email</Text>
        </View>
      </TouchableOpacity>
      <View style={{ flex: 1, justifyContent: "flex-end", paddingBottom: 20 }}>
        <Text style={[styles.common]}>
          If you continue, you are accepting Track Dubby Terms and Condition and
          Privacy Policy
        </Text>
      </View>
    </View>
  );
};

export default Loginoption;

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 220,
    color: "#3b4d70",
  },
  image_logo: {
    width: 100,
    height: 100,
  },
  heading: {
    fontSize: 30,
    marginTop: 30,
    fontWeight: "800",
  },
  normal: {
    fontSize: 22,
  },
  common: {
    color: "#3b4d70",
    textAlign: "center",
    marginTop: 5,
    padding: 10,
  },
  policy: {
    alignSelf: "flex-end",
  },
  selectOption: {
    height: 50,
    width: 280,
    marginTop: 20,
    borderWidth: 2,
    borderColor: "#3b4d70",
    borderRadius: 5,
    padding: 10,
  },
  placeholder: {
    textAlign: "center",
    fontSize: 20,
    color: "#3b4d70",
  },
});
