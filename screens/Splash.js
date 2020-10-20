import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import Theme from "../Theme";

class Splash extends React.Component {
  componentDidMount() {
    setTimeout((navigation) => {
      this.launchLogin();
    }, 1);
  }
  
  async launchLogin () {
    let userid = await AsyncStorage.getItem("punch_userid");
    console.log(userid)
    if ( userid == undefined || userid == null || userid == "" )
      this.props.navigation.navigate("Login");
    else{
      this.props.navigation.navigate("Home");
    }
  }
  // component did mount used to navigate to other screen

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {/* image and text */}
        <Image source={Theme.logofull} style={styles.logo} />
        <TouchableOpacity
            onPress={() => this.launchLogin()}
            style={styles.mainBtn}
          >
            <Text
              style={{ fontSize: Theme.fontBtn, color: "#fff", fontFamily: Theme.poppins }}
            >
              Get Start
            </Text>
          </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Theme.white,
  },
  logo: {
    height: 250,
    width: 300,
    resizeMode: "contain",
  },
  title: {
    fontSize: 16,
  },
  mainBtn: {
    position: "absolute",
    bottom: 20,
    width: "80%",
    marginHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 6,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.secondary,
  },
});
