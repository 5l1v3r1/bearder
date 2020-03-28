import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';
import LoginScreen from './screens/LoginScreen.js'

const Stack = createStackNavigator();

export default class App extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      refresh: false,
    };

    this.refreshMe = this.refreshMe.bind(this);
  }

  refreshMe() {
    this.setState({refresh: true});
  }

  render() {
    if (global.xauth == undefined) {
      return (
        <LoginScreen refresh={this.refreshMe}/>
      );
    } else {
      return (
        <View style={styles.container}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Root" component={BottomTabNavigator} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
