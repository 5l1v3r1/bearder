import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default class TextButton extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      func: undefined
    };

    this.noFunction = this.noFunction.bind(this);
    if (this.props.run === undefined) {
      this.state.func = this.noFunction;
    } else {
      this.state.func = this.props.run;
    }
  }

  noFunction() {
    alert("TESTING");
  }

  render() {
    return (
        <View style={styles.container}>
          <TouchableOpacity style={styles.opacity} onPress={this.state.func}>
            <Text style={styles.buttonText}>{this.props.text}</Text>
            <Image style={styles.buttonNext} source={require('../assets/images/buttons/next_white.png')} />
          </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '70%',
    height: '10%',
    backgroundColor: '#c70082',
    flexDirection: 'row',
    alignItems: 'center',

  },
  opacity: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    paddingLeft: '15%',
    paddingRight: '30%',
    color: "#FFFFFF",
    fontSize: 45,
  },
  buttonNext: {
    width: 45,
    height: 45,
  },
});
