import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { MonoText } from '../components/StyledText';

import TextButton from '../components/TextButton.js';

export default class LoginScreen extends React.Component
{
  constructor(props) {
    super(props);
    this.ptdr = this.ptdr.bind(this);
  }

  ptdr() {
    alert("TESTING2");
  }

  render() {
    return (
      <View style={styles.container}>
        <TextButton text="NEXT" run={this.ptdr}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    flex: 1,
    backgroundColor: '#495057',
  }
});
