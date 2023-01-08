import axios from "axios";
import { Alert } from "react-native";
import { useContext, useEffect, useState } from "react";
import { ENV_IP } from "@env";

export async function loginUser(email, password) {
  const response = await axios.post(`http://${ENV_IP}:3080/supervisor/login`, {
    email: email,
    password: password,
  });
  const token = response.data;
  return token;
}
