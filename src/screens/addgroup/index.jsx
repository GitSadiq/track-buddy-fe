import axios from "axios";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import { removeToken } from "../../store/slice/token";

const Profile = ({ navigation }) => {
  const [groupName, setGroupName] = useState();
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state);
  const token = reduxData?.tokenSlice?.token;
  const lng = reduxData?.locationSlice?.location?.coords?.longitude;
  const lat = reduxData?.locationSlice?.location?.coords?.latitude;
  const sendData = { name: groupName, token, lng, lat };
  const addGroup = async () => {
    try {
      const resp = await axios.post(
        "http://192.168.131.204:4000/groups/add",
        sendData
      );
      console.log(resp);
      if (resp.data.status == 200) {
        Alert.alert(resp.data.message);
        setGroupName("");
      } else {
        Alert.alert("Group Added Error");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.body}>
      <View>
        <View style={styles.image_container}>
          <Image
            style={styles.image_logo}
            source={require("../../../assets/olx_logo.png")}
          />
        </View>
        <TextInput
          style={styles.input}
          onChangeText={setGroupName}
          value={groupName}
          placeholder="Groups Name"
        />
        <Pressable style={styles.button} onPress={() => addGroup()}>
          <Text style={styles.buttonText}>Add Group</Text>
        </Pressable>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  image_container: {
    alignItems: "center",
  },
  image_logo: {
    width: 100,
    height: 100,
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
    marginTop: 10,
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
