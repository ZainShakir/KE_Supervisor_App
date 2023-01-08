import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

//screens
import Home from "../../Screens/Home";
import Track from "../../Screens/Track";
import Profile from "../../Screens/Profile";

//dimensions
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Tab = createBottomTabNavigator();

const Test1 = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#BFEFFF" }}>
      <Text>Hello</Text>
    </View>
  );
};
const Test2 = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#FFEBCD" }}>
      <Text>Hello</Text>
    </View>
  );
};
function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: "row" }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              height: windowHeight * 0.07,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {options.tabBarIcon({
              isFocused: isFocused,
              color: isFocused ? "#FE762E" : "#222",
              size: 24,
            })}
            <Text style={{ color: isFocused ? "#FE762E" : "#222" }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const BottomBar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <MyTabBar {...props} />}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ isFocused, color, size }) => (
            <Ionicons
              name={isFocused ? "home-sharp" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Tracking"
        component={Track}
        options={{
          tabBarLabel: "Tracking",
          tabBarIcon: ({ isFocused, color, size }) => (
            <MaterialCommunityIcons
              name={isFocused ? "truck-fast" : "truck-fast-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ isFocused, color, size }) => (
            <FontAwesome5
              name={isFocused ? "user-alt" : "user"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomBar;

const styles = StyleSheet.create({});
