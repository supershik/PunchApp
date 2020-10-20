import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  ScrollView,
  PermissionsAndroid,
  ActivityIndicator,
} from "react-native";
import Theme from "../Theme";
// import CheckBox from 'react-native-check-box';
import { connect, useSelector } from "react-redux";

class Register extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isChecked: true,
      email: "",
      password: "",
      password2: "",
      location: this.props.location?.latlng == undefined ? "" : this.props.location?.latlng,
      address: this.props.location?.address == undefined ? "" : this.props.location?.address,
      fetching: false,
      error: "",
      isValid: true,
      loading: false,
    }
  }

  componentDidMount() {
  }

  onPressedSignUp = () => {
    const { email, password, password2 } = this.state;

    if (!email) {
      this.setState({
        error: "User Id required *",
        isValid: false,
      })
      return
    } else if (!password || password.trim() && password.length < 3) {
      this.setState({
        error: "Warning password, minimum 3 chars",
        isValid: false,
      })
      return
    } else if (!email || email.trim() && email.length < 3) {
      this.setState({
        error: "Weak user id, minimum 3 chars",
        isValid: false,
      })
      return
    } else if (password != password2) {
      this.setState({
        error: "password is not matched",
        isValid: false,
      })
      return
    }
    //else if (!__isValidEmail(email)) {
    //   setError("Invalid Email")
    //   this.setState({
    //     isValid: false,
    //   })
    //   return
    // }
    this.createUser1(email, password);
  }

  onPressToLogin () {
    this.props.navigation.goBack()
  }

  setEmail = text => {
    this.setState({
      email: text,
    })
  }

  setPassword = text => {
    this.setState({
      password: text,
    })
  }

  setPassword2 = text => {
    this.setState({
      password2: text,
    })
  }
  
  _getCurrentLocation = () => {
    var that = this;
      this.setState({loading: true})
      if(Platform.OS === 'ios') {
        this.callLocation(that);
      } else {
        async function requestLocationPermission() {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
                'title': 'Location Access Required',
                'message': 'This App needs to Access your location'
              }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              //To Check, If Permission is granted
              that.callLocation(that);
            } else {
              // alert("Permission Denied");
            }
          } catch (err) {
            console.warn(err)
            that.setState({loading: false})
          }
        }
        requestLocationPermission();
      }   
  }

  callLocation(that){
    //alert("callLocation Called");
      Geolocation.getCurrentPosition(
        //Will give you the current location
         (position) => {
            const currentLongitude = Number(JSON.stringify(position.coords.longitude)).toFixed(7);
            //getting the Longitude from the location json
            const currentLatitude = Number(JSON.stringify(position.coords.latitude)).toFixed(7);
            let location = {
              lat: currentLatitude,
              lng: currentLongitude,
            }
            that.setState({ location: location });
 
           Geocoder.from(currentLatitude, currentLongitude)
            .then(json => {
              var addressComponent = json.results[0].address_components[0];
              const formatted_address = json.results[0].formatted_address;
              that.setState({ address: formatted_address });
              that.setState({loading: false})

              let locationData = {
                latlng: location,
                address: formatted_address,
              }
              this.props.updateLocation(locationData);
            })
            .catch(error => {
              console.warn(error);
              that.setState({loading: false})
            });
         },
         (error) => {
           console.log(error.message)
           that.setState({loading: false})
         },
         { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
      );
  }

  render() {
    const { email, password, password2, error, isValid, loading } = this.state

    return (
      <View style={styles.container}>
        { loading && 
          <ActivityIndicator style={styles.spinnerStyle} animating={loading} size="large" color={'lightgreen'} />
        }
        <View style={styles.bodywrapper}>
          <View style={styles.bodyRight}>
        <ScrollView>
            <Image
              source={Theme.logo}
              style={{ marginTop: 30, height: 150, width: 200, resizeMode: "contain", alignSelf: "center" }}
            />
            <View style={styles.weclome}>
              <Text
                  style={{
                    color: Theme.black,
                    fontFamily: Theme.poppins,
                    fontSize: Theme.fontTitle,
                  }}
                >
                  Welcome to, {" "}
                </Text>
                <Text
                  style={{
                    color: Theme.secondary,
                    fontFamily: Theme.poppins,
                    fontSize: Theme.fontTitle,
                  }}
                >
                  Endless Data
                </Text>
            </View>
              
            <View style={styles.signup}>
              <View style={{flexDirection: "row"}}>
                <Text
                    style={{
                      color: Theme.black,
                      fontFamily: Theme.poppins,
                      fontWeight: 'bold',
                      fontSize: 20,
                      paddingLeft: 0,
                    }}
                  >
                    Sign up
                  </Text>
              </View>
                <View style={styles.inputGroup}>
                  <View style={styles.inputWrapper}>
                    <View style={{ width: "80%" }}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder={"Eamil Id or Use Name"}
                        error={isValid}
                        value={email}
                        onChangeText={text => this.setEmail(text)}
                      />
                      
                    </View>
                    <TouchableOpacity
                      onPress={() => console.log()}
                    >
                      <Image
                        source={Theme.user}
                        style={{ height: 20, width: 20, resizeMode: "contain" }}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.inputWrapper}>
                    <View style={{ width: "80%" }}>
                      <TextInput
                         style={styles.searchInput}
                         placeholder={"Password"}
                         secureTextEntry={true}
                         error={isValid}
                         value={password}
                         onChangeText={text => this.setPassword(text)}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={() => console.log()}
                    >
                      <Image
                        source={Theme.password}
                        style={{ height: 20, width: 20, resizeMode: "contain" }}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.inputWrapper}>
                    <View style={{ width: "80%" }}>
                      <TextInput
                        style={styles.searchInput}
                        placeholder={"Password"}
                        secureTextEntry={true}
                        error={isValid}
                        value={password2}
                        onChangeText={text => this.setPassword2(text)}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={() => console.log()}
                    >
                      <Image
                        source={Theme.password}
                        style={{ height: 20, width: 20, resizeMode: "contain" }}
                      />
                    </TouchableOpacity>
                  </View>
                  {error ? (
                        <View style={styles.errorLabelContainerStyle}>
                          <Text style={styles.errorTextStyle}>{error}</Text>
                        </View>
                      ) : null}
                  <View style={styles.rememberme}>
                  </View>
                </View>
              
            </View>

            <TouchableOpacity
              onPress={() => this.onPressedSignUp()}
              style={styles.mainBtn}
            >
              <Text
                style={{ fontSize: Theme.fontBtn, color: "#fff", fontFamily: Theme.poppins }}
              >
                Sign up
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => this.onPressToLogin()}
                >
                <Text 
                    style={styles.underLineText}>
                    To Login
                </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
    </View>

        <View style={styles.footer}>
          <View style={{flex: 1}}>
          </View>
          <View style={{flex: 3, flexDirection: "row", justifyContent: "flex-end", marginHorizontal: 20}}>
            <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 20 }}>
              <Text style={{ fontFamily: Theme.poppins, color: Theme.white, fontSize: Theme.fontText }}> Endless Data Company </Text>
            </View>

            </View>
        </View>

      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { theme, language, location } = state.config;
  const { userdata } = state.auth;
  return {
    theme,
    language,
    userdata,
    location,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUserData: (data) => dispatch(updateUserData(data)),
    updateLocation: (data) => dispatch(updateLocation(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white,
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
  mainBtn: {
    marginHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 6,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.secondary,
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
  spinnerStyle: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1,
    justifyContent: "center",
  },
  errorLabelContainerStyle: {

  },
  errorTextStyle: {
    color: 'red',
  },
  underLineText: {
    paddingTop: 20,
    fontSize: 16,
    textDecorationLine: 'underline',
    color: "rgba(34,137,220,1)",
    textAlign: 'center',
  },
});
