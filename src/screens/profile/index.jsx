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
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { removeUserData } from "../../store/slice/user";

const Profile = ({ navigation }) => {
  const reduxData = useSelector((state) => state);
  const [edituser, setEditUser] = useState(false);
  const [userName, setUserName] = useState(reduxData?.userSlice?.userName);
  const [email, setEmail] = useState(reduxData?.userSlice?.email);
  const dispatch = useDispatch();
  const token = reduxData?.tokenSlice?.token;
  const handleEdit = async () => {
    try {
      console.log(token);
      const resp = await axios.put(
        "http://192.168.131.204:4000/user/edit",
        { userName, email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(resp);
      if (resp.status == 200) {
        Alert.alert("User Edit Succussfully");
        setEditUser(!edituser);
        dispatch(saveUserData({ userName, email }));
      } else {
        Alert.alert("User Edit Error");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogout = async () => {
    try {
      const resp = await axios.post(
        "http://192.168.131.204:4000/user/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (resp.data.status == 200) {
        Alert.alert(resp.data.message);
        dispatch(removeToken());
        dispatch(removeUserData());
      } else {
        Alert.alert("Error LogOut");
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
            source={require("../../../assets/pf.png")}
          />
          <Pressable
            style={styles.editIcon}
            onPress={() => {
              setEditUser(!edituser);
            }}
          >
            <FontAwesome5 name="user-edit" size={30} color={"#3b4d70"} />
          </Pressable>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={setUserName}
          value={userName}
          editable={edituser}
        />
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          editable={edituser}
          value={email}
        />
        {edituser ? (
          <Pressable style={styles.button} onPress={() => handleEdit()}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </Pressable>
        ) : null}
        <Pressable style={styles.button} onPress={() => handleLogout()}>
          <Text style={styles.buttonText}>Logout</Text>
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
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  editIcon: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 1,
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
