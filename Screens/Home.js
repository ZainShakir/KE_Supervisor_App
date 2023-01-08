import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  Image,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../store/auth-context";
import { useFonts } from "expo-font";
import { Avatar } from "react-native-paper";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { useNavigation } from "@react-navigation/native";

import {
  MaterialCommunityIcons,
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";
const Home = () => {
  const authCtx = useContext(AuthContext);
  const [request, setRequest] = useState({
    equipmentname: "",
    quantity: null,
    equipmentdescription: "",
  });

  const [listRequest, setlistRequest] = useState([]);
  const [errprompt, seterrprompt] = useState({});
  const [text, settext] = useState(true);
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    reqnot: false,
  });

  const [modalIsVisible1, SetModal1] = useState(false);

  const navigation = useNavigation();

  const generate_request = async () => {
    try {
      // const response = await create_complain(
      //   token,
      //   account_no,
      //   "Phase Complaint",
      //   comment
      // );
      // if (response.status === 200) {
      //   alert("Complain Successfully Created");
      // }
      alert("Requested Successfully");
    } catch (error) {
      console.log(error);
    }
  };
  // function checkcredentials(e1) {

  //   const reqnot = e1.length < 5;
  //   if (e1.length < 5) {

  //   }
  //   setCredentialsInvalid({
  //     reqnot: reqnot,
  //   });
  //   return errors;
  // }

  const [loaded] = useFonts({
    Roboto: require("../assets/fonts/static/RobotoSlab-ExtraBold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  function addRequest() {
    if (
      request.equipmentname !== "" &&
      request.quantity !== null &&
      request.equipmentdescription !== ""
    ) {
      setlistRequest((currentrequest) => [
        ...currentrequest,
        {
          equipmentname: request.equipmentname,
          quantity: request.quantity,
          equipmentdescription: request.equipmentdescription,
          id: Math.random().toString(),
        },
      ]);
      //The above statement is the better way
    } else {
      alert("Enter All fields");
    }
    setRequest({ equipmentname: "", quantity: null, equipmentdescription: "" });
  }

  function deleteRequestHandler(id) {
    setlistRequest((request) => {
      return request.filter((request) => request.id !== id);
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.body1}>
        <View
          style={{
            marginTop: windowHeight * 0.05,
            alignSelf: "flex-end",
            marginRight: windowWidth * 0.05,
          }}
        >
          <Image
            style={styles.tinyLogo}
            source={require("../assets/demo1.png")}
          />
        </View>
        <Text
          style={{
            fontFamily: "Roboto",
            color: "white",
            fontSize: 25,
            marginLeft: windowWidth * 0.04,
          }}
        >
          Welcome Back,Mr Ahmed
        </Text>
      </View>
      <View style={styles.body2}>
        <ScrollView
          alwaysBounceHorizontal={true}
          horizontal={true}
          nestedScrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          style={{ paddingVertical: 15 }}
        >
          <View style={styles.box}>
            <Image
              style={{ height: 90, width: 90 }}
              source={require("../assets/truck.png")}
            />
            <Text style={{ fontWeight: "500", fontSize: 15 }}>Tracking</Text>
          </View>
          <Pressable
            style={styles.box}
            onPress={() => {
              navigation.navigate("ChatWait");
            }}
          >
            <Image
              style={{ height: 80, width: 80 }}
              source={require("../assets/test.png")}
            />
            <Text
              style={{ fontWeight: "500", fontSize: 15, textAlign: "center" }}
            >
              Contact Representative
            </Text>
          </Pressable>
          <View style={styles.box}>
            <Text
              style={{
                fontWeight: "500",
                fontSize: 15,
                textAlign: "center",
                color: "#FE762E",
              }}
            >
              View all Your Complains
            </Text>
          </View>
          <Pressable onPress={() => SetModal1(true)} style={styles.box}>
            <Text
              style={{
                fontWeight: "500",
                fontSize: 15,
                textAlign: "center",
                color: "#FE762E",
              }}
            >
              Request Equipments
            </Text>
          </Pressable>
        </ScrollView>
        {/* MODAL 1 & Modal 2 */}
        <Modal
          visible={modalIsVisible1}
          animationType="fade"
          transparent={true}
        >
          <View style={styles.Modal}>
            <View style={styles.modal_body}>
              <View
                style={{
                  paddingVertical: "10%",
                }}
              >
                <Text style={{ fontSize: 23, alignSelf: "center" }}>
                  Request Equipments
                </Text>
                <Pressable
                  style={{
                    position: "absolute",
                    paddingLeft: "90%",
                    paddingTop: "10%",
                  }}
                  onPress={() => {
                    SetModal1(false);
                  }}
                >
                  <MaterialIcons
                    name="cancel-presentation"
                    size={24}
                    color="black"
                  />
                </Pressable>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderColor: "#dcdcdc",
                    marginTop: windowHeight * 0.01,
                  }}
                />

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: "5%",
                    marginTop: windowHeight * 0.02,
                    paddingHorizontal: windowWidth * 0.02,
                  }}
                >
                  <Text style={{ fontSize: 18 }}>Equipment Name:</Text>
                  <TextInput
                    style={[styles.input2, { width: windowWidth * 0.45 }]}
                    value={request.equipmentname}
                    onChangeText={(e) => {
                      setRequest({ ...request, equipmentname: e });
                    }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: "5%",
                    paddingHorizontal: windowWidth * 0.02,
                  }}
                >
                  <Text style={{ fontSize: 18 }}>Quantity/Length : </Text>
                  <TextInput
                    placeholder="Enter Amount"
                    keyboardType="numeric"
                    style={[styles.input2, { width: windowWidth * 0.45 }]}
                    value={request.quantity}
                    onChangeText={(e) => {
                      setRequest({ ...request, quantity: e });
                    }}
                  />
                </View>
                <View style={{ paddingHorizontal: windowWidth * 0.02 }}>
                  <Text style={{ fontSize: 18 }}>Request Description:</Text>
                  <View
                    style={{
                      width: "95%",
                      marginTop: "2%",
                      alignSelf: "center",
                    }}
                  >
                    <TextInput
                      placeholder="Enter Request Description "
                      multiline={true}
                      style={[styles.input1, { height: 60 }]}
                      value={request.equipmentdescription}
                      onChangeText={(e) => {
                        setRequest({ ...request, equipmentdescription: e });
                      }}
                    />
                  </View>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <Pressable style={styles.flatbutton} onPress={addRequest}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: "#0097FF",
                        textAlign: "center",
                      }}
                    >
                      + Add Request
                    </Text>
                  </Pressable>
                </View>
                <Text
                  style={{ fontSize: 15, marginHorizontal: windowWidth * 0.02 }}
                >
                  List of Rewards:
                </Text>
                {listRequest.map((item, i) => {
                  return (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginRight: "5%",
                        height: 20,
                        marginTop: windowHeight * 0.03,
                      }}
                      key={i}
                    >
                      <Text style={{ alignSelf: "center" }}>
                        {i + 1 + ") " + item.equipmentname}
                      </Text>
                      <Text style={{ alignSelf: "center" }}>
                        {item.quantity}
                      </Text>
                      <Pressable
                        style={{ justifyContent: "center" }}
                        onPress={() => {
                          deleteRequestHandler(item.id);
                        }}
                      >
                        <MaterialIcons name="delete" size={24} color="black" />
                      </Pressable>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </Modal>
        <View style={styles.box1}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: windowWidth * 0.02,
            }}
          >
            <MaterialCommunityIcons
              name={"truck-fast-outline"}
              size={30}
              color={"black"}
            />
            <Text style={{ fontWeight: "500", fontSize: 16, paddingLeft: 20 }}>
              Complain ID:20
            </Text>
          </View>
          <Text
            style={{
              fontWeight: "500",
              fontSize: 16,
              marginTop: windowHeight * 0.01,
              paddingLeft: windowWidth * 0.02,
            }}
          >
            Complain Type:Voltage Complain
          </Text>
          <Text
            style={{
              fontWeight: "500",
              fontSize: 16,
              marginTop: windowHeight * 0.01,
              paddingLeft: windowWidth * 0.02,
            }}
          >
            Affected Area:Gulberg
          </Text>
          <Text
            style={{
              fontWeight: "500",
              fontSize: 16,
              marginTop: windowHeight * 0.01,
              paddingLeft: windowWidth * 0.02,
            }}
          >
            Complainer Address:R-264 Block 17
          </Text>
          <Text
            numberOfLines={2}
            style={{
              fontWeight: "500",
              fontSize: 16,
              marginTop: windowHeight * 0.01,
              paddingLeft: windowWidth * 0.02,
            }}
          >
            Description:Hello this is a test complain ,this is completely for
            test purposes ,My electricity is not working .
          </Text>
          <View
            style={{
              flexDirection: "row",

              justifyContent: "space-evenly",
              paddingTop: windowHeight * 0.02,
            }}
          >
            <Pressable
              style={{
                borderWidth: 1,
                borderRadius: Platform.OS === "ios" ? "20%" : 20,
                width: windowWidth * 0.2,
                alignItems: "center",
                borderColor: "#FE762E",
                justifyContent: "center",
              }}
              onPress={() => navigation.navigate("CurrentComplain")}
            >
              <Text style={{ fontSize: 15, color: "#FE762E" }}>View</Text>
            </Pressable>
            <Pressable
              style={{
                borderWidth: 1,
                borderRadius: Platform.OS === "ios" ? "20%" : 20,
                width: windowWidth * 0.2,
                alignItems: "center",
                borderColor: "#FE762E",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: "#FE762E",
                  paddingVertical: windowHeight * 0.01,
                }}
              >
                Track
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAEE",
  },
  body1: {
    backgroundColor: "#F77C26",
    flex: 0.5,

    borderBottomRightRadius: Platform.OS === "ios" ? "24%" : 24,
    borderBottomLeftRadius: Platform.OS === "ios" ? "24%" : 24,
  },
  body2: {
    flex: 1,
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: Platform.OS === "ios" ? "10%" : 10,
  },
  box: {
    backgroundColor: "white",
    height: 130,
    width: 130,
    marginHorizontal: 10,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Platform.OS === "ios" ? "10%" : 10,
  },
  box1: {
    backgroundColor: "white",
    height: windowHeight * 0.35,
    marginBottom: windowHeight * 0.02,
    width: windowWidth * 0.95,
    alignSelf: "center",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    elevation: 5,
    borderRadius: Platform.OS === "ios" ? "10%" : 10,
    padding: 20,
  },
  Modal: {
    justifyContent: "center",
    padding: "5%",
    alignItems: "center",
    backgroundColor: "#000000aa",
    flex: 1,
    flexDirection: "column",
  },
  modal_body: {
    backgroundColor: "white",
    height: windowHeight * 0.8,
    width: windowWidth * 0.9,
    borderRadius: Platform.OS === "ios" ? "20%" : 20,
  },
  input: {
    height: 40,
    marginTop: 10,
    borderWidth: 1,
    padding: 5,
    width: windowWidth * 0.8,
    borderRadius: Platform.OS === "ios" ? "10%" : 10,
    alignSelf: "center",
  },
  input2: {
    marginLeft: "3%",
    height: 40,
    paddingLeft: "2%",
    borderBottomWidth: 1,
    borderColor: "black",
    textAlignVertical: "top",
  },
  input1: {
    paddingLeft: "2%",
    borderWidth: 1,
    borderColor: "black",
    textAlignVertical: "top",
  },
  flatbutton: {
    height: 30,
    width: "30%",
    justifyContent: "center",
    marginRight: 5,

    marginTop: windowHeight * 0.02,
  },
});
