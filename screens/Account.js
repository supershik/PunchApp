
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Platform,
  PermissionsAndroid,
} from "react-native";
import Theme from "../Theme";
import Footer from "../components/Footer";
import LinearGradient from "react-native-linear-gradient";
// import ImagePicker from 'react-native-image-picker';
// import ImageResizer from 'react-native-image-resizer';
import { connect } from "react-redux";
import Geolocation from '@react-native-community/geolocation';
// import Geocoder from 'react-native-geocoding';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-crop-picker';

class Account extends React.Component {
  state = {
    selected: "buyer",
    historyColor: Theme.primary,
    historyText: Theme.poppinsbold,
    issueColor: "transparent",
    issueText: Theme.poppins,
    historyTextColor: Theme.primary,
    issueTextColor: "black",
    selectedPictureUri: "",
    uploadUri: "",
    imageName: "",
    loading: false,
    email: "blabla",
    fullName: "",
    id: "",
    phoneNumber: "",
    address: "",
    location: "",
  };

  componentDidMount () {
    // const {userdata} = this.props;
    // this.setUserData(userdata);

    // Geocoder.init("AIzaSyBHlEBeRKJvItmHK7HK6zCUa475I4UDyHQ"); // use a valid API key
  }

  _getCurrentLocation = () => {
    // var that = this;
    //   //Checking for the permission just after component loaded
    //   this.setState({loading: true})
    //   if(Platform.OS === 'ios'){
    //     this.callLocation(that);
    //   }else{
    //     async function requestLocationPermission() {
    //       try {
    //         const granted = await PermissionsAndroid.request(
    //           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
    //             'title': 'Location Access Required',
    //             'message': 'This App needs to Access your location'
    //           }
    //         )
    //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //           //To Check, If Permission is granted
    //           that.callLocation(that);
    //         } else {
    //           // alert("Permission Denied");
    //         }
    //       } catch (err) {
    //         console.warn(err)
    //         that.setState({loading: false})
    //       }
    //     }
    //     requestLocationPermission();
    //   }   
  }
  callLocation(that){
  //  //alert("callLocation Called");
  //    Geolocation.getCurrentPosition(
  //      //Will give you the current location
  //       (position) => {
  //          const currentLongitude = Number(JSON.stringify(position.coords.longitude)).toFixed(7);
  //          //getting the Longitude from the location json
  //          const currentLatitude = Number(JSON.stringify(position.coords.latitude)).toFixed(7);
  //          let location = {
  //            lat: currentLatitude,
  //            lng: currentLongitude,
  //          }
  //          that.setState({ location: location });

  //         Geocoder.from(currentLatitude, currentLongitude)
  //                 .then(json => {
  //                   var addressComponent = json.results[0].address_components[0];
  //                   const formatted_address = json.results[0].formatted_address;
  //                   that.setState({ address: formatted_address });
  //                   that.setState({loading: false})
  //                   that.locationRef.setAddressText(formatted_address); // Important for using ref
  //                 })
  //                 .catch(error => { 
  //                   console.warn(error);
  //                   that.setState({loading: false})
  //                 });
  //       },
  //       (error) => {
  //         console.log(error.message)
  //         that.setState({loading: false})
  //       },
  //       { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
  //    );

  //   //  that.watchID = Geolocation.watchPosition((position) => {
  //   //    //Will give you the location on location change
  //   //      console.log(position);
  //   //      const currentLongitude = JSON.stringify(position.coords.longitude);
  //   //      //getting the Longitude from the location json
  //   //      const currentLatitude = JSON.stringify(position.coords.latitude);
  //   //      //getting the Latitude from the location json
  //   //     that.setState({ currentLongitude:currentLongitude });
  //   //     //Setting state Longitude to re re-render the Longitude Text
  //   //     that.setState({ currentLatitude:currentLatitude });
  //   //     //Setting state Latitude to re re-render the Longitude Text
  //   //  });
  }

  componentDidUpdate = (prevProps) => {

  }

  setUserData = (userdata) => {
    // const address = userdata.address == undefined ? "" : userdata.address;
    // this.setState({
    //   email: userdata.email,
    //   fullName: userdata.fullName,
    //   id: userdata.id,
    //   phoneNumber: userdata.phoneNumber,
    //   uploadUri: userdata.profileUrl,
    //   address: address,
    //   location: userdata.location == undefined ? "" : userdata.location,
    // })

    // // set initialize value for geolocation
    // this.locationRef.setAddressText(address); // Important for using ref
  }

  onPressedImagePicker = () => {

    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      this.setState({uploadUri: image.path})
    }).catch(err => {
      console.log(err);
      
    });


    // const options = {
    //   maxWidth: 2000,
    //   maxHeight: 2000,
    //   storageOptions: {
    //     skipBackup: true,
    //     path: 'images'
    //   }
    // };
    // ImagePicker.showImagePicker(options, response => {
    //   if (response.didCancel) {
    //     console.log('User cancelled image picker');
    //   } else if (response.error) {
    //     console.log('ImagePicker Error: ', response.error);
    //   } else if (response.customButton) {
    //     console.log('User tapped custom button: ', response.customButton);
    //   } else {
    //     const source = { uri: response.uri };
    //     this.setState({
    //       selectedPictureUri: response.uri,
    //       uploadUri: response.uri,
    //     });
    //     this.imageResizer(response.uri)
    //     // this.uploadImage(response.uri);
    //   }
    // });
  }

  onChangeName (text) {
    this.setState({
      fullName: text
    })
  }
  onChangePhoneNumber (text) {
    this.setState({
      phoneNumber: text
    })
  }
  onChangeEmail (text) {
    this.setState({
      email: text
    })
  }

  imageResizer = (uri) => {
    let newWidth = 300;
    let newHeight = 300;
    let compressFormat = 'PNG';
    let quality = 100;
    let rotation = 0;
    let outputPath = null;
    let imageUri = uri;
    ImageResizer.createResizedImage(
      imageUri,
      newWidth,
      newHeight,
      compressFormat,
      quality,
      rotation,
      outputPath,
    )
      .then((response) => {
        // response.uri is the URI of the new image that can now be displayed, uploaded...
        //resized image uri
        let uri = response.uri;
        //generating image name
        let imageName = 'profile' + this.state.userId;
        //to resolve file path issue on different platforms
        let uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        //setting the image name and image uri in the state

        //this.uploadImage(uploadUri);

        this.setState({
          uploadUri,
          imageName,
        });
      })
      .catch((err) => {
        console.log('image resizing error => ', err);
      });
  }
  
  uploadImage = async (uploadUri) => {
    // const { id } = this.state;
    // let uid = id;
    
    // this.setState({ loading: true, progress: 0 });
    // await this.deleteProfileImage(this.props.userdata.profileUrl);

    // let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    // let extname = uploadUri.substring(uploadUri.lastIndexOf('.') + 1);

    // // filename = `/users/${uid}.${extname}`;
    // filename = `/users/${uid}.PNG`;

    // const reference = storage().ref(filename);
    // await reference.putFile(uploadUri);

    // const url = await storage()
    //                   .ref(filename)
    //                   .getDownloadURL();
    
    // this.setState({ loading: false });
    // this.setState({uploadUri: url});
    
    // return url;
  }

  onPressedUpdateProfile = async () => {
    // const { loading, uploadUri, email, fullName, phoneNumber } = this.state;
    
    // let downloadUrl = this.props.userdata.profileUrl;

    // if(uploadUri != "" && uploadUri != downloadUrl)
    //   downloadUrl = await this.uploadImage(uploadUri);
    
    // this.updateUserInFireStore(downloadUrl);
  }

  updateUserInFireStore = async (url) => {
    // const { loading, id, email, fullName, phoneNumber, address, location } = this.state;

    //   this.setState({
    //     loading: true
    //   })

    //   const data = {
    //       id: id,
    //       email: email,
    //       fullName: fullName,
    //       phoneNumber: phoneNumber,
    //       profileUrl: url,
    //       oneSignalId: this.props.userdata?.oneSignalId == undefined ? "" : this.props.userdata?.oneSignalId,
    //       address: address,
    //       location: location,
    //       socialType: this.props.userdata?.socialType == undefined ? "" : this.props.userdata?.socialType,
    //   };

    //   let userInfo = {
    //     id: id
    //   }
    //   let userData = await createUser(userInfo, data);
    //   if (userData != null)
    //     this.props.updateUserData(userData);
        
    //   this.setState({loading: false});
  }

  _signOut = async () => {
    await AsyncStorage.setItem("punch_userid", "")
    this.props.navigation.navigate("Login");
  };

  onChangeAddress = (text, location) => {

    this.setState({
        address: text,
        location: location,
    })
  }

  onPressCurrentLocation = () => {
    this._getCurrentLocation();
  }

  render() {
    const { loading, uploadUri, email, fullName, phoneNumber } = this.state;
    return (
      <View style={styles.container}>
        { loading && 
          <ActivityIndicator style={styles.spinnerStyle} animating={loading} size="large" color={'lightgreen'} />
        }
        { Platform.OS === 'ios' && 
          <View style={{height: 20, backgroundColor: Theme.primary}}/>
        }
        {/* this is the top portion */}
        <LinearGradient
          colors={[Theme.primary, Theme.primary]}
          style={styles.mainWrapper}
        >
          <View style={styles.headerGroup}>
            <TouchableOpacity
              onPress={() => this.props.navigation.pop()}
              style={{marginTop: 5}}
              >
              <Image
                source={Theme.back}
                style={{ height: 20, width: 20, resizeMode: "contain", marginLeft: 0, }}
              />
            </TouchableOpacity>

            <TouchableOpacity 
              style={{marginTop: 5}}
              onPress={this._signOut}
              >
              <Image
                source={Theme.enter}
                style={{ height: 24, width: 24, resizeMode: "contain", marginLeft: 0, }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.headertitle}>
              { uploadUri == "" ?
               <TouchableOpacity 
                    style={{marginTop: 5, height: 100, width: 100}}
                    onPress={this.onPressedImagePicker}
                  >
                  <Image
                    source={require("../assets/images/photo1.png")}
                    style={{ height: 100, width: 100, borderRadius: 100 }}
                  />
                  <Text
                    style={{
                      position: "absolute",
                      alignSelf: "center",
                      fontFamily: Theme.poppins,
                      fontSize: 55,
                      paddingTop: 6,
                      opacity: 0.7,
                      color: 'white'
                    }}
                  >
                    +
                  </Text>
                </TouchableOpacity>
                : 
                <TouchableOpacity 
                    style={{marginTop: 5, height: 100, width: 100, borderRadius: 150, overflow: "hidden", backgroundColor: "white"}}
                    onPress={this.onPressedImagePicker}
                  >
                  <Image
                    source={{ uri: uploadUri }}
                    style={{ height: 100, width: 100, resizeMode: "stretch"}}
                  />
                  <Text
                    style={{
                      position: "absolute",
                      alignSelf: "center",
                      fontFamily: Theme.poppins,
                      fontSize: 55,
                      paddingTop: 6,
                      opacity: 0.7,
                      color: 'white'
                    }}
                  >
                    +
                  </Text>
                </TouchableOpacity>
            }

            <View style={styles.usertitlegroup}>
              <Text style={styles.usertitle}>
                  Hi {fullName},
                </Text>
              <Text style={styles.usertitle}>
                Welcome
              </Text>
            </View>

          </View>
        </LinearGradient>

        {/* body stats here */}
        <View style={styles.body}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <View style={{paddingHorizontal: 20}}>
              <Text style={[styles.title]}>
                Account
              </Text>

              <Text style={styles.subtext}>
                Name
              </Text>
              <TextInput
                  style={styles.input}
                  placeholder={""}
                  value={fullName}
                  onChangeText={(text) => this.onChangeName(text)}
                />

              <Text style={styles.subtext}>
                Mobile Number
              </Text>
              <TextInput
                  style={styles.input}
                  placeholder={"+19988888823"}
                  value={phoneNumber}
                  keyboardType={"phone-pad"}
                  onChangeText={(text) => this.onChangePhoneNumber(text)}
                />

              <Text style={styles.subtext}>
                UserId
              </Text>
              <TextInput
                  editable={false}
                  style={styles.input}
                  placeholder={""}
                  value={email}
                  onChangeText={(text) => this.onChangeEmail(text)}
              />
              
              <TouchableOpacity
                  // onPress={() => this.props.navigation.navigate("EditProfile")}
                  onPress={() => this.onPressedUpdateProfile()}
                  style={styles.mainBtn}
                >
                  <View style={{flexDirection: "row", alignItems: "center"}}>
                    <View style={{flex: 4}}>
                      <Text
                        style={{ fontSize: Theme.fontBtn, color: "#fff", fontFamily: Theme.poppins, alignSelf: "center" }}
                      >
                        Update Profile
                      </Text>
                    </View>
                    <View style={{flex: 1, borderLeftColor: Theme.third, borderLeftWidth: 1}}>
                      <Image
                        source={Theme.pencil}
                        style={{ height: 20, width: 20, resizeMode: "contain", marginLeft: 0, alignSelf: "center" }}
                      />
                    </View>
                  </View>
              </TouchableOpacity>
            </View>

            <View style={{marginBottom: 20}}></View>
          </ScrollView>

        </View>
        <View style={{height: 55}}></View>
        <Footer focusedTabButton="Account" navigation={this.props.navigation} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { theme, language } = state.config;
  const { userdata } = state.auth;
  return {
    theme,
    language,
    userdata,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // dispatching actions returned by action creators
    updateUserData: (data) => dispatch(updateUserData(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.white,
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
  },
  body: {
    flex: 8,
  },
  title: {
    marginTop: 20,
    fontFamily: Theme.poppinsbold,
    fontSize: Theme.fontSubTitle,
    color: Theme.secondary
  },
  subtext: {
    fontFamily: Theme.poppins,
    fontSize: Theme.fontText,
    color: Theme.third,
    marginVertical: 10,
  },
  subtext2: {
    paddingLeft: 5,
    fontFamily: Theme.poppins,
    fontSize: Theme.fontText,
    color: Theme.primary,
    marginVertical: 10,
    textDecorationLine: "underline"
  },
  socialtext: {
    fontFamily: Theme.poppins,
    fontSize: Theme.fontSubTitle,
    color: Theme.third,
    marginVertical: 10,
    marginLeft: 40,
  },
  
  img: {
    height: 16,
    width: 16,
    resizeMode: "contain",
    transform: [{ rotate: "180deg" }],
  },
  person: {
    height: 45,
    width: 45,
    borderRadius: 50,
  },
  settingicon: {
    height: 30,
    width: 30,
    resizeMode: "contain",
  },
  boxwrapper: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    marginTop: 10,
    borderBottomColor: "#e5e5e5",
    borderBottomWidth: 1,
    flexDirection: "row",
  },
  itemsubtitle: {
    fontFamily: Theme.poppins,
    opacity: 0.6,
    fontSize: 11,
    textAlign: "left",
  },
  itemtitle: {
    fontFamily: Theme.poppins,
    fontSize: 14,
    lineHeight: 15,
    textAlign: "left",
  },
  consumersupport: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: Theme.primary,
    position: "absolute",
    bottom: 10,
    right: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  initext: {
    fontFamily: Theme.poppinsbold,
    color: Theme.primary,
  },
  initiate: {
    backgroundColor: "#FFCCD570",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    width: "100%",
    borderRadius: 100,
    marginTop: 15,
  },
  mainWrapper: {
    height: 180,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  secondWrapper: {
    flex: 5,
    justifyContent: "space-between",
  },
  headerGroup: {
    flexDirection: "row",
    marginTop: 30,
    marginHorizontal: 16,
    justifyContent: "space-between"
  },
  headertitle: {
    flexDirection: "row",
    marginHorizontal: 16,
    alignItems: "center",
    marginLeft: 40,
  },
  usertitle: {
    fontFamily: Theme.poppins,
    fontSize: Theme.fontTitle,
    color: Theme.white,
  },
  usertitlegroup: {
    marginLeft: 20,
  },
  input: {
    paddingBottom: 8,
    height: 45,
    width: "100%",
    fontSize: 15,
    paddingHorizontal: 15,
    borderColor: Theme.gray4,
    borderWidth: 1,
    borderRadius: 8,
  },
  mainBtn: {
    width: "70%",
    paddingVertical: 10,
    borderRadius: 6,
    marginTop: 50,
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: Theme.primary,
  },
  social: {
    borderTopColor: Theme.gray3,
    borderTopWidth: 1,
    height: 70,
    borderBottomColor: Theme.gray3,
    borderBottomWidth: 1,
  },
  spinnerStyle: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1,
    justifyContent: "center",
  },
});
