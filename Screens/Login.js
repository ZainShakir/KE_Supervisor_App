import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../store/auth-context";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import LoginForm from "../components/forms/LoginForm";
import { loginUser } from "../utils/auth";

const Login = () => {
  const authCtx = useContext(AuthContext);
  const [isAuthentication, setAuthentication] = useState(false);
  async function loginHandler({ email, password }) {
    setAuthentication(true);
    try {
      const token = await loginUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert("Login Failed", error.response.data.msg);
      setAuthentication(false);
    }
  }

  if (isAuthentication) {
    return <LoadingOverlay message="Loggin you in ..." />;
  }
  return <LoginForm onAuthenticate={loginHandler} />;
};

export default Login;

const styles = StyleSheet.create({});
