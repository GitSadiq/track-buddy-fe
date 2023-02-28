import React, { useRef } from "react";
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  TextInput,
  Button,
  Dimensions,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import { UserLocation } from "../../store/slice/locationSlice";
import { callAllGroups } from "../../api";
import axios from "axios";

export default function Destination({ navigation }) {
  const [CurrentLocation, setCurrentLocation] = useState(null);
  const [search, setSearch] = useState("Select Group");
  const [open, setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [groups, setGroups] = useState();
  const [selectGroup, setselectGroup] = useState(false);
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const { width, height } = Dimensions.get("window");
  const aspect_ratio = width / height;
  const latitudeDelta = 0.01;
  const reduxData = useSelector((state) => state);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Balanced,
          timeInterval: 1000,
          distanceInterval: 0.5,
        },
        (location) => {
          setCurrentLocation(location);
          dispatch(UserLocation(location));
        }
      );
    })();
  }, []);

  const fitToMarkers = () => {
    if (selectGroup[0]?.members.length > 0 && mapRef.current) {
      mapRef.current.fitToCoordinates(
        selectGroup[0]?.members.map((marker) => ({
          latitude: marker.lat,
          longitude: marker.lng,
        })),
        {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true,
        }
      );
    }
  };

  useEffect(() => {
    fitToMarkers();
  }, [selectGroup]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.animateCamera({
        center: {
          latitude: CurrentLocation.coords.latitude,
          longitude: CurrentLocation.coords.longitude,
        },
        duration: 500,
      });
    }
  }, [CurrentLocation]);

  useEffect(() => {
    (async () => {
      const resp = await callAllGroups(reduxData?.tokenSlice.token);
      setGroups(resp);
    })();
    const unsubscribe = navigation.addListener("tabPress", async (e) => {
      (async () => {
        const resp = await callAllGroups(reduxData?.tokenSlice.token);
        setGroups(resp);
      })();
    });
    return () => unsubscribe();
  }, [navigation]);

  useEffect(() => {
    if (search !== "Select Group") {
      const resp = groups?.filter((item) => {
        if (item.name.includes(search)) {
          return item;
        }
      });
      setselectGroup(resp);
    }
  }, [search]);

  if (!CurrentLocation) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.containerMap}>
      <View style={styles.inputContainer}>
        <Text style={styles.Search}>{search}</Text>
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
                setOpen(!open);
              }}
            >
              <Text style={styles.SearchText}>{item?.name}</Text>
            </Pressable>
          );
        })}
      </View>
      <MapView
        ref={mapRef}
        style={styles.map}
        onLayout={fitToMarkers}
        initialRegion={{
          latitude: CurrentLocation.coords.latitude,
          longitude: CurrentLocation.coords.longitude,
          latitudeDelta: latitudeDelta,
          longitudeDelta: latitudeDelta * aspect_ratio,
        }}
      >
        <Marker
          title={"Current location"}
          coordinate={{
            latitude: CurrentLocation.coords.latitude,
            longitude: CurrentLocation.coords.longitude,
          }}
        />
        {selectGroup
          ? selectGroup[0]?.members.map((item, index) => {
              console.log(item);
              return item?.lat && item?.lng ? (
                <Marker
                  key={index}
                  title={item?.userName}
                  description={item?.email}
                  coordinate={{
                    latitude: parseFloat(item?.lat),
                    longitude: parseFloat(item?.lng),
                  }}
                />
              ) : null;
            })
          : null}
      </MapView>

      <View style={styles.btnContainer}>
        <Pressable
          style={styles.btn}
          onPress={() => {
            handleDanger();
          }}
        >
          <Text style={styles.btnText}>I am in Danger</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 20,
  },
  containerMap: {
    flex: 1,
    alignItems: "center",
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
    marginTop: 45,
  },
  inputContainer: {
    backgroundColor: "white",
    width: "78%",
    zIndex: 1,
    position: "absolute",
    top: 60,
    left: 14,
    flex: 1,
    flexDirection: "row",
    borderRadius: 10,
  },
  inputIcon: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#3b4d70",
    marginLeft: 10,
  },
  Search: {
    padding: 5,
    width: "100%",
    fontSize: 22,
    paddingStart: 20,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "black",
    paddingLeft: 20,
    paddingTop: 10,
  },
  searchItem: {
    borderRadius: 5,
    backgroundColor: "#3b4d70",
    width: "94%",
    zIndex: 1,
    position: "absolute",
    top: 115,
    left: 14,
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
  btnContainer: {
    flex: 1 / 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 15,
  },
  btn: {
    backgroundColor: "#cc0b15",
    paddingLeft: 20,
    paddingRight: 20,
    padding: 10,
    borderRadius: 10,
  },
  btnText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
});
