import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  Alert,
  Dimensions,
  TextInput,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { useFonts } from "expo-font";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const LoginForm = ({ onAuthenticate }) => {
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
  });
  const [errprompt, seterrprompt] = useState({});
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [text, settext] = useState(true);
  useEffect(() => {}, [errprompt]);

  function submitHandler(credentials) {
    let { email, password } = credentials;
    var errors = {};

    email = email.trim();
    password = password.trim();

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    const emailIsValid = reg.test(email);
    const passwordIsValid = password.length > 5 && password.length < 18;

    if (!emailIsValid || !passwordIsValid) {
      settext(true);
      if (!emailIsValid) {
        errors.email = "Please Enter a Valid Email";
      }
      if (!passwordIsValid) {
        errors.password =
          password.length < 5
            ? "Password Length Should be Greater than 5 characters"
            : "Password Length Should be less than 18 characters";
      }
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        password: !passwordIsValid,
      });
      seterrprompt(errors);
      return;
    }
    onAuthenticate({ email, password });
  }

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
    }
  }
  const navigation = useNavigation();

  const [loaded] = useFonts({
    Roboto: require("../../assets/fonts/RobotoSlab-VariableFont_wght.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/background.jpg")}
          resizeMode="cover"
          style={styles.image}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
            keyboardVerticalOffset={10}
          >
            <ScrollView
              alwaysBounceVertical={false}
              style={{
                flex: 1,
                marginTop: windowHeight * 0.5,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontFamily: "Roboto",
                  fontSize: 24,
                  alignSelf: "center",
                }}
              >
                SIGN IN
              </Text>
              <View style={{ marginHorizontal: windowWidth * 0.05 }}>
                <Text
                  style={[
                    styles.label,
                    credentialsInvalid.email && styles.labelInvalid,
                  ]}
                >
                  Email Address:
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    credentialsInvalid.email && styles.inputInvalid,
                  ]}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  onChangeText={updateInputValueHandler.bind(this, "email")}
                  value={enteredEmail}
                />
                {credentialsInvalid.email ? (
                  <Text
                    style={{ color: "red", paddingTop: windowHeight * 0.01 }}
                  >
                    {errprompt.email}
                  </Text>
                ) : null}
              </View>
              <View style={{ marginHorizontal: windowWidth * 0.05 }}>
                <Text
                  style={[
                    styles.label,
                    credentialsInvalid.password && styles.labelInvalid,
                  ]}
                >
                  Password:
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    credentialsInvalid.password && styles.inputInvalid,
                  ]}
                  autoCapitalize="none"
                  secureTextEntry={true}
                  onChangeText={updateInputValueHandler.bind(this, "password")}
                  value={enteredPassword}
                />
                {credentialsInvalid.password ? (
                  <Text
                    style={{ color: "red", paddingTop: windowHeight * 0.01 }}
                  >
                    {errprompt.password}
                  </Text>
                ) : null}
              </View>
              <Pressable
                onPress={() => {
                  submitHandler({
                    email: enteredEmail,
                    password: enteredPassword,
                  });
                }}
                style={({ pressed }) => [
                  pressed && styles.pressed,
                  { width: windowWidth * 0.5, alignSelf: "center" },
                ]}
              >
                <View style={[styles.button, { backgroundColor: "orange" }]}>
                  <Text
                    style={{
                      color: "white",
                      alignSelf: "center",
                      fontFamily: "Roboto",
                      fontSize: 20,
                    }}
                  >
                    LOGIN
                  </Text>
                </View>
              </Pressable>
            </ScrollView>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: "white",
    borderRadius: 4,
    fontSize: 16,
  },
  inputInvalid: {
    backgroundColor: "#fcdcbf",
  },
  label: {
    color: "white",
    marginBottom: 4,
    marginTop: windowHeight * 0.02,
  },
  labelInvalid: {
    color: "#f37c13",
  },
  button: {
    marginTop: windowHeight * 0.05,
    padding: windowHeight * 0.01,
    borderRadius: Platform.OS === "ios" ? "10%" : 10,
  },
  pressed: {
    opacity: 0.5,
  },
});
