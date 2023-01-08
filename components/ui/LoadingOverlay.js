import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ImageBackground,
  Image,
  Dimensions,
} from "react-native";
import { useFonts } from "expo-font";
import React from "react";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const LoadingOverlay = ({ message }) => {
  const [loaded] = useFonts({
    Roboto: require("../../assets/fonts/Roboto-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/background.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            marginTop: windowHeight * 0.1,
          }}
        >
          <Text
            style={[styles.message, { fontFamily: "Roboto", fontSize: 20 }]}
          >
            {message}
          </Text>
          <ActivityIndicator size="large" />
        </View>
      </ImageBackground>
    </View>
  );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },

  message: {
    fontSize: 16,
    marginBottom: 12,
    alignSelf: "center",
    color: "white",
  },
});
