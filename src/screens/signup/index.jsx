import axios from "axios";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  TouchableOpacity,
  Alert,
  AsyncStorage,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Signup = ({ navigation }) => {
  const [userName, setUserName] = React.useState();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [ConPassword, setConPassword] = React.useState();
  const handleSignUp = async () => {
    if (
      password === ConPassword &&
      email.includes("@") &&
      email.includes(".com")
    ) {
      try {
        const resp = await axios.post(
          "http://192.168.131.204:4000/user/signup",
          {
            userName,
            email: email?.toLowerCase(),
            password,
          }
        );
        console.log(resp.data);
        if (resp.data.status == 200) {
          console.log(resp.data);
          Alert.alert(`${resp.data.message}\n Now login`);
          navigation.navigate("login");
        } else if (resp.data.status == 400) {
          Alert.alert(`${resp.data.message}`);
          AsyncStorage.setItem("@token", resp.data.messag);
        }
      } catch (e) {
        console.log("error", e);
        Alert.alert("error in signup");
      }
    } else if (password !== ConPassword) {
      Alert.alert("password not match");
    } else if (!email.includes("@") && !email.includes(".com")) {
      Alert.alert("Invalid Email");
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.body}>
      <View style={styles.body}>
        <Image
          style={styles.image_logo}
          source={require("../../../assets/pf.png")}
        />
        <Text style={[styles.heading, styles.common]}>Enter your Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={setUserName}
          value={userName}
          placeholder="User Name"
        />
        <Text style={[styles.heading, styles.common]}>Enter your Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
        />
        <Text style={[styles.heading, styles.common]}>Enter Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          secureTextEntry={true}
        />
        <Text style={[styles.heading, styles.common]}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={setConPassword}
          value={ConPassword}
          placeholder="Password"
          secureTextEntry={true}
        />
        <Pressable style={styles.button} onPress={() => handleSignUp()}>
          <Text style={styles.buttonText}>SignUp</Text>
        </Pressable>
        <TouchableOpacity onPress={() => navigation.navigate("login")}>
          <Text style={[styles.para, styles.common]}>
            Or Already have an account!
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 10,
  },
  image_logo: {
    width: 85,
    height: 85,
  },
  heading: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: "600",
  },
  common: {
    color: "#3b4d70",
  },
  input: {
    height: 45,
    marginTop: 10,
    borderWidth: 1,
    padding: 10,
    paddingStart: 20,
    borderRadius: 5,
    fontSize: 20,
  },
  button: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    borderRadius: 4,
    backgroundColor: "#3b4d70",
  },
  buttonText: {
    fontSize: 24,
    color: "white",
    fontWeight: "500",
  },
  para: {
    fontSize: 17,
    marginTop: 15,
    fontWeight: "500",
    textAlign: "center",
  },
});
