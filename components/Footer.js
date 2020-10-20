// Powered By Development Here
// www.devhere.co
// Terms: https://devhere.co/terms-and-conditions
// Started in (28-05-2020)
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import Theme from "../Theme";
import { useNavigation } from "@react-navigation/native";
import {useTheme} from '@react-navigation/native';
import { colors } from "react-native-elements";
import { connect, useSelector } from "react-redux";

class Footer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {

      };
    }
  
    componentDidMount() {}
  
    onPressHome = () => {
      this.props.navigation.navigate("Home");
    };

    onPressHistory = () => {
      this.props.navigation.navigate("History");
    };

    onPressOther = () => {
      this.props.navigation.navigate("Account");
    };
  
    isFocused = (focusedTabBar, currentTabBar) => {
      return focusedTabBar === currentTabBar;
    };
  
    render({ focusedTabButton } = this.props) {
      return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.tab} onPress={() => this.onPressHome()}>
          {this.isFocused(focusedTabButton, "home") ? (
            <View style={{ alignItems: "center" }}>
              <Image source={Theme.home_f} style={[styles.img, {tintColor: Theme.textTabFocus}]} />
              <Text style={[styles.text, {color: Theme.textTabFocus}]}>Home</Text>
            </View>
          ) : (
            <View style={{ alignItems: "center" }}>
              <Image source={Theme.home_n} style={[styles.img, {tintColor: Theme.textTab}]} />
              <Text style={[styles.text, {color: Theme.textTab}]}>Home</Text>
            </View>
          )}
        </TouchableOpacity>

       
        <TouchableOpacity style={styles.tab} onPress={() => this.onPressHistory()}>
          {this.isFocused(focusedTabButton, "property") ? (
            <View style={{ alignItems: "center" }}>
              <Image source={Theme.calendar_f} style={[styles.img, {tintColor: Theme.textTabFocus}]} />
              <Text style={[styles.text, {color: Theme.textTabFocus}]}>History</Text>
            </View>
          ) : (
            <View style={{ alignItems: "center" }}>
              <Image source={Theme.calendar_n} style={[styles.img, {tintColor: Theme.textTab}]} />
              <Text style={[styles.text, {color: Theme.textTab}]}>History</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.tab} onPress={() => this.onPressOther()}>
          {this.isFocused(focusedTabButton, "more") ? (
            <View style={{ alignItems: "center" }}>
              <Image source={Theme.user_f} style={[styles.img, {tintColor: Theme.textTabFocus}]} />
              <Text style={[styles.text, {color: Theme.textTabFocus}]}>Account</Text>
            </View>
          ) : (
            <View style={{ alignItems: "center" }}>
              <Image source={Theme.user_n} style={[styles.img, {tintColor: Theme.textTab}]} />
              <Text style={[styles.text, {color: Theme.textTab}]}>Account</Text>
            </View>
          )}
        </TouchableOpacity> */}
      </View>
    );
  }
};

const mapStateToProps = (state) => {
  const { isReadNotify } = state.config;
  return {
    isReadNotify
  };
};

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 100,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    backgroundColor: Theme.white,
    // borderTopColor: "#e5e5e5",
    // borderTopWidth: 1,
    height: 70,
  },
  img: { height: 30, width: 30, resizeMode: "contain", marginBottom: 2 },
  text: { fontSize: 11, fontFamily: Theme.poppins },
  tab: {
    width: "20%",
    alignItems: "center",
  },
});
