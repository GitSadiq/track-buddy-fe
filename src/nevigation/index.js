import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { StyleSheet, View, Text } from "react-native";
import Loginoption from "../screens/loginOption";
import Signup from "../screens/signup";
import Login from "../screens/login";
import Home from "../screens/home";
import { useSelector } from "react-redux";
import Profile from "../screens/profile";
import AddGroup from "../screens/addgroup";
import AddMember from "../screens/addmembers";
import JoinGroup from "../screens/joingroup";

export default function Navigate() {
  const reduxData = useSelector((state) => state);
  const token = reduxData?.tokenSlice?.token;

  return (
    <NavigationContainer>
      {token ? <MyTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}

const stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <stack.Navigator>
      <stack.Screen
        options={{ headerShown: false }}
        name="loginoption"
        component={Loginoption}
      />
      <stack.Screen name="signup" component={Signup} />
      <stack.Screen name="login" component={Login} />
    </stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let routeName = route.name;

          if (routeName === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (routeName === "Invite") {
            iconName = focused
              ? "arrow-undo-circle"
              : "arrow-undo-circle-outline";
          } else if (routeName === "Groups") {
            iconName = focused ? "pluscircle" : "pluscircleo";
          } else if (routeName === "Join") {
            iconName = focused ? "user-circle" : "user-circle-o";
          } else if (routeName === "Account") {
            iconName = focused ? "account-key" : "account-key-outline";
          }

          {
            if (
              iconName === "home" ||
              iconName === "home-outline" ||
              iconName === "arrow-undo-circle" ||
              iconName === "arrow-undo-circle-outline"
            )
              return <Ionicons name={iconName} size={size} color={color} />;
            else if (
              iconName === "account-key" ||
              iconName === "account-key-outline"
            ) {
              return (
                <MaterialCommunityIcons
                  name={iconName}
                  size={size}
                  color={color}
                />
              );
            } else if (
              iconName === "user-circle" ||
              iconName === "user-circle-o"
            ) {
              return <FontAwesome name={iconName} size={size} color={color} />;
            } else {
              return <AntDesign name={iconName} size={size} color={color} />;
            }
          }
        },
        tabBarActiveTintColor: "#3b4d70",
        tabBarInactiveTintColor: "grey",
        tabBarStyle: { height: 60, paddingTop: 5 },
        tabBarLabelStyle: { padding: 5, fontSize: 15, paddingTop: 2 },
      })}
    >
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Groups"
        component={AddGroup}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Invite"
        component={AddMember}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Join"
        component={JoinGroup}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Account"
        component={Profile}
      />
    </Tab.Navigator>
  );
}
