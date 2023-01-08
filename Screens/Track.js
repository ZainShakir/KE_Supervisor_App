import React, {
  useCallback,
  useMemo,
  useRef,
  useEffect,
  useState,
  Component,
} from "react";
import { Dimensions, StyleSheet, View, Pressable, Text } from "react-native";
import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import Modal from "react-native-modal";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 24.943476;
const LONGITUDE = 67.074632;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
import { AntDesign } from "@expo/vector-icons";

const GOOGLE_MAPS_APIKEY = "AIzaSyDQ0NKHCmrvpVn4zwOezzNVxwJakPqPW48";

class Track extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coordinates: [
        {
          latitude: 24.944410243674543,
          longitude: 67.07380867157364,
        },
        {
          latitude: 24.856470746766675,
          longitude: 67.26469452582116,
        },
      ],
      isModalVisible: false,
      distance: 0,
      duration: 0,
    };

    this.mapView = null;
  }

  onMapPress = (e) => {
    this.setState({
      coordinates: [...this.state.coordinates, e.nativeEvent.coordinate],
    });
  };
  toggleModal = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          style={StyleSheet.absoluteFill}
          ref={(c) => (this.mapView = c)}
          onPress={this.onMapPress}
          provider="google"
        >
          {this.state.coordinates.map((coordinate, index) => (
            <MapView.Marker
              key={`coordinate_${index}`}
              coordinate={coordinate}
            />
          ))}
          {this.state.coordinates.length >= 2 && (
            <MapViewDirections
              origin={this.state.coordinates[0]}
              waypoints={
                this.state.coordinates.length > 2
                  ? this.state.coordinates.slice(1, -1)
                  : undefined
              }
              destination={
                this.state.coordinates[this.state.coordinates.length - 1]
              }
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="hotpink"
              optimizeWaypoints={true}
              onStart={(params) => {
                console.log(
                  `Started routing between "${params.origin}" and "${params.destination}"`
                );
              }}
              onReady={(result) => {
                console.log(`Distance: ${result.distance} km`);
                console.log(`Duration: ${result.duration} min.`);
                this.setState({
                  distance: result.distance,
                  duration: result.duration,
                });

                this.mapView.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: width / 20,
                    bottom: height / 20,
                    left: width / 20,
                    top: height / 20,
                  },
                });
              }}
              onError={(errorMessage) => {
                // console.log('GOT AN ERROR');
              }}
            />
          )}
        </MapView>
        <Pressable style={styles.button} onPress={this.toggleModal}>
          <AntDesign name="pluscircleo" size={35} color="orange" />
        </Pressable>
        <Modal
          onBackdropPress={() =>
            this.setState({
              isModalVisible: false,
            })
          }
          onBackButtonPress={() =>
            this.setState({
              isModalVisible: false,
            })
          }
          isVisible={this.state.isModalVisible}
          swipeDirection="down"
          onSwipeComplete={this.toggleModal}
          animationIn="bounceInUp"
          animationOut="bounceOutDown"
          animationInTiming={900}
          animationOutTiming={500}
          backdropTransitionInTiming={1000}
          backdropTransitionOutTiming={500}
          style={styles.modal}
        >
          <View style={styles.modalContent}>
            <View style={styles.center}>
              <View style={styles.barIcon} />
              <Text style={styles.text}>
                Total Distance : {this.state.distance} KM
              </Text>
              <Text style={styles.text}>
                Estimated Time : {Math.round(this.state.duration)} mins
              </Text>
              <Text style={{ color: "#bbb", fontSize: 24, marginTop: 10 }}>
                Problem Fix Time : -
              </Text>
              <Text style={{ color: "#bbb", fontSize: 24, marginTop: 10 }}>
                Complain Type:Voltage Complain
              </Text>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

export default Track;

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "#161616",
    paddingTop: 12,
    paddingHorizontal: 12,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    minHeight: 400,
    paddingBottom: 20,
  },
  center: {
    display: "flex",
  },
  barIcon: {
    width: 60,
    height: 5,
    backgroundColor: "#bbb",
    borderRadius: 3,
    alignSelf: "center",
  },
  text: {
    color: "#bbb",
    fontSize: 24,
    marginTop: 40,
  },
  btnContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 500,
  },
  button: {
    height: 50,

    justifyContent: "center",

    position: "absolute", //Here is the trick
    bottom: 0, //Here is the trick
    right: 0,
    paddingRight: windowWidth * 0.04,
    paddingBottom: windowHeight * 0.02,
  },
});
