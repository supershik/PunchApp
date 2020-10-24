import "react-native-gesture-handler";
import React, { Component } from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from "react-redux";

//screens
import Login from "../screens/Login";
import Home from "../screens/Home";
import History from "../screens/History";

const Stack = createStackNavigator();

// stack navigator
class Route extends Component {
  render() {
    return (
      <NavigationContainer
        theme={DarkTheme}
        //   theme={this.props.theme === "dark" ? DarkTheme : DefaultTheme}
      >
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="History" component={History} />
          
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state) => {
  const { theme } = state.config;
  return {
    // theme,
  };
};

export default connect(
  mapStateToProps,
  {}
)(Route);
