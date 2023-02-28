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

const JoinGroup = ({ navigation }) => {
  const [groupID, setgroupID] = useState();
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state);
  const token = reduxData?.tokenSlice?.token;
  const lng = reduxData?.locationSlice?.location?.coords?.longitude;
  const lat = reduxData?.locationSlice?.location?.coords?.latitude;
  console.log(reduxData);
  const sendData = { token, lng, lat };
  const JoinGroup = async () => {
    try {
      const resp = await axios.put(
        `http://192.168.131.204:4000/groups/join?id=${groupID}`,
        sendData
      );
      console.log(resp);
      if (resp.data.status == 200) {
        Alert.alert(resp.data.message);
        setgroupID("");
      } else {
        Alert.alert("Group Added Error");
      }
    } catch (e) {
      console.log(e);
    }
  };
  console.log(groupID);
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
          onChangeText={setgroupID}
          value={groupID}
          placeholder="Groups Name"
        />
        <Pressable style={styles.button} onPress={() => JoinGroup()}>
          <Text style={styles.buttonText}>Join Group</Text>
        </Pressable>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default JoinGroup;

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
