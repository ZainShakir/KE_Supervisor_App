import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Pressable,
} from "react-native";
import React, { useContext } from "react";
import { useFonts } from "expo-font";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../store/auth-context";
const Profile = () => {
  const authCtx = useContext(AuthContext);
  const [loaded] = useFonts({
    Roboto: require("../assets/fonts/static/RobotoSlab-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={{ marginTop: windowHeight * 0.05 }}>
        <Text
          style={{ alignSelf: "center", fontFamily: "Roboto", fontSize: 24 }}
        >
          PROFILE
        </Text>
        <View
          style={{
            flexDirection: "row",
            padding: windowWidth * 0.08,
            alignItems: "center",
          }}
        >
          <Image
            style={styles.tinyLogo}
            source={require("../assets/demo1.png")}
          />
          <View
            style={{ flexDirection: "column", paddingLeft: windowWidth * 0.05 }}
          >
            <View>
              <Text style={{ fontSize: 25 }}>Ahmed Ali</Text>
            </View>
            <View>
              <Text style={{ fontSize: 18 }}>testing12@gmail.com</Text>
            </View>
          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontWeight: "bold" }}>20</Text>
          <Text style={{ fontWeight: "300" }}>Complains Resolved</Text>
        </View>
        <Pressable
          style={{
            flexDirection: "row",
            padding: windowHeight * 0.015,
            marginTop: windowHeight * 0.05,
            alignItems: "center",
            shadowOpacity: 0.1,
            shadowRadius: 3,
            shadowOffset: { width: 0, height: 0 },
            shadowColor: "black",
            elevation: 5,
            width: windowWidth * 0.9,
            alignSelf: "center",
            backgroundColor: "white",
            borderRadius: Platform.OS === "ios" ? "10%" : 10,
          }}
          onPress={() => authCtx.logout()}
        >
          <Ionicons name="md-log-out" size={40} color="#FF4C81" />
          <Text
            style={{
              color: "#FF4C81",
              fontSize: 20,
              fontWeight: "bold",
              marginLeft: windowWidth * 0.1,
            }}
          >
            Log Out
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAEE",
  },
  tinyLogo: {
    width: 100,
    height: 100,
    borderRadius: Platform.OS === "ios" ? "10%" : 10,
  },
});
