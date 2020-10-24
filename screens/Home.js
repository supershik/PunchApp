import React, { version } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  PermissionsAndroid,
  ActivityIndicator,
  Image,
} from "react-native";
import Theme from "../Theme";
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import LinearGradient from "react-native-linear-gradient";
import Footer from "../components/Footer";
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import BackgroundTimer from "react-native-background-timer";
import BackgroundService from 'react-native-background-actions';
import Toast from 'react-native-simple-toast';
import BackgroundGeolocation from "react-native-background-geolocation";
import {requestPunch, requestGps} from "../utils/api"
import moment from "moment"
import { API_URL } from '../utils/api';

const options = {
  taskName: 'Punch',
  taskTitle: 'Punch',
  taskDesc: 'Punch App',
  taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
  },
  color: '#ff00ff',
  linkingURI: '', // See Deep Linking for more info
  parameters: {
      delay: 1000,
  },
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

//Home
class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      markers: [],
      initialPosition: 'unknown',
      lastPosition: 'unknown',
      initialRegion: "",
      visibleOther: false,
      punchType: -1,
      uploadUri: "",
      second: 0,

      UserID: "",
      sessinID: "",
      GPSInterval: "",
      PhotoMandatory: "",
    }
    this.watchID = null;
  }
  async componentDidMount  () {
    let UserID = await AsyncStorage.getItem("UserID");
    let sessinID = await AsyncStorage.getItem("SessionID");
    let GPSInterval = await AsyncStorage.getItem("GPSInterval");
    let PhotoMandatory = await AsyncStorage.getItem("PhotoMandatory");

    this.setState({sessinID});

    this._getCurrentLocation();
    //this.onLoadBackgroundService()

    //this.onStart();

    //await BackgroundService.start(this.veryIntensiveTask, options);
    //await BackgroundService.updateNotification({taskDesc: 'New ExampleTask description'}); // Only Android, iOS will ignore this call
    // iOS will also run everything here in the background until .stop() is called
    // await BackgroundService.stop();
  }
  
  componentWillUnmount() {
    this.watchID != null && Geolocation.clearWatch(this.watchID);
    BackgroundGeolocation.removeListeners();
  }
  
  onLoadBackgroundService () {
    // This handler fires whenever bgGeo receives a location update.
    BackgroundGeolocation.onLocation(this.onLocation, this.onError);

    // This handler fires when movement states changes (stationary->moving; moving->stationary)
    BackgroundGeolocation.onMotionChange(this.onMotionChange);

    // This event fires when a change in motion activity is detected
    BackgroundGeolocation.onActivityChange(this.onActivityChange);

    // This event fires when the user toggles location-services authorization
    BackgroundGeolocation.onProviderChange(this.onProviderChange);

    BackgroundGeolocation.onHttp(response => {
      console.log('http',response);
      console.log('[http] response: ', response.success, response.status, response.responseText);
    });

    BackgroundGeolocation.onHeartbeat((event) => {
      console.log('[onHeartbeat] ', event);

      // You could request a new location if you wish.
      BackgroundGeolocation.getCurrentPosition({
        samples: 1,
        persist: true
      }).then((location) => {
        console.log('[getCurrentPosition] ', location);
        // will call API to send location with the token
        // this.sendLocation({ lat: location.coords.latitude, lng: location.coords.longitude, dt: location.timestamp, uuid: location.uuid });
      }).catch(err => console.log('---------- getCurrentPosition Error---------------', err));
    })

    ////
    // 2.  Execute #ready method (required)
    //
    const gpsURL = API_URL + "mobileappgpsdata";

    BackgroundGeolocation.ready({
      // Geolocation Config
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      distanceFilter: 0,

      // android options
      locationUpdateInterval: 15000,
      fastestLocationUpdateInterval: 10000,
      allowIdenticalLocations: true,

      // Activity Recognition
      stopTimeout: 5,
      disableStopDetection: false, // this is not recommended because will NEVER disable location service until we call background geo location stop

      // Application config
      // debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
      startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
      // HTTP / SQLite config
      url: gpsURL,
      batchSync: false,       // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
      autoSync: true,         // <-- [Default: true] Set true to sync each location to server as it arrives.
      heartbeatInterval: 5,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      params: {               // <-- Optional HTTP params

      }
    }, (state) => {
      console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);
      //this._getCurrentLocation();

      if (!state.enabled) {
        ////
        // 3. Start tracking!
        //
        BackgroundGeolocation.start(function() {
          console.log("- Start success");
        });
      }
    });
  }


  onLocation(location) {
    console.log('[location] -', location);
  }
  onError(error) {
    console.warn('[location] ERROR -', error);
  }
  onActivityChange(event) {
    console.log('[activitychange] -', event);  // eg: 'on_foot', 'still', 'in_vehicle'
  }
  onProviderChange(provider) {
    console.log('[providerchange] -', provider.enabled, provider.status);
  }
  onMotionChange(event) {
    console.log('[motionchange] -', event.isMoving, event.location);
  }

  veryIntensiveTask = async (taskDataArguments) => {
    // Example of an infinite loop task
    const { delay } = taskDataArguments;
    await new Promise( async (resolve) => {
        for (let i = 0; BackgroundService.isRunning(); i++) {
          await sleep(4000)
          this.setState({
            second: this.state.second + 1,
          })
          console.log('------------', this.state.second);
          this._getCurrentLocation();
        }
    });
  };

  _getCurrentLocation = () => {
    var that = this;
    const {loading} = this.state;
    // if (loading == true)
    //   return;
      this.setState({loading: true})
      if(Platform.OS === 'ios'){
        this.callLocation(that);
      }else{
        async function requestLocationPermission() {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
                'title': 'Location Access Required',
                'message': 'This App needs to Access your location'
              }
            )

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              that.callLocation(that);
            } else {
              console.log("Permission Denied");
              that.setState({loading: false})
            }
          } catch (err) {
            console.warn('------------ 22222', err)
            that.setState({loading: false})
          }
        }
        requestLocationPermission();
      }   
  }

  callLocation(that) {
    let markers = [];
     Geolocation.getCurrentPosition(
        (position) => {
           const currentLongitude = Number(JSON.stringify(position.coords.longitude)).toFixed(10);
           const currentLatitude = Number(JSON.stringify(position.coords.latitude)).toFixed(10);
           
          let location = {
            latitude: parseFloat(currentLatitude),
            longitude: parseFloat(currentLongitude),
          }
          
          let newMarker = {
            latlng: location,
            title: "my location",
            description: "current position",
          }
          markers.push(newMarker);

          let initialRegion={
            latitude: parseFloat(currentLatitude),
            longitude: parseFloat(currentLongitude),
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00421,
          }

          that.setState({ initialRegion, markers });
          that.setState({loading: false})
          console.log('=================================', location)
          let strMessage = "Lat: " + location.latitude + ", Lng: " + location.longitude
          Toast.show(strMessage)
        },

        (error) => {
          that.setState({loading: false})
          console.log("**************** error *****************", error)
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
     );
  }

  onRegionChange(region, lastLat, lastLong) {

  }

  onPressOther () {
    const { visibleOther } = this.state;
    this.setState({visibleOther: !visibleOther})
  }

  onPressPunchIn () {
    this.setState({punchType: 1})
    this.ImagePicker();

  }

  onPressPunchOut () {
    this.setState({punchType: 2})
    this.ImagePicker();

  }

  onPressOvertimeIn () {
    this.setState({punchType: 3})
    this.ImagePicker();
  }

  onPressOvertimeOut () {
    this.setState({punchType: 4})
    this.ImagePicker();

  }

  onPressBreakIn () {
    this.setState({punchType: 5})
    this.ImagePicker();
  }

  onPressBreakOut () {
    this.setState({punchType: 6})
    this.ImagePicker();
  }

  ImagePicker = () => {

    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.launchCamera(options, response => {
    if (response.didCancel) {
        console.log('User cancelled image picker');
    } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
    } else {
        let uri = response.uri;
        let uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        let fileNames = uri.split("/");
        let fileName = fileNames[fileNames.length - 1];

        // this.setState({
        //   fileName: fileName,
        //   fileSize: response.fileSize,
        //   fileData: response.data,
        //   fileType: response.type,
        //   fileUri: uploadUri  //response.uri
        //  });

         this.sendPunch(response);
        }
    });
  }

  async sendPunch (photoData) {
    const { UserID, sessinID, GPSInterval, PhotoMandatory, initialRegion } = this.state;
   
    let realLocation = initialRegion.latitude + ", " + initialRegion.longitude;
    let currentDate =  moment(new Date()).format('YYYY-MM-DD hh:mm:ss');

    this.setState({loading: true})

    let data = {
        "UserIDInput": "11",
        "SessionIDInput": sessinID,
        "RealPunchLocationInput": realLocation,
        "DateTimeInput": currentDate,
        "SelfiePhotoInput": photoData.data
    }

    console.log('----- request punch data ----', realLocation);

    let response = await requestPunch(data);

    console.log('----- response punch data ----', response);

    if(response == undefined)
    {
      // Fail
    }
    else
    {
  
    }
    this.setState({loading: false})
  }

  onStart = () => {
    if (Platform.OS =="ios") {
        BackgroundTimer.start();
    }
  
    this._interval = BackgroundTimer.setInterval(() => {
      this.setState({
          second: this.state.second + 1,
      })
      console.log('------------', this.state.second);
      //this._getCurrentLocation();
    }, 5000);
  }

  render() {
    const { loading, markers, visibleOther } = this.state

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
                  <View
                    style={{
                        flex: 12,
                        paddingHorizontal: 20,
                        alignItems: "center",
                    }}
                    >
                    <Text style={styles.title}>
                        My Location
                    </Text>
                  </View>
                  <TouchableOpacity onPress={()=>this.props.navigation.navigate("History")}>
                    <Image
                      source={Theme.arrowRight}
                      style={{
                        width: 25,
                        height: 25,
                        resizeMode: "contain",
                        tintColor: "white"
                      }}
                    />
                  </TouchableOpacity>
              </View>
            </LinearGradient>
        { loading && 
          <ActivityIndicator style={styles.spinnerStyle} animating={loading} size="large" color={'lightgreen'} />
        }

        <ScrollView>
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
        <View style={styles.body}>
          <TouchableOpacity
              onPress={() => this.onPressPunchIn()}
              style={styles.mainBtn}
            >
              <Text
                style={{ fontSize: Theme.fontBtn, color: "#fff", fontFamily: Theme.poppins }}
              >
                Punch In
              </Text>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={() => this.onPressPunchOut()}
              style={styles.mainBtn}
            >
              <Text
                style={{ fontSize: Theme.fontBtn, color: "#fff", fontFamily: Theme.poppins }}
              >
                Punch Out
              </Text>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={() => this.onPressOther()}
              style={styles.mainBtn}
            >
              <Text
                style={{ fontSize: Theme.fontBtn, color: "#fff", fontFamily: Theme.poppins }}
              >
                Punch Other
              </Text>
          </TouchableOpacity>
          { visibleOther &&
            <View style={{flex: 1, alignSelf: "center"}}>
              <View style={{flex: 1, flexDirection: "row", justifyContent: "center"}}>
                <TouchableOpacity
                    onPress={() => this.onPressOvertimeIn()}
                    style={styles.mainBtn1}
                  >
                    <Text
                      style={{ fontSize: Theme.fontBtn, color: "#fff", fontFamily: Theme.poppins }}
                    >
                      Overtime In
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.onPressOvertimeOut()}
                  style={styles.mainBtn1}
                >
                  <Text
                    style={{ fontSize: Theme.fontBtn, color: "#fff", fontFamily: Theme.poppins }}
                  >
                    Overtime Out
                  </Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1, flexDirection: "row", justifyContent: "center"}}>
                <TouchableOpacity
                    onPress={() => this.onPressBreakIn()}
                    style={styles.mainBtn1}
                  >
                    <Text
                      style={{ fontSize: Theme.fontBtn, color: "#fff", fontFamily: Theme.poppins }}
                    >
                      Break In
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.onPressBreakOut()}
                  style={styles.mainBtn1}
                >
                  <Text
                    style={{ fontSize: Theme.fontBtn, color: "#fff", fontFamily: Theme.poppins }}
                  >
                    Break out
                  </Text>
              </TouchableOpacity>
            </View>
          </View>
          }
       
        </View>
        <View style={{height: 80}}></View>
        </ScrollView>
        {/* <Footer focusedTabButton="Home" navigation={this.props.navigation} /> */}
      </View>
    );
  }
}

export default Home;


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
  logoWrapper: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  entryWrapper: {
    flex: 4,
    paddingHorizontal: 25,
  },
  socialWrapper: {
    flex: 2,
    paddingHorizontal: 20,
    justifyContent: "space-around",
  },
  forgotWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderBottomColor: "#e5e5e5",
    borderBottomWidth: 1,
    fontSize: 17,
    marginBottom: Platform.OS === "ios" ? 20 : 0,
    fontFamily: Theme.poppins,
  },
  body: {
    marginTop: 10,
    paddingHorizontal: 30
  },
  mainBtn: {
    marginHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.secondary,
  },
  mainBtn1: {
    width: "40%",
    marginHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 5,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.third,
  },
  line: {
    backgroundColor: "#e5e5e5",
    height: 0.7,
    width: "36%",
  },
  socialIcons: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  placeholderWrapper: {
    paddingVertical: Platform.OS === "ios" ? 15 : 0,
    fontSize: 14,
    opacity: 0.9,
    fontFamily: Theme.poppins,
  },
  bodywrapper: {
    flex: 9,
    flexDirection: "row",
    backgroundColor: Theme.primary
  },
  bodyleft: {
    flex: 1,
    backgroundColor: Theme.primary,
  },
  bodyRight: {
    flex: 7,
    backgroundColor: Theme.white,
    borderTopLeftRadius: 26,
    borderBottomLeftRadius: 100,
    height: "100%",
    width: "100%",
  },
  footer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Theme.primary,
    alignItems: "center",
  },

  weclome: {
    flexDirection: "row",
    justifyContent: "center",
  },
  signup: {
    marginHorizontal: 30,
    marginTop: 20,
  },
  searchInput: {
    paddingBottom: 8,
    height: 45,
    width: "100%",
    fontSize: 12,
    paddingHorizontal: 15,
    fontFamily: Theme.poppins,
  },
  inputWrapper: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 6,
    borderColor: "#F2F2F2",
    borderWidth: 1,
    paddingHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 1,
    marginBottom: 10,
  },
  inputGroup: {
    marginTop: 20,
  },
  rememberme: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  errorLabelContainerStyle: {

  },
  errorTextStyle: {
    color: 'red',
  },
  spinnerStyle: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1,
    justifyContent: "center",
  },
  mapGroup: {
    height: 250,
    backgroundColor: 'lightgrey',
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%"
  },
  avatar: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
    // borderRadius: 300,
  },
});
