import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  Modal,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  MaterialCommunityIcons,
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import { useNavigation } from "@react-navigation/native";

const CurrentComplain = () => {
  const navigation = useNavigation();
  const [Update, setUpdate] = useState({
    updatedescription: "",
    timeRequired: "",
  });
  const [modalIsVisible, SetModal] = useState(false);
  const [listUpdate, setlistUpdate] = useState([]);
  function addUpdate() {
    if (Update.updatedescription !== "" && Update.timeRequired !== "") {
      setlistUpdate((currentupdate) => [
        ...currentupdate,
        {
          updatedescription: Update.updatedescription,
          timeRequired: Update.timeRequired,
          id: Math.random().toString(),
        },
      ]);
      //The above statement is the better way
    } else {
      alert("Enter All fields");
    }
    setUpdate({ updatedescription: "", timeRequired: "" });
  }

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={{}}>
          <Pressable
            style={{
              position: "absolute",

              width: windowWidth * 0.1,
              height: windowHeight * 0.04,
            }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <AntDesign
              name="left"
              size={24}
              color="orange"
              style={{ alignSelf: "center" }}
            />
          </Pressable>
          <Text
            style={{
              fontSize: 20,
              paddingHorizontal: windowWidth * 0.05,
              alignSelf: "center",
              fontWeight: "bold",
            }}
          >
            Complain Details
          </Text>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: "#dcdcdc",
            marginTop: windowHeight * 0.01,
          }}
        />
        <View
          style={{
            paddingVertical: windowHeight * 0.02,
            paddingHorizontal: windowWidth * 0.03,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              borderColor: "#dcdcdc",
            }}
          >
            <View style={{ width: windowWidth * 0.3 }}>
              <Text style={{ fontSize: 19 }}>Complain ID: </Text>
            </View>
            <View style={{ width: windowWidth * 0.65 }}>
              <Text style={{ fontSize: 19 }}>1</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              borderColor: "#dcdcdc",
            }}
          >
            <View style={{ width: windowWidth * 0.3 }}>
              <Text style={{ fontSize: 19 }}>Complaint Type: </Text>
            </View>
            <View style={{ width: windowWidth * 0.65 }}>
              <Text style={{ fontSize: 19 }}>Voltage Complaint</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              borderColor: "#dcdcdc",
            }}
          >
            <View style={{ width: windowWidth * 0.3 }}>
              <Text style={{ fontSize: 19 }}>Location: </Text>
            </View>
            <View style={{ width: windowWidth * 0.65 }}>
              <Text style={{ fontSize: 19 }}>Gulshan</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              borderColor: "#dcdcdc",
            }}
          >
            <View style={{ width: windowWidth * 0.3 }}>
              <Text style={{ fontSize: 19 }}>Complainer Address: </Text>
            </View>
            <View style={{ width: windowWidth * 0.65 }}>
              <Text style={{ fontSize: 19 }}>R-264 Block 17</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              borderColor: "#dcdcdc",
            }}
          >
            <View style={{ width: windowWidth * 0.3 }}>
              <Text style={{ fontSize: 19 }}>Supervisor Name: </Text>
            </View>
            <View style={{ width: windowWidth * 0.65 }}>
              <Text style={{ fontSize: 19 }}>Ahmed</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              borderColor: "#dcdcdc",
            }}
          >
            <View style={{ width: windowWidth * 0.3 }}>
              <Text style={{ fontSize: 19 }}>Complain Description: </Text>
            </View>
            <View style={{ width: windowWidth * 0.65 }}>
              <Text style={{ fontSize: 19 }}>
                This is a test complain which is for test purpose.
              </Text>
            </View>
          </View>
          <Text
            style={{
              alignSelf: "center",
              fontWeight: "bold",
              fontSize: 20,
              marginTop: windowHeight * 0.05,
            }}
          >
            UPDATES
          </Text>
          <Pressable
            style={{
              alignSelf: "flex-end",
              backgroundColor: "orange",
              borderRadius: Platform.OS === "ios" ? "10%" : 10,
            }}
            onPress={() => SetModal(true)}
          >
            <Text
              style={{
                padding: windowWidth * 0.035,
                fontWeight: "bold",
                color: "white",
              }}
            >
              Post Update
            </Text>
          </Pressable>
          <Modal
            visible={modalIsVisible}
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
                    Post Updates
                  </Text>
                  <Pressable
                    style={{
                      position: "absolute",
                      paddingLeft: "90%",
                      paddingTop: "10%",
                    }}
                    onPress={() => {
                      SetModal(false);
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
                  <View>
                    <Text
                      style={{
                        fontSize: 20,
                        paddingHorizontal: windowWidth * 0.04,
                        paddingVertical: windowHeight * 0.02,
                      }}
                    >
                      Description:
                    </Text>
                    <TextInput
                      placeholder="Enter Request Description "
                      multiline={true}
                      style={[styles.input1, { height: 60 }]}
                      value={Update.updatedescription}
                      onChangeText={(e) => {
                        setUpdate({ ...Update, updatedescription: e });
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: "5%",
                      paddingHorizontal: windowWidth * 0.02,
                      paddingVertical: windowHeight * 0.02,
                    }}
                  >
                    <Text style={{ fontSize: 18 }}>Estimated Time: </Text>
                    <TextInput
                      placeholder="Enter Amount"
                      keyboardType="numeric"
                      style={[styles.input2, { width: windowWidth * 0.45 }]}
                      value={Update.timeRequired}
                      onChangeText={(e) => {
                        setUpdate({ ...Update, timeRequired: e });
                      }}
                    />
                  </View>
                  <Pressable
                    style={{
                      alignSelf: "center",
                      backgroundColor: "orange",
                      borderRadius: Platform.OS === "ios" ? "10%" : 10,
                      width: windowWidth * 0.2,
                    }}
                    onPress={addUpdate}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        padding: windowWidth * 0.03,
                        alignSelf: "center",
                        fontSize: 17,
                        color: "white",
                      }}
                    >
                      POST
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>
        <ScrollView alwaysBounceVertical={false}>
          {listUpdate.map((item, i) => {
            return (
              <View
                style={{
                  backgroundColor: "white",

                  borderRadius: Platform.OS === "ios" ? "10%" : 10,
                  shadowOpacity: 0.1,
                  shadowRadius: 3,
                  shadowOffset: { width: 0, height: 0 },
                  shadowColor: "black",
                  elevation: 5,
                  width: windowWidth * 0.94,
                  alignSelf: "center",
                  marginBottom: windowHeight * 0.02,
                }}
                key={i}
              >
                <Text style={{ fontSize: 17, padding: 10 }}>
                  Estimated Time: {item.timeRequired}
                </Text>
                <Text
                  style={{
                    fontSize: 17,
                    paddingHorizontal: 10,
                    paddingBottom: 10,
                  }}
                >
                  Description: {item.updatedescription}
                </Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default CurrentComplain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    paddingTop: windowHeight * 0.05,
    paddingHorizontal: windowWidth * 0.02,
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
    height: windowHeight * 0.6,
    width: windowWidth * 0.9,
    borderRadius: Platform.OS === "ios" ? "20%" : 20,
  },
  input1: {
    paddingLeft: "2%",
    borderWidth: 1,
    borderColor: "black",
    textAlignVertical: "top",
    width: windowWidth * 0.85,
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
});
