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
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import Spinner from 'react-native-loading-spinner-overlay';
import LinearGradient from "react-native-linear-gradient";
import Footer from "../components/Footer";

import {
    Input,
    Button,
    Icon,
} from 'react-native-elements';

const DATA = [
  {
    id: 1,
    date: "04/01/2020 13:26:46",
    state: "Out",
    location: {lat: 37.78825096, lng: -122.43243409}
  },
  {
    id: 2,
    date: "04/02/2020 17:15:33",
    state: "Out",
    location: {lat: 37.77825096, lng: -122.44243409}
  }
  ,  {
    id: 3,
    date: "04/03/2020 14:23:12",
    state: "In",
    location: {lat: 37.78125096, lng: -122.43943409}
  }
  ,
  {
    id: 4,
    date: "04/04/2020 16:12:09",
    state: "Out",
    location: {lat: 37.70825096, lng: -122.4243409}
  },
  {
    id: 5,
    date: "04/05/2020 17:12:13",
    state: "In",
    location: {lat: 37.76625096, lng: -122.42343409}
  },
  {
    id: 6,
    date: "04/01/2020 13:26:46",
    state: "Out",
    location: {lat: 37.78825096, lng: -122.43243409}
  },
  {
    id: 7,
    date: "04/02/2020 17:15:33",
    state: "Out",
    location: {lat: 37.77825096, lng: -122.44243409}
  }
  ,  {
    id: 8,
    date: "04/03/2020 14:23:12",
    state: "In",
    location: {lat: 37.78125096, lng: -122.43943409}
  }
  ,
  {
    id: 9,
    date: "04/04/2020 16:12:09",
    state: "Out",
    location: {lat: 37.70825096, lng: -122.4243409}
  },
  {
    id: 10,
    date: "04/05/2020 17:12:13",
    state: "In",
    location: {lat: 37.76625096, lng: -122.42343409}
  },
  {
    id: 11,
    date: "04/05/2020 17:12:13",
    state: "In",
    location: {lat: 37.76625096, lng: -122.42343409}
  },
  {
    id: 12,
    date: "04/01/2020 13:26:46",
    state: "Out",
    location: {lat: 37.78825096, lng: -122.43243409}
  },
  {
    id: 13,
    date: "04/02/2020 17:15:33",
    state: "Out",
    location: {lat: 37.77825096, lng: -122.44243409}
  }
  ,  {
    id: 14,
    date: "04/03/2020 14:23:12",
    state: "In",
    location: {lat: 37.78125096, lng: -122.43943409}
  }
  ,
  {
    id: 15,
    date: "04/04/2020 16:12:09",
    state: "Out",
    location: {lat: 37.70825096, lng: -122.4243409}
  },
  {
    id: 10,
    date: "04/05/2020 17:12:13",
    state: "In",
    location: {lat: 37.76625096, lng: -122.42343409}
  },
]

let _this = null;
class History extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      loading: false,
      markers: [],
      initialRegion: "",
      showMap: false,
    }

    _this = this;
  }

  async componentDidMount () {
  }
  
  componentWillUnmount() {
  }

  async componentDidUpdate (prevProps, prevState) {
    
  }

  onPressedItem (item) {
    let markers = [];
    let location = {
      latitude: parseFloat(item.location.lat),
      longitude: parseFloat(item.location.lng),
    }
    
    let newMarker = {
      latlng: location,
      title: "my location",
      description: "current position",
    }
    markers.push(newMarker);

    let initialRegion={
      latitude: parseFloat(item.location.lat),
      longitude: parseFloat(item.location.lng),
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }

    this.setState({ initialRegion, markers, showMap: true });
  }

  renerItem = (item, index) => {
    return (
      <View style={[styles.itemGroup, index % 2 != 0 ? { backgroundColor: 'white' } : {backgroundColor: '#f9f9f9'} ]}>
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
        <TouchableOpacity style={styles.itemOne} onPress={() => this.onPressedItem(item)}>
          <Text style={styles.textOne}>
            {item.location.lat}
          </Text>
          <Text style={styles.textOne}>
            {item.location.lng}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderFooter () {
    const { initialRegion, markers } = this.state;
    return (
      <View style={styles.mapGroup}>
          {initialRegion != "" && markers.length > 0 &&
            <MapView
              initialRegion={initialRegion}
              provider={PROVIDER_GOOGLE}
              mapType="standard" // standard, none, satellite, hybrid, terrain, mutedStandard(iOS 11.0+ only)
              style={styles.map}
              region={initialRegion}
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
    )
  }

  render() {
    const { loading, showMap } = this.state;

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
                      History
                    </Text>
                  </View>
              </View>
            </LinearGradient>
            { loading && 
              <ActivityIndicator style={styles.spinnerStyle} animating={loading} size="large" color={'lightgreen'} />
            }
              <FlatList
                    data={DATA}
                    ListHeaderComponent={<View style={{height: 20}}></View>}
                    renderItem={({item, index}) => this.renerItem(item, index)}
                    keyExtractor={item => item.id}
                    // ListFooterComponent={}
                />
                {showMap && this.renderFooter()}
            {/* <Footer focusedTabButton="History" navigation={this.props.navigation} /> */}
          </View>
      );
    }
}

export default History;

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
    height:  200,
    backgroundColor: 'lightgrey',
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%"
  },
})