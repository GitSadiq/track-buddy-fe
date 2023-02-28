import axios from "axios";
import React, { useState, useEffect } from "react";
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
import AntDesign from "react-native-vector-icons/AntDesign";
import * as SMS from "expo-sms";

const AddMember = ({ navigation }) => {
  const [number, setnumber] = useState();
  const [search, setSearch] = useState("Select Group");
  const [open, setOpen] = useState(false);
  const [groups, setGroups] = useState();
  const [groupId, setGroupId] = useState();
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state);

  const callAllGroups = async () => {
    const resp = await axios.get(
      `http://192.168.131.204:4000/groups/allgroups?id=${reduxData?.tokenSlice.token}`
    );
    if (resp.data.status == 200) {
      setGroups(resp.data.data);
    }
  };

  useEffect(() => {
    callAllGroups();
    const unsubscribe = navigation.addListener("tabPress", async (e) => {
      callAllGroups();
    });
    return () => unsubscribe();
  }, [navigation]);

  const sendSMS = async () => {
    // Check if the device supports sending SMS messages
    const isAvailable = await SMS.isAvailableAsync();
    if (!isAvailable) {
      console.log("SMS is not available on this device");
      return;
    }

    if (groupId && number) {
      // Define the SMS message parameters
      const message = `Join the ${search} Group in Track buddy by using this code ${groupId}`;
      const recipients = [number];

      // Send the SMS message
      const resp = await SMS.sendSMSAsync(recipients, message);
      console.log("SMS result:", resp);
      setnumber("");
    } else if (number) {
      Alert.alert("please select the group");
    } else if (groupId) {
      Alert.alert("please input number");
    } else {
      Alert.alert("please input number and the select the group");
    }
  };

  console.log(search);

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.body}>
      <View>
        <View style={styles.image_container}>
          <Image
            style={styles.image_logo}
            source={require("../../../assets/olx_logo.png")}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.Search}
            placeholder="Search Groups"
            onChangeText={() => {
              setSearch(search);
            }}
          >
            {search}
          </TextInput>
          <Pressable style={styles.inputIcon} onPress={() => setOpen(!open)}>
            {open ? (
              <AntDesign name="caretup" size={24} color="white" />
            ) : (
              <AntDesign name="caretdown" size={24} color="white" />
            )}
          </Pressable>
        </View>
        <View style={open ? styles.searchItem : styles.searchItemNone}>
          {groups?.map((item, index) => {
            return (
              <Pressable
                key={index}
                onPress={() => {
                  setSearch(item?.name);
                  setGroupId(item?._id);
                  setOpen(!open);
                }}
              >
                <Text style={styles.SearchText}>{item?.name}</Text>
              </Pressable>
            );
          })}
        </View>
        <TextInput
          style={styles.input}
          onChangeText={setnumber}
          value={number}
          placeholder="Enter number"
          keyboardType="numeric"
        />
        <Pressable style={styles.button} onPress={() => sendSMS()}>
          <Text style={styles.buttonText}>Add Member</Text>
        </Pressable>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default AddMember;

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
  inputContainer: {
    backgroundColor: "white",
    // borderColor: "black",
    // borderWidth: 2,
    height: "auto",
    flexDirection: "row",
  },
  inputIcon: {
    borderWidth: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10,
    backgroundColor: "#3b4d70",
    borderColor: "#3b4d70",
  },
  Search: {
    padding: 5,
    fontSize: 22,
    paddingStart: 20,
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderColor: "#3b4d70",
    paddingLeft: 20,
    width: "86%",
  },
  searchItem: {
    borderRadius: 5,
    backgroundColor: "#3b4d70",
    width: "100%",
    flexDirection: "column",
  },
  searchItemNone: {
    display: "none",
  },
  SearchText: {
    fontSize: 20,
    color: "white",
    padding: 10,
    borderBottomWidth: 2,
    borderColor: "grey",
  },
});
