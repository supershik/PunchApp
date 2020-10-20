import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Platform,
  PermissionsAndroid,
  ScrollView,
  ActivityIndicator,
  BackHandler,
} from "react-native";

import Theme from "../Theme";
import { connect } from "react-redux";
import { ConfirmDialog } from 'react-native-simple-dialogs';
// import { updateEventData, updateAllNotification, updateMySenderNotification, updateGroupMessage, updateUserData } from "../redux";
import { validateAll } from 'indicative/validator';
import { } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import LinearGradient from "react-native-linear-gradient";
import Footer from "../components/Footer";

import {
    Input,
    Button,
    Icon,
} from 'react-native-elements';

let _this = null;
class Detail extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      loading: false,
      markers: [],
      initialPosition: 'unknown',
      lastPosition: 'unknown',
      initialRegion: "",
    };

    _this = this;
  }

  async componentDidMount () {
    let markers = [];
    let location = {
      latitude: 43.4444,
      longitude: -112.02442,
    }
    
    let newMarker = {
      latlng: location,
      title: "my location",
      description: "current position",
    }
    markers.push(newMarker);

    let initialRegion={
      latitude: 43.4444,
      longitude: -112.02442,
      latitudeDelta: 0.00922,
      longitudeDelta: 0.00421,
    }

    this.setState({markers, initialRegion})
  }
  
  componentWillUnmount() {
  }

  async componentDidUpdate (prevProps, prevState) {
    
  }

  onPressedItem (item) {
    // navigate("AppointmentOption", {hashed_id: item.hashed_id});
  }

  renerItem = (item, index) => {
    return (
      <View style={[styles.itemGroup, index % 2 != 0 ? { backgroundColor: 'white' } : {backgroundColor: '#f9f9f9'} ]}>
        <TouchableOpacity style={styles.itemOne} onPress={()=>this.onPressedItem(item)}>
          <Text style={[styles.textOne, {color: Theme.primary}]}>
            View Details({item.id})
          </Text>
        </TouchableOpacity>
        <View style={styles.itemOne}>
          <Text style={styles.textOne}>
            {item.date}
          </Text>
        </View>
        <View style={styles.itemTwo}>
          <Text style={styles.textOne}>
            {item.state}
          </Text>
        </View>
        <View style={styles.itemOne}>
          <Text style={styles.textOne}>
            {item.location.lat}
          </Text>
          <Text style={styles.textOne}>
            {item.location.lng}
          </Text>
        </View>
      </View>
    )
  }

  render() {
    const { loading, markers } = this.state;

    return (
      <View style={styles.container}>
        { Platform.OS === 'ios' && 
          <View style={{height: 20, backgroundColor: Theme.primary}}/>
        }
          <LinearGradient
              colors={[Theme.primary, Theme.primary]}
              style={styles.mainWrapper}
              >
              <View style={styles.headerGroup}>
                  <TouchableOpacity onPress={() => this.props?.navigation.goBack()}
                    style={{flex: 1, marginTop: 5}}
                  >
                  <Image
                      source={Theme.back}
                      style={{ height: 20, width: 20, resizeMode: "contain"}}
                  />
                  </TouchableOpacity>

                  <View
                    style={{
                        flex: 12,
                        paddingHorizontal: 20,
                        alignItems: "center",
                    }}
                    >
                    <Text style={styles.title}>
                      Detail
                    </Text>
                  </View>
              </View>
            </LinearGradient>
            { loading && 
              <ActivityIndicator style={styles.spinnerStyle} animating={loading} size="large" color={'lightgreen'} />
            }

          <View style={styles.mapGroup}>
            {this.state.initialRegion != "" && markers.length > 0 &&
              <MapView
                initialRegion={this.state.initialRegion}
                provider={PROVIDER_GOOGLE}
                tintColor={null}
                mapType="standard" // standard, none, satellite, hybrid, terrain, mutedStandard(iOS 11.0+ only)
                style={styles.map}
                onRegionChange={this.onRegionChange}
                >
                  { markers.map((marker) => (
                      <Marker
                        coordinate={marker.latlng}
                        title={marker.title}
                        description={marker.description}
                      ></Marker>
                    ))
                  }
              </MapView>
            }
          </View>
            <Footer focusedTabButton="History" navigation={this.props.navigation} />
          </View>

      );
    }
}

const mapStateToProps = (state) => {
  // const { theme, language, location, eventData, notifyData, isReadNotify, notifySendData, notifyGroupData } = state.config;
  // const { userdata } = state.auth;
  // return {
  //   theme,
  //   language,
  //   userdata,
  //   location,
  //   eventData,
  //   notifyData,
  //   isReadNotify,
  //   notifySendData,
  //   notifyGroupData,
    
  // };
};

const mapDispatchToProps = dispatch => {
  return {
    // updateEventData: (eventData) => dispatch(updateEventData(eventData)),
    // updateAllNotification: (data) => dispatch(updateAllNotification(data)),
    // updateMySenderNotification: (data) => dispatch(updateMySenderNotification(data)),
    // updateGroupMessage: (data) => dispatch(updateGroupMessage(data)),
    // updateUserData: (data) => dispatch(updateUserData(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.background,
  },
  mainWrapper: {
    height: 80,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  headerGroup: {
      flexDirection: "row",
      marginTop: 30,
      marginHorizontal: 16,
  },
  title: {
    fontFamily: Theme.poppinsbold,
    fontSize: Theme.fontSubTitle,
    color: Theme.white
  },
  spinnerStyle: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1,
    justifyContent: "center",
  },
  logoContainer: {
      margin: 30,
      height: 200,
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: "contain",
  },
  
  inputView: {
      borderRadius: 25,
      marginBottom: 20,
      marginHorizontal: 30,
  },
  loginButton: {
      margin: 10,
      marginTop: 30,
  },
  registerButton: {
      margin: 10,
      marginTop: 10,
  },
  forgotPassword: {
      fontSize: 14,
      textDecorationLine: 'underline',
      color: "rgba(34,137,220,1)",
  },
  underLineText: {
      fontSize: 16,
      textDecorationLine: 'underline',
      color: "rgba(34,137,220,1)",
      textAlign: 'center',
  },
  password: {
      position: 'relative',
  },
  icon: {
      position: 'absolute',
      top: 33,
      right: 10,
  },
  itemGroup: {
    flexDirection: "row",
    // height: 120,
    justifyContent: "space-between",
  },
  itemOne: {
    flex: 1,
    borderLeftWidth: 0.3,
    borderBottomWidth: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  itemTwo: {
    flex: 0.5,
    borderLeftWidth: 0.3,
    borderBottomWidth: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  textOne: {
    padding: 5,
    color: Theme.black,
    fontSize: Theme.fontText,
    textAlign: "center",
  },
  mapGroup: {
    flex: 1,
    backgroundColor: 'lightgrey',
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%"
  },
})